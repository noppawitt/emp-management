const xlsxoutput = require('../models/BillXLSXControl');
const Excel = require('exceljs');

exports.attachmentXLSX = (req, res, next) => {
  const recId = req.query.id;
  const userid = req.user.id;
  const outputBill = xlsxoutput.findAll(recId);
  const outputData = xlsxoutput.findBillData(recId);
  const outputUser = xlsxoutput.findUser(userid);
  Promise.all([outputBill, outputData, outputUser])
    .then((output) => {
      console.log(output[0]);
      const headbill = output[0];
      const billdata = output[1];
      const user = output[2];
      const usernameTH = `${user.firstNameTh}  ${user.lastNameTh}`;
      const userPosition = user.name;
      const { userId } = user;
      const dateOfSheet = headbill.createdDate;
      const typeOfSheet = parseInt(headbill.typeId, 10);
      const workbook = new Excel.Workbook();
      const column = ['A', 'C', 'E', 'G', 'H'];

      if (typeOfSheet === 1) {
        const fileName = 'server/storage/private/xlsx/BOOK1.xlsx';
        workbook.xlsx.readFile(fileName)
          .then(() => {
            const worksheet = workbook.getWorksheet('BOOK');
            const SHEETINDEX = 9;
            worksheet.getCell('C6').value = usernameTH;
            worksheet.getCell('F6').value = userPosition;
            worksheet.getCell('H6').value = userId;
            worksheet.getCell('H5').value = dateOfSheet;

            for (let i = 0; i < billdata.length; i += 1) {
              worksheet.getCell(`${column[0]}${i + SHEETINDEX}`).value = i + 1;
              worksheet.getCell(`${column[1]}${i + SHEETINDEX}`).value = billdata[i].field1;
              worksheet.getCell(`${column[2]}${i + SHEETINDEX}`).value = billdata[i].field2;
              worksheet.getCell(`${column[3]}${i + SHEETINDEX}`).value = billdata[i].field3;
              worksheet.getCell(`${column[4]}${i + SHEETINDEX}`).value = parseInt(billdata[i].field4, 10);
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            workbook.xlsx.write(res);
          })
          .catch(next);
      }
      else if (typeOfSheet === 2) {
        const fileName = 'server/storage/private/xlsx/BOOK2.xlsx';
        workbook.xlsx.readFile(fileName)
          .then(() => {
            const worksheet = workbook.getWorksheet('BOOK');
            const SHEETINDEX = 10;
            worksheet.getCell('C7').value = usernameTH;
            worksheet.getCell('F7').value = userPosition;
            worksheet.getCell('H7').value = userId;
            worksheet.getCell('H6').value = dateOfSheet;

            for (let i = 0; i < billdata.length; i += 1) {
              worksheet.getCell(`${column[0]}${i + SHEETINDEX}`).value = i + 1;
              worksheet.getCell(`${column[1]}${i + SHEETINDEX}`).value = billdata[i].field1;
              worksheet.getCell(`${column[2]}${i + SHEETINDEX}`).value = billdata[i].field2;
              worksheet.getCell(`${column[3]}${i + SHEETINDEX}`).value = billdata[i].field3;
              worksheet.getCell(`${column[4]}${i + SHEETINDEX}`).value = parseInt(billdata[i].field4, 10);
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            workbook.xlsx.write(res);
          })
          .catch(next);
      }
      else if (typeOfSheet === 3) {
        const fileName = 'server/storage/private/xlsx/BOOK3.xlsx';
        workbook.xlsx.readFile(fileName)
          .then(() => {
            const worksheet = workbook.getWorksheet('BOOK');
            const SHEETINDEX = 10;
            worksheet.getCell('C7').value = usernameTH;
            worksheet.getCell('F7').value = userPosition;
            worksheet.getCell('H7').value = userId;
            worksheet.getCell('H6').value = dateOfSheet;

            for (let i = 0; i < billdata.length; i += 1) {
              worksheet.getCell(`${column[0]}${i + SHEETINDEX}`).value = i + 1;
              worksheet.getCell(`${column[1]}${i + SHEETINDEX}`).value = billdata[i].field1;
              worksheet.getCell(`${column[2]}${i + SHEETINDEX}`).value = billdata[i].field2;
              worksheet.getCell(`${column[3]}${i + SHEETINDEX}`).value = billdata[i].field3;
              worksheet.getCell(`${column[4]}${i + SHEETINDEX}`).value = parseInt(billdata[i].field4, 10);
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            workbook.xlsx.write(res);
          })
          .catch(next);
      }
      else if (typeOfSheet === 4) {
        const fileName = 'server/storage/private/xlsx/BOOK4.xlsx';
        workbook.xlsx.readFile(fileName)
          .then(() => {
            const worksheet = workbook.getWorksheet('BOOK');
            const SHEETINDEX = 11;
            worksheet.getCell('C7').value = usernameTH;
            worksheet.getCell('F7').value = userPosition;
            worksheet.getCell('H7').value = userId;
            worksheet.getCell('H6').value = dateOfSheet;

            for (let i = 0; i < billdata.length; i += 1) {
              worksheet.getCell(`${column[0]}${i + SHEETINDEX}`).value = billdata[i].field1;
              worksheet.getCell(`${column[1]}${i + SHEETINDEX}`).value = billdata[i].field2;
              worksheet.getCell(`${column[2]}${i + SHEETINDEX}`).value = billdata[i].field3;
              worksheet.getCell(`${column[3]}${i + SHEETINDEX}`).value = parseInt(billdata[i].field4, 10);
              worksheet.getCell(`${column[4]}${i + SHEETINDEX}`).value = billdata[i].field5;
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            workbook.xlsx.write(res);
          })
          .catch(next);
      }
    })
    .catch(next);
};
