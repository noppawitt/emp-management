const router = require('express').Router();
const ExamController = require('../../controllers/ExamController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'server/storage/private/exam-img');
    },
    filename: (req, res, cb) => {
        cb(null, req.file.filename);
    }
});

const upload = multer({ storage });

router.post('/upload-image-exam', upload.single('image'));
router.post('/', ExamController.create);
router.get('/', ExamController.findAll);
router.delete('/', ExamController.delete);
router.put('/', ExamController.edit);

module.exports = router;
