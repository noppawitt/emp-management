const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const FileController = require('../../controllers/FileController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `server/storage/private/projects/${req.body.projectId}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), FileController.create);

router.get('/download', FileController.download);

router.get('/', FileController.findByProjectId);

router.delete('/', FileController.delete);

module.exports = router;
