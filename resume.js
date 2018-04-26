function upload(key, file, ACL = 'private') {
    s3.upload({
        Key: uploadKey,
        Body: file,
        ACL: 'private' 
    }, function(err, data) {
        if(err) {
            return alert('There was an error uploading your resume: ', err.message);
        }

        alert('Successfully uploaded resume.');
    });

}

function uploadResume(email) {
    var files = document.getElementById('resumeupload').files;
    if(!files.length) {
        return alert('Please choose a file to upload first.');
    }
    var resumeKey = encodeURIComponent(email);

    /*
     * security: nobody can access bucket other than the owner but with this script, which contains
     * upload, download
    */

    var params = {
        Bucket: config_resume.get('s3bucket'),
        Key: resumeKey
    };
    
    // check if they already uploaded - if so, delete whatever's there and upload new resume
    s3.waitFor(resumeKey, params, function(err, data) {
        if(err) {
            s3.deleteObject((Key: resumeKey), function(err, data) {
                if(err) 
                    return alert('Deletion error:', err.message);
                alert('Successfully deleted old resume.');
                upload(key = resumeKey, file = files[0]);
            });
        } else {
            upload(key = resumeKey, file = files[0]);
        }
    });
}

// pass hacker's email if hacker = true, else pass {hacker = false, email = the set of emails the companies want resumes for}

function download(email) {
    return s3.getObject({Bucket: config_resume.get('s3bucket'), Key: encodeURIComponent(email)}, 
                        function(err, data) {
                            if (err) 
                                return alert('Download error: ', err.message)
                        });
}

function downloadResume(hacker, userEmail) {
   if(hacker) {
       return download(userEmail);
   } else {
       var resumes = [];

       for(email in userEmail) {
           resumes.push(download(email));
       }

       return resumes;
   }
}

