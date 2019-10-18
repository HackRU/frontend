#! /bin/sh
# Mostly intended to be run from travis CI
# It is expected that KEY and SECRET will be set in the environment
set -e
npm run-script build
#empty bucket, then upload
aws s3 rm s3://hackru-frontend-prod --recursive
aws s3 cp --recursive build s3://hackru-frontend-prod --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
aws s3 cp --recursive --exclude '*' --include '*.svg' --content-type 'image/svg+xml' build s3://hackru-frontend-prod --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
aws cloudfront create-invalidation --distribution-id "E1YIAV5VULIMY7"  --paths "/*"
