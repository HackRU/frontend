import AWS from 'aws-sdk';
import { config_resume } from 'resources/config_resume.js';

var s3 = new AWS.S3({
  accessKeyId: config_resume.keyId,
  secretAccessKey: config_resume.secretKey
});

async function upload(key, file) {
  return s3.upload({
    Key: key,
    Body: file,
    Bucket: config_resume.s3bucket,
    ACL: 'private'
  }).promise()
    .then(obj => 'Successfully uploaded resume')
    .catch(err => 'There was an error uploading your resume' + err.message);
}

async function uploadResume(email) {
  const files = document.getElementById('resumeupload').files;
  if(!files.length) {
    return 'Please choose a file to upload first.';
  }
  const resumeKey = encodeURIComponent(email);
  return await upload(resumeKey, files[0]);
}

// pass hacker's email if hacker = true, else pass {hacker = false, email = the set of emails the companies want resumes for}

async function resumeExists(userEmail) {
  return s3.headObject({Bucket: config_resume.s3bucket, Key: encodeURIComponent(userEmail)})
    .promise()
    .then(obj => true)
    .catch(err => false);
}

export {uploadResume, resumeExists};
