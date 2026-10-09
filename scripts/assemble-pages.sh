#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
dest="${1:-"$root/_site"}"

if [[ ! -d "$root/docs" ]]; then
  echo "docs/ is missing. Run npm run docs:build first." >&2
  exit 1
fi

rm -rf "$dest"
mkdir -p "$dest"
cp "$root/index.html" "$root/favicon.svg" "$root/robots.txt" "$dest/"
touch "$dest/.nojekyll"
cp -a "$root/docs" "$dest/docs"
