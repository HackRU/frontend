#! /bin/sh
# Mostly intended to be run from travis CI
# It is expected that KEY and SECRET will be set in the environment

NODE_ENV=development npm run-script build
#empty bucket, then upload
aws s3 rm s3://hackru-frontend-dev --recursive
aws s3 cp --recursive build s3://hackru-frontend-dev --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
aws s3 cp --recursive --exclude '*' --include '*.svg' --content-type 'image/svg+xml' build s3://hackru-frontend-dev --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers 
aws cloudfront create-invalidation --distribution-id "E1G9Y2VX0F41B6"  --paths "/*"
