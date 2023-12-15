#!/bin/bash
#
# Redirect objects to different locations.
#
set -ex

if [ -z "$CONCEPTS_BUCKET" ]; then
    echo "The S3 bucket CONCEPTS_BUCKET is not set. Failing."
    exit 1
fi

# Per https://bugzilla.mozilla.org/show_bug.cgi?id=1706669
betterweb_redirection_objects=(betterweb betterweb/index.html)
for obj in "${betterweb_redirection_objects[@]}" ; do
  if aws s3api head-object --bucket "$CONCEPTS_BUCKET" --key "$obj" &> /dev/null ; then
    aws s3api put-object --bucket "$CONCEPTS_BUCKET" --key "$obj" --website-redirect-location https://www.mozilla.org/
  fi
done
