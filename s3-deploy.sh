#! /bin/sh

head -6 src/resources/config_resume.js > temp.js
echo "module.exports = config_resume" >> temp.js
KEY_ID=$(node -e "const config_resume = require('./temp.js');console.log(config_resume.keyId);")
SECRET=$(node -e "const config_resume = require('./temp.js');console.log(config_resume.secretKey);")
rm temp.js
npm run-script build

#empty bucket, then upload
AWS_ACCESS_KEY_ID="$KEY_ID" AWS_SECRET_ACCESS_KEY="$SECRET" aws s3 rm s3://hackru-deploy --recursive
AWS_ACCESS_KEY_ID="$KEY_ID" AWS_SECRET_ACCESS_KEY="$SECRET" aws s3 cp --recursive build s3://hackru-deploy --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
