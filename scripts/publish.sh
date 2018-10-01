#!/usr/bin/env bash

# Get current directory.
CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_DIR="$( dirname "$DIR" )"

PACKAGES=$(ls "${PROJECT_DIR}/packages/@myntra/")

for PACKAGE in ${PACKAGES}; do
  cd "${PROJECT_DIR}/packages/@myntra/${PACKAGE}"
  echo "=> Publishing @myntra/${PACKAGE}"
  echo "   Version: $(node -e 'const { version } = require("./package.json"); console.log(version)')"
  PRIVATE="$(node -e 'const { private } = require("./package.json"); console.log(private ? "true" : "false")')"

  if [ "${PRIVATE}" = "false" ]; then
    echo "   $(node ${CURRENT_DIR}/publish.js)"
  else
    echo "   Private package."
  fi

  echo ""
  cd - &> /dev/null
done
