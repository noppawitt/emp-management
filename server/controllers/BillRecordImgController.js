const BillRecordImg = require('../models/BillRecordImg');

exports.updateProfileImg = (req, res, next) => {
  console.log(req.body);
  // `/static/${req.file.destination}/${req.file.filename}`,req.file.filename,
  BillRecordImg.createImgErp(req.files, req.body.idrecord, req.user.id)
    .then(() => {
      res.json('upload complete!!!');
    });
};

exports.imgUpdate = (req, res, next) => {
  const recId = req.body.idrecord;
  const bodyId = req.body.img;
  const userId = req.user.id;
  console.log(req.body);
  BillRecordImg.deleteImgName(recId)
    .then((output) => {
      console.log(output);
      BillRecordImg.createImgErp(bodyId, recId, userId)
        .then(() => {
          res.json('upload complete!!!');
        })
        .catch(next);
    })
    .catch(next);
};
