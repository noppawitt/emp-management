const router = require('express').Router();
const ExamController = require('../../controllers/ExamController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'server/storage/private/exam-img');
    },
    filename: (req, res, cb) => {
        cb(null, 'test');
    }
});

const upload = multer({ storage });

router.post('/upload-image-exam', upload.single('image[]'), function(req, res, next){
    console.log(req.body);
    console.log(req.image)
    console.log(req.file);
    console.log(req.files);
    console.log(res.body);
    console.log(res.image);
    console.log(res.file);
    console.log(res.files);
    res.json();
});
router.post('/', ExamController.create);
router.get('/', ExamController.findAll);
router.delete('/', ExamController.delete);
router.put('/', ExamController.edit);

module.exports = router;
