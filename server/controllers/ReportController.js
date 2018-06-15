const timesheet = require('../models/Timesheet');
const Excel = require('exceljs');

exports.createReport = (req, res, next) => {
  const workbook = new Excel.Workbook();
  workbook.xlsx.readFile('../../storage/report/excel.xlsx')
    .then(() => {
      let worksheet = workbook.getWorksheet(1);
    });
};
