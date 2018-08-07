const db = require('../db');
const moment = require('moment');

const ImageErp = {};

ImageErp.createImgErp = (filearray, idRecord, userid) => (
  db.tx((t) => {
    const queries = filearray.map(data => t.one('INSERT INTO billimageupload (bill_record_id, filepath, filename, created_date, created_user) VALUES ($1,$2,$3,$4,$5) RETURNING id', [
      idRecord, data.destination, data.filename, moment().format('YYYY-MM-DD HH:mm:ss'), userid
    ], a => +a.id));
    return t.batch(queries);
  })
);
ImageErp.deleteImgName = billRecordId => (
  db.result('DELETE FROM billimageupload WHERE bill_record_id=$1 ', [billRecordId])
);

module.exports = ImageErp;
