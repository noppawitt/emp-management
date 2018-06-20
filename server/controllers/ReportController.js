const Timesheet = require('../models/Timesheet');
const LeaveRequest = require('../models/LeaveRequest');
const HasProject = require('../models/HasProject');
const Project = require('../models/Project');
const EmployeeInfo = require('../models/EmployeeInfo');
const Holiday = require('../models/Holiday');
const Excel = require('exceljs');
const moment = require('moment');

exports.createReport = (req, res, next) => {
  const { excelType } = req.body;
  const getProjectDetail = new Promise(async (resolve, reject) => {
    try {
      const project = await HasProject.findByProjectIdAndUserId(excelType.projectId, excelType.userId);
      project.detail = await Project.findById(excelType.projectId);
      project.user = await EmployeeInfo.findById(excelType.userId);
      project.timesheet = await Timesheet.findTimesheetInProject(excelType.year, excelType.month, excelType.projectId, excelType.userId);
      project.leave = await LeaveRequest.findByYearAndMonth(excelType.year, excelType.month, excelType.userId);
      project.holiday = await Holiday.findByYearAndMonth(excelType.year, excelType.month);
      resolve(project);
    }
    catch (error) {
      reject(error);
    }
  });
  if (excelType.reportType === 'Timesheet (Normal)' || excelType.reportType === 'Timesheet (Special)') {
    let filename = '';
    if (excelType.reportType === 'Timesheet (Normal)') {
      filename = 'server/storage/report/Playtorium_Timesheet_Normal_ver4.xlsx';
    }
    else {
      filename = 'server/storage/report/Playtorium_Timesheet_Sepecial_ver4.xlsx';
    }
    getProjectDetail
      .then((project) => {
        const { holiday } = project;
        const { timesheet } = project;
        const workbook = new Excel.Workbook();
        workbook.xlsx.readFile(filename)
          .then(() => {
            console.log(project);
            const worksheet = workbook.getWorksheet('Timesheet');
            // write report header
            worksheet.getCell('B2').value = `${project.user.firstName} ${project.user.lastName}`;
            worksheet.getCell('E2').value = excelType.userId;
            worksheet.getCell('B3').value = project.role;
            worksheet.getCell('E3').value = `${excelType.month} /  ${project.year}`;
            worksheet.getCell('C4').value = project.detail.customer;
            // write day and Saturday, Sunday in report timesheet
            const yearMonth = `${excelType.year}-${excelType.month}`;
            const numberOfDayInMonth = moment(yearMonth, 'YYYY-MM').daysInMonth();
            for (let day = 1; day <= numberOfDayInMonth; day += 1) {
              const date = `${yearMonth}-${day}`;
              worksheet.getCell(`A${day + 7}`).value = date;
              if (moment(date, 'YYYY-MM-DD').isoWeekday() === 6 || moment(date, 'YYYY-MM-DD').isoWeekday() === 7) {
                worksheet.getCell(`B${day + 7}`).value = 'Holiday';
                const cell1 = worksheet.getCell(`A${day + 7}`);
                cell1.style = Object.create(cell1.style);
                cell1.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell2 = worksheet.getCell(`B${day + 7}`);
                cell2.style = Object.create(cell2.style);
                cell2.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell3 = worksheet.getCell(`C${day + 7}`);
                cell3.style = Object.create(cell3.style);
                cell3.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell4 = worksheet.getCell(`D${day + 7}`);
                cell4.style = Object.create(cell4.style);
                cell4.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell5 = worksheet.getCell(`E${day + 7}`);
                cell5.style = Object.create(cell5.style);
                cell5.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell6 = worksheet.getCell(`F${day + 7}`);
                cell6.style = Object.create(cell6.style);
                cell6.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell7 = worksheet.getCell(`G${day + 7}`);
                cell7.style = Object.create(cell7.style);
                cell7.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell8 = worksheet.getCell(`H${day + 7}`);
                cell8.style = Object.create(cell8.style);
                cell8.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell9 = worksheet.getCell(`I${day + 7}`);
                cell9.style = Object.create(cell9.style);
                cell9.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
                const cell10 = worksheet.getCell(`J${day + 7}`);
                cell10.style = Object.create(cell10.style);
                cell10.fill = {
                  type: 'pattern',
                  pattern: 'solid',
                  fgColor: { argb: 'B8CCE4' }
                };
              }
            }
            // write holiday in Timesheet report
            for (let i = 0; i < holiday.length; i += 1) {
              const { date } = holiday[i];
              const day = parseInt(moment(date).format('DD'), 10);
              const cell1 = worksheet.getCell(`A${day + 7}`);
              cell1.style = Object.create(cell1.style);
              cell1.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell2 = worksheet.getCell(`B${day + 7}`);
              cell2.style = Object.create(cell2.style);
              cell2.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell3 = worksheet.getCell(`C${day + 7}`);
              cell3.style = Object.create(cell3.style);
              cell3.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell4 = worksheet.getCell(`D${day + 7}`);
              cell4.style = Object.create(cell4.style);
              cell4.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell5 = worksheet.getCell(`E${day + 7}`);
              cell5.style = Object.create(cell5.style);
              cell5.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell6 = worksheet.getCell(`F${day + 7}`);
              cell6.style = Object.create(cell6.style);
              cell6.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell7 = worksheet.getCell(`G${day + 7}`);
              cell7.style = Object.create(cell7.style);
              cell7.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell8 = worksheet.getCell(`H${day + 7}`);
              cell8.style = Object.create(cell8.style);
              cell8.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell9 = worksheet.getCell(`I${day + 7}`);
              cell9.style = Object.create(cell9.style);
              cell9.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              const cell10 = worksheet.getCell(`J${day + 7}`);
              cell10.style = Object.create(cell10.style);
              cell10.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'B8CCE4' }
              };
              worksheet.getCell(`C${day + 7}`).value = holiday[i].dateName;
              worksheet.getCell(`B${day + 7}`).value = 'Holiday';
            }
            // write Timesheet
            for (let j = 0; j < timesheet.length; j += 1) {
              const { date } = timesheet[j];
              const day = parseInt(moment(date).format('DD'), 10);
              worksheet.getCell(`B${day + 7}`).value = timesheet[j].task;
              worksheet.getCell(`C${day + 7}`).value = timesheet[j].description;
              worksheet.getCell(`D${day + 7}`).value = timesheet[j].timeIn;
              console.log(timesheet[j].timeIn);
              worksheet.getCell(`E${day + 7}`).value = timesheet[j].timeOut;
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            workbook.xlsx.write(res);
          });
      })
      .catch(next);
  }
  // const workbook = new Excel.Workbook();
  // workbook.xlsx.readFile('server/storage/report/excel.xlsx')
  //   .then(() => {
  //     const worksheet = workbook.getWorksheet('Sheet1');
  //     worksheet.getCell('A1').value = '12345';
  //     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  //     workbook.xlsx.write(res);
  //   })
  //   .catch(next);
};
