#!/usr/bin/env bash

set -euo pipefail

version=$(node -p "require('./package.json').version")
output_file=$(mktemp)

set +e
pnpm publish --access public 2>&1 | tee "$output_file"
publish_status=${PIPESTATUS[0]}
set -e

if [ "$publish_status" -ne 0 ]; then
  if grep -q "ERR_PNPM_GIT_UNCLEAN" "$output_file" || grep -q "Unclean working tree" "$output_file"; then
    if [ -n "$(git status --porcelain)" ]; then
      git add -A
      git commit -m "chore(release): v${version}"
    fi
    pnpm publish --access public
  else
    exit "$publish_status"
  fi
fi
