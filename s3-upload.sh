#! /bin/sh

head -5 src/resources/config_resume.js > temp.js
echo "module.exports = config_resume" >> temp.js
KEY_ID=$(node -e "const config_resume = require('./temp.js');console.log(config_resume.keyId);")
SECRET=$(node -e "const config_resume = require('./temp.js');console.log(config_resume.secretKey);")
rm temp.js

AWS_ACCESS_KEY_ID="$KEY_ID" AWS_SECRET_ACCESS_KEY="$SECRET" aws s3 cp --recursive build s3://hackru-frontend --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers
