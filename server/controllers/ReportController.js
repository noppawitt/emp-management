const timesheet = require('../models/Timesheet');
const Excel = require('exceljs');
const fs = require('fs');

exports.createReport = (req, res, next) => {
  // const workbook = new Excel.Workbook();
  // workbook.xlsx.readFile('server/storage/report/excel.xlsx')
  //   .then(() => {
  //     const worksheet = workbook.getWorksheet('Sheet1');
  //     worksheet.getCell('A1').value = '12345';
  //     return workbook.xlsx.writeFile('server/storage/report/gg.xlsx');
  //   })
  //   .then(() => {
  //     res.download('server/storage/report/gg.xlsx', 'gg.xlsx',() => {
  //       fs.unlink('server/storage/report/gg.xlsx');
  //     });
  //   });
  const options = {
    filename: 'server/storage/report/excel.xlsx'  
  };
  const workbook = new Excel.stream.xlsx.WorkbookWriter(options);
  const worksheet = workbook.getWorksheet('Sheet1');
  worksheet.getCell('A1').value = '12345';
  worksheet.getRow(1).commit();
  worksheet.commit();
  workbook.commit()
    .then(() => {
      res.send(workbook);
    });
};
