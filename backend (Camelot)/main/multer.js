const multer = require('multer');
const path   = require('path');
const fs     = require('fs');

const init = function multerConfiguration(multer, config) {
  var fileLimits = {
    fileSize: '5MB'
  };

  var fileFilter = function checkFileType(req, file, callback) {
    // parse file MIMEType
    const validMIMEtypes = ['application/pdf', 'application/msword', 'application/rtf', 'text/rtf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if(validMIMEtypes.includes(file.mimetype)) {
      // Correct MIMEType
      callback(null, true);
    } else {
      // Incorrect MIMEType
      callback({ code: 'WRONG_FILE_TYPE' }, false);
    }
  };

  // Define Resume Storage and File naming convention
  var storage = multer.diskStorage({
    destination: function resumeLocation(req, file, callback) {
      // Check if Resume dump Folder exists, if not, create it.
      if(!fs.existsSync(path.join(__dirname, '/../resumes/', config.SemesterID))) {
        fs.mkdirSync(path.join(__dirname, '/../resumes/'), 484);
        fs.mkdirSync(path.join(__dirname, '/../resumes/', config.SemesterID), 484);
      } else {
      }
      callback(null, path.join(__dirname, '/../resumes/', config.SemesterID));
    },
    filename: function customFilename(req, file, callback) {
      // Formats Resume names as id_resumeFileName
      callback(null, req.user.id + '_' + file.originalname);
    }
  });

  return multer({ storage: storage, fileFilter: fileFilter, limits: {fileSize: config.resume.maxSize} });
}

module.exports = init;
