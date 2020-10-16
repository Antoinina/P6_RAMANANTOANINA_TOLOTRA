const multer = require('multer');

const MIME_TYPES= {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

// Save the file which is upload
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_'); //Delete spaces in the filename
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image'); // Export the multer and indicate that is a single file type img