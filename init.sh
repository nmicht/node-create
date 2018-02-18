#!/usr/bin/env bash

NAME="$1"
sed -i "s/npm-starter-kit/$NAME/g" "$(eval find . -maxdepth 1 -false "-o -name "*.{json,md})"
