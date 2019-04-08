#!/usr/bin/env bash

if [ -z "${BRANCH}" ]; then
  echo "No branch found to build"
  exit 1
fi

if [[ "master" == "${BRANCH}" ]]
then
  DOCS_URL="http://uikit.myntra.com"
else
  DOCS_URL="http://uikit.myntra.com/${BRANCH}"
fi

echo "Docs are uploaded at ${DOCS_URL}/" | tee ${WORKSPACE}/description.txt
echo "Coverage: ${DOCS_URL}/coverage/" | tee -a ${WORKSPACE}/description.txt

# Install dependencies:
pnpm install


# Build docs:
npm run docs:build

# Deploy docs:
mkdir -p /var/lib/jenkins/workspace/uikit-consolidated-workspace/${BRANCH}

if [[ "master" == "${BRANCH}" ]]
then
  cp -r dist/* /var/lib/jenkins/workspace/uikit-consolidated-workspace
else
  cp -r dist/* /var/lib/jenkins/workspace/uikit-consolidated-workspace/${BRANCH}
fi


# Run test:
export CI=true

npm test -- --coverage --silent --ci

# Copy coverage reports.
if [[ "master" == "${BRANCH}" ]]
then
  mkdir -p /var/lib/jenkins/workspace/uikit-consolidated-workspace/coverage/
  cp -r coverage/lcov-report/* /var/lib/jenkins/workspace/uikit-consolidated-workspace/coverage/
else
  mkdir -p /var/lib/jenkins/workspace/uikit-consolidated-workspace/${BRANCH}/coverage/
  cp -r coverage/lcov-report/* /var/lib/jenkins/workspace/uikit-consolidated-workspace/${BRANCH}/coverage/
fi

# Cleanup:
find "/var/lib/jenkins/workspace/uikit-consolidated-workspace/feat/" -type d -depth 1 -ctime +14 -exec rm -rf {} \; || echo ''
find "/var/lib/jenkins/workspace/uikit-consolidated-workspace/fix/" -type d -depth 1 -ctime +14 -exec rm -rf {} \; || echo ''
find "/var/lib/jenkins/workspace/uikit-consolidated-workspace/chore/" -type d -depth 1 -ctime +14 -exec rm -rf {} \; || echo ''
