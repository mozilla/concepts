#!/bin/bash

# This file is used to deploy Concepts to an S3 bucket. It
# expects to be run from the root of the concepts directory and
# an S3 bucket name in an environment variable
# $CONCEPTS_BUCKET

set -ex

if [ -z "$CONCEPTS_BUCKET" ]; then
    echo "The S3 bucket is not set. Failing."
    exit 1
fi

ARTIFACTS=public
if [ ! -d "${ARTIFACTS}" ]; then
    echo "Can't find /${ARTIFACTS}/ directory. Are you running from the correct"\
         "root directory?"
    exit 1
fi

# The basic strategy is to sync all the files that need special attention
# first, and then sync everything else which will get defaults


# For short-lived assets; in seconds
TEN_MINUTES="600"

# For long-lived assets; in seconds
ONE_YEAR="31536000"

CSP="\"content-security-policy\": \"default-src 'self';
connect-src 'self' https://sentry.prod.mozaws.net https://www.google-analytics.com https://ssl.google-analytics.com;
font-src 'self';
form-action 'none';
frame-ancestors 'self';
frame-src https://www.youtube.com;
img-src 'self' data: https://ssl.google-analytics.com https://www.google-analytics.com;
object-src 'none';
script-src 'self' https://ssl.google-analytics.com;
style-src 'self' 'unsafe-inline'\""
HSTS="\"strict-transport-security\": \"max-age=${ONE_YEAR}; includeSubDomains; preload\""
TYPE="\"x-content-type-options\": \"nosniff\""
XSS="\"x-xss-protection\": \"1; mode=block\""
ACAO="\"Access-Control-Allow-Origin\": \"*\""


# build version.json if it isn't provided
[ -e version.json ] || $(dirname $0)/build-version-json.sh

if [ -e version.json ]; then
    mv version.json ${ARTIFACTS}/__version__
    # __version__ JSON; short cache
    aws s3 cp \
      --cache-control "max-age=${TEN_MINUTES}" \
      --content-type "application/json" \
      --metadata "{${ACAO}, ${HSTS}, ${TYPE}}" \
      --metadata-directive "REPLACE" \
      --acl "public-read" \
      ${ARTIFACTS}/__version__ s3://${CONCEPTS_BUCKET}/__version__
fi

# HTML; short cache
aws s3 sync \
  --cache-control "max-age=${TEN_MINUTES}" \
  --content-type "text/html" \
  --exclude "*" \
  --include "*.html" \
  --metadata "{${CSP//$'\n'/ }, ${HSTS}, ${TYPE}, ${XSS}}" \
  --metadata-directive "REPLACE" \
  --acl "public-read" \
  ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# JSON; short cache
aws s3 sync \
  --cache-control "max-age=${TEN_MINUTES}" \
  --content-type "application/json" \
  --exclude "*" \
  --include "*.json" \
  --metadata "{${ACAO}, ${HSTS}, ${TYPE}}" \
  --metadata-directive "REPLACE" \
  --acl "public-read" \
  ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# XPI; short cache; amazon won't detect the content-type correctly
aws s3 sync \
  --cache-control "max-age=${TEN_MINUTES}" \
  --content-type "application/x-xpinstall" \
  --exclude "*" \
  --include "*.xpi" \
  --metadata "{${HSTS}, ${TYPE}}" \
  --metadata-directive "REPLACE" \
  --acl "public-read" \
  ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# RDF; short cache; amazon won't detect the content-type correctly
aws s3 sync \
  --cache-control "max-age=${TEN_MINUTES}" \
  --content-type "text/rdf" \
  --exclude "*" \
  --include "*.rdf" \
  --metadata "{${HSTS}, ${TYPE}}" \
  --metadata-directive "REPLACE" \
  --acl "public-read" \
  ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# l10n files; short cache;
aws s3 sync \
    --cache-control "max-age=${TEN_MINUTES}" \
    --exclude "*" \
    --include "*.ftl" \
    --metadata "{${HSTS}, ${TYPE}}" \
    --metadata-directive "REPLACE" \
    --acl "public-read" \
    ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# SVG; cache forever, assign correct content-type
aws s3 sync \
  --cache-control "max-age=${ONE_YEAR}, immutable" \
  --content-type "image/svg+xml" \
  --exclude "*" \
  --include "*.svg" \
  --metadata "{${HSTS}, ${TYPE}}" \
  --metadata-directive "REPLACE" \
  --acl "public-read" \
  ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# Everything else; cache forever, because it has hashes in the filenames
aws s3 sync \
  --delete \
  --cache-control "max-age=${ONE_YEAR}, immutable" \
  --metadata "{${HSTS}, ${TYPE}}" \
  --metadata-directive "REPLACE" \
  --acl "public-read" \
  ${ARTIFACTS}/ s3://${CONCEPTS_BUCKET}/

# HTML - `path/index.html` to `path` resources; short cache
for fn in $(find ${ARTIFACTS} -name 'index.html' -not -path '${ARTIFACTS}/index.html'); do
  s3path=${fn#${ARTIFACTS}/}
  s3path=${s3path%/index.html}
  aws s3 cp \
    --cache-control "max-age=${TEN_MINUTES}" \
    --content-type "text/html" \
    --exclude "*" \
    --include "*.html" \
    --metadata "{${CSP//$'\n'/ }, ${HSTS}, ${TYPE}, ${XSS}}" \
    --metadata-directive "REPLACE" \
    --acl "public-read" \
    $fn s3://${CONCEPTS_BUCKET}/${s3path}
done
