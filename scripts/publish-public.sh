#!/usr/bin/env bash

set -euo pipefail

version=$(node -p "require('./package.json').version")
branch=$(git rev-parse --abbrev-ref HEAD)
otp="${NPM_CONFIG_OTP:-${PNPM_OTP:-${NPM_OTP:-}}}"
output_file=$(mktemp)
publish_args=(--access public)

if [ "$branch" != "HEAD" ]; then
  publish_args+=(--publish-branch "$branch")
fi
if [ -n "$otp" ]; then
  publish_args+=(--otp "$otp")
fi

set +e
pnpm publish "${publish_args[@]}" 2>&1 | tee "$output_file"
publish_status=${PIPESTATUS[0]}
set -e

if [ "$publish_status" -ne 0 ]; then
  if grep -q "ERR_PNPM_GIT_UNCLEAN" "$output_file" || grep -q "Unclean working tree" "$output_file"; then
    if [ -n "$(git status --porcelain)" ]; then
      git add -A
      git commit -m "chore(release): v${version}"
    fi
    pnpm publish "${publish_args[@]}"
  else
    exit "$publish_status"
  fi
fi
