#! /bin/sh
# Mostly intended to be run from travis CI
# It is expected that KEY and SECRET will be set in the environment

npm run-script build
#empty bucket, then upload
aws s3 rm s3://hackru-deploy --recursive
aws s3 cp --recursive build s3://hackru-deploy --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
aws cloudfront create-invalidation --distribution-id "E1YIAV5VULIMY7"  --paths "/*"
