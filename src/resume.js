import AWS from 'aws-sdk';
import {config_resume} from './config_resume.js';

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
    var files = document.getElementById('resumeupload').files;
    if(!files.length) {
        callback('Please choose a file to upload first.');
        return;
    }
    var resumeKey = encodeURIComponent(email);

    /*
     * security: nobody can access bucket other than the owner but with this script, which contains
     * upload, download
    */

    var params = {
        Bucket: config_resume.s3bucket,
        Key: resumeKey
    };
    
    // check if they already uploaded - if so, delete whatever's there and upload new resume
    s3.waitFor('objectExists', params, function(err, data) {
        if(!err) {
            s3.deleteObject({Key: resumeKey}, function(err, data) {
                if(err){
                    callback('Deletion error:'+ err.message);
                    return;
                }
                upload(resumeKey, files[0], callback);
            });
        } else {
            upload(resumeKey, files[0], callback);
        }
    });
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
   if(hacker) {
       return download(userEmail, callback);
   } else {
       function iterate(emails, idx, acc){
            if(idx >= emails.length) callback(true, acc);

            function innerCallback(worked, value){
                acc[worked][emails[idx]] = value;
                iterate(emails, idx + 1, acc);
            }

            download(emails[idx], innerCallback);
       }

       iterate(userEmail, 0, {true: {}, false: {}});
   }
}

export {uploadResume, downloadResume};
