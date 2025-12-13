#!/usr/bin/env bash
set -euo pipefail

prog_name=$(basename "$0")

err() { printf "%s\n" "$*" >&2; }

prompt() {
	local msg="$1" default="$2" out
	if [ -n "$default" ]; then
		printf "%s [%s]: " "$msg" "$default"
	else
		printf "%s: " "$msg"
	fi
	read -r out
	if [ -z "$out" ]; then
		printf "%s" "$default"
	else
		printf "%s" "$out"
	fi
}

confirm() {
	local msg="$1" default_yes=${2:-true}
	local yn
	if $default_yes; then
		printf "%s [Y/n]: " "$msg"
	else
		printf "%s [y/N]: " "$msg"
	fi
	read -r yn
	case "$yn" in
		[Yy]*) return 0 ;;
		[Nn]*) return 1 ;;
		"") if $default_yes; then return 0; else return 1; fi ;;
		*) return 1 ;;
	esac
}

die() { err "$*"; exit 1; }

# Determine defaults
default_repo_name="$(basename "$(pwd)")"
default_remote="origin"
current_branch="$(git rev-parse --abbrev-ref HEAD 2>/dev/null || echo "main")"

echo "Create a new GitHub repository (interactive)"

repo_name=$(prompt "Repository name" "$default_repo_name")
description=$(prompt "Description (optional)" "")

visibility="public"
while true; do
	v=$(prompt "Visibility (public/private)" "$visibility")
	case "$v" in
		public|private) visibility="$v"; break ;;
		*) echo "Please enter 'public' or 'private'." ;;
	esac
done

init_readme=false
if [ -d .git ] || git rev-parse --git-dir >/dev/null 2>&1; then
	: # repo exists
else
	if confirm "No git repo found. Initialize a new git repository?" true; then
		git init
		init_readme=true
	fi
fi

if ! [ -d .git ] && ! git rev-parse --git-dir >/dev/null 2>&1; then
	die "A git repository is required. Aborting."
fi

if ! git rev-parse --verify HEAD >/dev/null 2>&1; then
	if ! $init_readme && confirm "Repository has no commits. Create initial README and commit?" true; then
		init_readme=true
	fi
fi

if $init_readme; then
	if [ ! -f README.md ]; then
		printf "# %s\n\n%s\n" "$repo_name" "$description" > README.md
	fi
	git add README.md
	git commit -m "chore: initial commit" || true
fi

remote_name=$(prompt "Remote name" "$default_remote")

use_gh=false
if command -v gh >/dev/null 2>&1; then
	use_gh=true
fi

owner_type="user"
if confirm "Create the repo under an organization instead of your user account?" false; then
	owner_type="org"
	org_name=$(prompt "Organization name" "")
	if [ -z "$org_name" ]; then
		die "Organization name required when choosing org."
	fi
fi

repo_url=""

if $use_gh; then
	echo "Using GitHub CLI (gh) to create repository..."
	gh_args=("$repo_name")
	if [ -n "$description" ]; then
		gh_args+=(--description "$description")
	fi
	if [ "$visibility" = "private" ]; then
		gh_args+=(--private)
	else
		gh_args+=(--public)
	fi
	if [ "$owner_type" = "org" ]; then
		gh_args=("$org_name/$repo_name")
	fi

	if gh repo create "${gh_args[@]}" --confirm >/dev/null 2>&1; then
		if [ "$owner_type" = "org" ]; then
			repo_url=$(gh repo view "$org_name/$repo_name" --json sshUrl --jq .sshUrl 2>/dev/null || true)
		else
			repo_url=$(gh repo view "$repo_name" --json sshUrl --jq .sshUrl 2>/dev/null || true)
		fi
	else
		die "gh failed to create repository."
	fi
else
	echo "GitHub CLI not found. Falling back to GitHub REST API (requires GITHUB_TOKEN)."
	if [ -z "${GITHUB_TOKEN-}" ]; then
		die "GITHUB_TOKEN environment variable not set. Install 'gh' or set GITHUB_TOKEN and try again."
	fi
	api_url="https://api.github.com"
	if [ "$owner_type" = "org" ]; then
		create_endpoint="$api_url/orgs/$org_name/repos"
	else
		create_endpoint="$api_url/user/repos"
	fi

	body=$(printf '{"name":"%s","description":"%s","private":%s}' "$repo_name" "$description" "$([ "$visibility" = "private" ] && echo true || echo false)")

	resp=$(curl -s -X POST -H "Authorization: token ${GITHUB_TOKEN}" -H "Content-Type: application/json" -d "$body" "$create_endpoint")
	# Check for errors
	if printf "%s" "$resp" | grep -q "created_at"; then
		repo_url=$(printf "%s" "$resp" | grep -o '"ssh_url": *"[^"]*"' | sed -E 's/"ssh_url": *"([^"]*)"/\1/' || true)
		if [ -z "$repo_url" ]; then
			repo_url=$(printf "%s" "$resp" | grep -o '"clone_url": *"[^"]*"' | sed -E 's/"clone_url": *"([^"]*)"/\1/' || true)
		fi
	else
		err "Failed to create repo. Response from GitHub:"
		printf "%s\n" "$resp" >&2
		die "API repository creation failed."
	fi
fi

if [ -z "$repo_url" ]; then
	die "Could not determine remote URL for the created repository."
fi

if git remote get-url "$remote_name" >/dev/null 2>&1; then
	err "Remote '$remote_name' already exists. Will update it to point to the new repo URL."
	git remote remove "$remote_name" || true
fi

git remote add "$remote_name" "$repo_url"

echo "Pushing to remote $remote_name (branch: $current_branch)..."
git push -u "$remote_name" "$current_branch"

echo "Repository created and pushed successfully!"
echo "Remote '$remote_name' -> $repo_url"

exit 0
