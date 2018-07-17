const billRecordImg = require('../models/BillRecordImg');


exports.updateProfileImg = (req, res, next) => {
  console.log(req.body);
  // `/static/${req.file.destination}/${req.file.filename}`,req.file.filename,
  billRecordImg.createImgErp(req.files, req.body.idrecord,req.user.id)
    .then(() => {
      res.json('upload complete!!!');
    });
};

exports.imgUpdate = (req, res, next) => {
  var rec_id = req.body.idrecord;
  var body_id = req.body.img;
  var user_id = req.user.id;
  console.log(req.body);
  billRecordImg.deleteImgName(rec_id)
  .then( output => {
    console.log(output);
    billRecordImg.createImgErp(body_id,rec_id,user_id)
      .then(() => {
        res.json('upload complete!!!');
      })
      .catch(next);
  })
  .catch(next);
}