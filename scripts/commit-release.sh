#!/usr/bin/env bash

set -euo pipefail

version=$(node -p "require('./package.json').version")

if [ -n "$(git status --porcelain)" ]; then
  git add -A
  git commit -m "chore(release): v${version}"
fi
