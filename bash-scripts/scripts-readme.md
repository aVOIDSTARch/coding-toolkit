# Scripts — Usage & Aliases

This document explains, in a generic way, how to run the scripts in this repository from the terminal and how to create an alias (or make them available on `PATH`) so you can run them anywhere.

**Basic idea**: make a script executable and either run it by path (`./path/to/script`) or expose it via your shell `PATH` or an alias so you can invoke it by name from any directory.

## Prerequisites

- `git` installed (most scripts operate in git repos).
- If a script uses GitHub features, install `gh` (GitHub CLI) or set `GITHUB_TOKEN` for REST fallback.
- Scripts should include a proper shebang (e.g. `#!/usr/bin/env bash`).

## Usage (run directly)

- Make the script executable (once):

```zsh
chmod +x bash-scripts/git-create-remote-repo-interactive.sh
```

- Run it from the repository root (relative path):

```zsh
./bash-scripts/git-create-remote-repo-interactive.sh
# or
bash bash-scripts/git-create-remote-repo-interactive.sh
```

- If running from inside the script directory:

```zsh
cd bash-scripts
./git-create-remote-repo-interactive.sh
```

**Make a script runnable from anywhere**
There are two common approaches: add the scripts directory to your `PATH`, or create a shell alias (or function).

Option A — Add a `bin` directory to your `PATH` (recommended for many scripts)

1. Create a `~/bin` (or `~/.local/bin`) directory if you don't have one:

```zsh
mkdir -p "$HOME/bin"
```

2. Symlink (or copy) the script into `~/bin`:

```zsh
ln -s /full/path/to/your/repo/bash-scripts/git-create-remote-repo-interactive.sh "$HOME/bin/git-create-remote-repo-interactive"
```

3. Ensure `~/bin` is on your `PATH` (add to `~/.zshrc`):

```zsh
# add to the end of ~/.zshrc
export PATH="$HOME/bin:$PATH"
```

4. Reload your shell or source the file:

```zsh
source ~/.zshrc
```

Now you can run:

```zsh
git-create-remote-repo-interactive.sh
# or, if you removed the .sh suffix when symlinking:
# git-create-remote-repo-interactive
```

Option B — Create a shell alias (simple, per-machine)

1. Open your shell config (`~/.zshrc` for zsh) and add an alias:

```zsh
# ~/.zshrc
alias create-remote-repo='/full/path/to/repo/bash-scripts/git-create-remote-repo-interactive.sh'
```

2. Reload the config:

```zsh
source ~/.zshrc
```

Now run:

```zsh
create-remote-repo
```

Notes on aliases:

- Aliases are simple and convenient, but they live in your shell config and won’t be available to other users or scripts that don’t run your shell config.
- If your script accepts arguments, an alias will pass them through automatically. For more advanced behavior (argument handling, environment setup), use a shell function instead of a plain alias.

Example function with argument passthrough (put in `~/.zshrc`):

```zsh
create-remote-repo() {
  "/full/path/to/repo/bash-scripts/git-create-remote-repo-interactive.sh" "$@"
}
```

## Permissions & safety

- Always inspect scripts before running them, especially those that will be globally available.
- Preferred pattern for scripts: include a shebang, `set -euo pipefail`, and clear dependency checks (the `git-create-remote-repo-interactive.sh` script in this repo does this).

## Uninstall / remove

- Remove an alias from `~/.zshrc` and `source ~/.zshrc`.
- Remove a symlink:

```zsh
rm "$HOME/bin/git-create-remote-repo-interactive"
```

## Quick checks

- Verify which command will run (alias, function, or path) with:

```zsh
which create-remote-repo
# or
type create-remote-repo
```

- Confirm the script is executable:

```zsh
ls -l /full/path/to/repo/bash-scripts/git-create-remote-repo-interactive.sh
```

## Examples — common workflows

- Make all scripts in `bash-scripts` available via `~/bin`:

```zsh
mkdir -p "$HOME/bin"
for f in /full/path/to/repo/bash-scripts/*; do
  ln -s "$f" "$HOME/bin/$(basename "$f")" || true
done
# ensure PATH contains $HOME/bin
```

- Create a single alias for convenience:

```zsh
echo "alias create-remote-repo='/full/path/to/repo/bash-scripts/git-create-remote-repo-interactive.sh'" >> ~/.zshrc
source ~/.zshrc
```

## Final tips

- Prefer symlinking into a directory on `PATH` for scripts you use often across terminals and tools.
- Use aliases for quick, local shortcuts.
- If you want, I can:
  - make `bash-scripts/git-create-remote-repo-interactive.sh` executable for you, or
  - add an example alias into your `~/.zshrc` (I'll show the exact line I'll add first).

---

File created: `scripts-readme.md`

## Option C — Helper script (recommended)

There is a small helper script in this repository that automates the symlink step and makes it easy to expose any script from this repo as a command in `~/bin`.

- Script: `add-script-to-local-bin.sh`
- What it does:
  - Prompts for the path to a script in this repo (or an absolute path).
  - Asks what command name you want to create (the name placed in `~/bin`).
  - Ensures the source file is executable, creates `~/bin` if needed, and symlinks the command.

Usage:

```zsh
# Make the helper executable once
chmod +x add-script-to-local-bin.sh

# Run the helper (it will prompt you):
./add-script-to-local-bin.sh
```

Example interactive flow:

- Prompt: `Path to script (relative or absolute)` — enter `bash-scripts/git-create-remote-repo-interactive.sh` (default).
- Prompt: `Command name to create in $HOME/bin` — enter `create-remote-repo`.

After running, the command will be available at `~/bin/create-remote-repo` (a symlink to the repo script). Make sure `~/bin` is on your `PATH` — the helper prints the line you can add to `~/.zshrc`:

```zsh
export PATH="$HOME/bin:$PATH"
```

Why use the helper script?
- It standardizes the process and avoids copying files repeatedly.
- It keeps the actual script in the repo (easy to update), while exposing a stable command name.

If you want, I can run `chmod +x add-script-to-local-bin.sh` for you and create a sample symlink for `git-create-remote-repo-interactive.sh`.
