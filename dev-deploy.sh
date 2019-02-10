#! /bin/sh
# Mostly intended to be run from travis CI
# It is expected that KEY and SECRET will be set in the environment

NODE_ENV=development npm run-script build
#AWS_ACCESS_KEY_ID="AKIAIIQYLYZIWH4INT7Q" AWS_SECRET_ACCESS_KEY="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"

#empty bucket, then upload
AWS_ACCESS_KEY_ID="AKIAIIQYLYZIWH4INT7Q" AWS_SECRET_ACCESS_KEY="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" aws s3 rm s3://hackru-frontend --recursive
AWS_ACCESS_KEY_ID="AKIAIIQYLYZIWH4INT7Q" AWS_SECRET_ACCESS_KEY="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" aws s3 cp --recursive build s3://hackru-frontend --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
AWS_ACCESS_KEY_ID="AKIAIIQYLYZIWH4INT7Q" AWS_SECRET_ACCESS_KEY="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" aws cloudfront create-invalidation --distribution-id "E1G9Y2VX0F41B6"  --paths "/*"
