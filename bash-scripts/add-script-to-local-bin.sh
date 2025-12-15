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

die() { err "$*"; exit 1; }

echo "Add a script from this repository into \$HOME/bin so you can run it like a regular command."

script_path=$(prompt "Path to script (relative or absolute)" "bash-scripts/git-create-remote-repo-interactive.sh")

# Expand tilde and convert to absolute
script_path=${script_path/#~/$HOME}
if [ ! -f "$script_path" ]; then
	# try relative to repo root (this script's dir)
	repo_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." >/dev/null 2>&1 && pwd || pwd)
	alt="$repo_dir/$script_path"
	if [ -f "$alt" ]; then
		script_path="$alt"
	else
		die "Script not found at '$script_path' or '$alt'"
	fi
fi

default_name=$(basename "$script_path")
default_name=${default_name%.sh}
name=$(prompt "Command name to create in \$HOME/bin" "$default_name")

bin_dir="$HOME/bin"
mkdir -p "$bin_dir"

target="$bin_dir/$name"

if [ -e "$target" ] || [ -L "$target" ]; then
	if prompt "Target '$target' exists — overwrite? (y to overwrite)" "n" | grep -qi '^y' >/dev/null 2>&1; then
		rm -f "$target"
	else
		die "Aborted: target exists"
	fi
fi

# Ensure the source script is executable
if [ ! -x "$script_path" ]; then
	chmod +x "$script_path" || err "Warning: could not set executable bit on '$script_path'"
fi

ln -s "$script_path" "$target"

echo "Created command: $target -> $script_path"

echo
echo "Ensure \$HOME/bin is on your PATH. You can add this to your shell config (e.g. ~/.zshrc):"
echo
echo '  export PATH="$HOME/bin:$PATH"'
echo
echo "To use the new command in this session run:"
echo
echo "  export PATH=\"$HOME/bin:\$PATH\""
echo
echo "Done. Run '$name' from any directory once your PATH is configured."

exit 0
