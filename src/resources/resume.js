import AWS from 'aws-sdk';
import { config_resume } from 'resources/config_resume.js';

var s3 = new AWS.S3({
  accessKeyId: config_resume.keyId,
  secretAccessKey: config_resume.secretKey
});

async function upload(key, file, callback) {
  return s3.upload({
    Key: key,
    Body: file,
    Bucket: config_resume.s3bucket,
    ACL: 'private'
  }).promise()
    .then(obj => 'Successfully uploaded resume')
    .catch(err => 'There was an error uploading your resume' + err.message);
}

async function uploadResume(email, callback) {
  const files = document.getElementById('resumeupload').files;
  if(!files.length) {
    return 'Please choose a file to upload first.';
  }
  const resumeKey = encodeURIComponent(email);
  return await upload(resumeKey, files[0], callback);
}

// pass hacker's email if hacker = true, else pass {hacker = false, email = the set of emails the companies want resumes for}

function download(email, callback) {
  s3.headObject({Bucket: config_resume.s3bucket, Key: encodeURIComponent(email)}, 
    function(err, data) {
      if (err) 
        callback(false, 'Resume not found');
      else
        callback(true, data);
    });
}

function downloadResume(hacker, userEmail, callback) {
  
  
  
  function iterate(emails, idx, acc){
    if(idx >= emails.length) callback(true, acc);

    function innerCallback(worked, value){
      acc[worked][emails[idx]] = value;
      iterate(emails, idx + 1, acc);
    }

    download(emails[idx], innerCallback);
  }
  
  
  if(hacker) {
    return download(userEmail, callback);
  } else {

    iterate(userEmail, 0, {true: {}, false: {}});
  }
}




export {uploadResume, downloadResume};
