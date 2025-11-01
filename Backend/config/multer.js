// config/multer.js
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage(); // Keep file in memory for parsing

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'text/csv',
    'application/vnd.ms-excel' // .xls (optional)
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only Excel (.xlsx) and CSV allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Allow only 1 file per request
  },
  onError: (err, next) => {
    if (err.code === 'LIMIT_FILE_SIZE') {
      next(new Error('File size too large. Maximum size is 5MB'));
    } else {
      next(err);
    }
  }
});

module.exports = upload;