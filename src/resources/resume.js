import AWS from 'aws-sdk';
import { config_resume } from 'resources/config_resume.js';

var s3 = new AWS.S3({
  accessKeyId: config_resume.keyId,
  secretAccessKey: config_resume.secretKey
});

function upload(key, file, callback) {
  s3.upload({
    Key: key,
    Body: file,
    Bucket: config_resume.s3bucket,
    ACL: 'private'
  }, function(err, data) {
    if(err) {
      callback('There was an error uploading your resume: '+ err.message);
      return;
    }

    callback('Successfully uploaded resume.');
  });

}

function uploadResume(email, callback) {
  const files = document.getElementById('resumeupload').files;
  if(!files.length) {
    callback('Please choose a file to upload first.');
    return;
  }
  const resumeKey = encodeURIComponent(email);
  upload(resumeKey, files[0], callback);
}

// pass hacker's email if hacker = true, else pass {hacker = false, email = the set of emails the companies want resumes for}

function download(email, callback) {
  s3.getObject({Bucket: config_resume.s3bucket, Key: encodeURIComponent(email)}, 
    function(err, data) {
      if (err) 
        callback(false, 'Download error: ', err.message);
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
