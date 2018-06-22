const Timesheet = require('../models/Timesheet');
const LeaveRequest = require('../models/LeaveRequest');
const HasProject = require('../models/HasProject');
const Project = require('../models/Project');
const EmployeeInfo = require('../models/EmployeeInfo');
const Holiday = require('../models/Holiday');
const User = require('../models/User');
const Excel = require('exceljs');
const moment = require('moment');

const getProjectDetail = excelType => new Promise(async (resolve, reject) => {
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

const getTimesheetForProject = (projectId, month, year) => new Promise(async (resolve, reject) => {
  try {
    
  }
})

const fillRow = (worksheet, day) => {
  const column = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  for (let i = 0; i < column.length; i += 1) {
    const cell = worksheet.getCell(`${column[i]}${day + 7}`);
    cell.style = Object.create(cell.style);
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'B8CCE4' }
    };
  }
};

exports.createReport = (req, res, next) => {
  const { excelType } = req.body;
  if (excelType.reportType === 'Timesheet (Normal)' || excelType.reportType === 'Timesheet (Special)') {
    let filename = '';
    if (excelType.reportType === 'Timesheet (Normal)') {
      filename = 'server/storage/private/report/Playtorium_Timesheet_Normal_ver4.xlsx';
    }
    else {
      filename = 'server/storage/private/report/Playtorium_Timesheet_Sepecial_ver4.xlsx';
    }
    getProjectDetail(excelType)
      .then((project) => {
        const { holiday } = project;
        const { timesheet } = project;
        const { leave } = project;
        const workbook = new Excel.Workbook();
        workbook.xlsx.readFile(filename)
          .then(() => {
            const worksheet = workbook.getWorksheet('Timesheet');
            const yearMonth = `${excelType.year}-${excelType.month}`;
            const numberOfDayInMonth = moment(yearMonth, 'YYYY-MM').daysInMonth();
            // write report header
            worksheet.getCell('B2').value = `${project.user.firstName} ${project.user.lastName}`;
            worksheet.getCell('E2').value = excelType.userId;
            worksheet.getCell('B3').value = project.role;
            worksheet.getCell('E3').value = `1 - ${numberOfDayInMonth} ${moment(excelType.month, 'MM').format('MMMM')} ${excelType.year}`;
            worksheet.getCell('C4').value = project.detail.customer;
            // write day and Saturday, Sunday in report timesheet
            for (let day = 1; day <= numberOfDayInMonth; day += 1) {
              const date = `${yearMonth}-${day}`;
              worksheet.getCell(`A${day + 7}`).value = date;
              if (moment(date, 'YYYY-MM-DD').isoWeekday() === 6 || moment(date, 'YYYY-MM-DD').isoWeekday() === 7) {
                worksheet.getCell(`B${day + 7}`).value = 'Holiday';
                fillRow(worksheet, day);
              }
            }
            // write holiday in Timesheet report
            for (let i = 0; i < holiday.length; i += 1) {
              const { date } = holiday[i];
              const day = parseInt(moment(date).format('DD'), 10);
              fillRow(worksheet, day);
              worksheet.getCell(`C${day + 7}`).value = holiday[i].dateName;
              worksheet.getCell(`B${day + 7}`).value = 'Holiday';
            }
            // write Leave in Timesheet
            for (let j = 0; j < leave.length; j += 1) {
              const { leaveDate } = leave[j];
              const day = parseInt(moment(leaveDate).format('DD'), 10);
              fillRow(worksheet, day);
              worksheet.getCell(`B${day + 7}`).value = 'Leave';
              worksheet.getCell(`C${day + 7}`).value = leave[j].leaveType;
            }
            // write Timesheet
            for (let k = 0; k < timesheet.length; k += 1) {
              const { date } = timesheet[k];
              const day = parseInt(moment(date).format('DD'), 10);
              worksheet.getCell(`B${day + 7}`).value = timesheet[k].task;
              worksheet.getCell(`C${day + 7}`).value = timesheet[k].description;
              worksheet.getCell(`D${day + 7}`).value = timesheet[k].timeIn;
              worksheet.getCell(`E${day + 7}`).value = timesheet[k].timeOut;
            }
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            res.setHeader('Content-Disposition', `attachment; filename="Timesheet_${excelType.year}_${excelType.month}_${excelType.projectId}.xlsx`);
            workbook.xlsx.write(res);
          })
          .catch(next);
      })
      .catch(next);
  }
  else if (excelType.reportType === 'Summary Timesheet') {
    const filename = 'server/storage/private/report/Playtorium_Summary_Timesheet.xlsx';
    const workbook = new Excel.Workbook();
    workbook.xlsx.readFile(filename)
      .then(() => {
        const worksheet = workbook.getWorksheet('Timesheet');
        const months = moment.monthsShort();
        const monthCell = ['F3', 'I3', 'L3', 'N3', 'O3', 'P3', 'Q3', 'R3', 'S3', 'T3', 'U3', 'V3'];
        for (let i = 0; i < months.length; i += 1) {
          worksheet.getCell(monthCell[i]).value = `${months[i]}-${moment(excelType.year, 'YYYY').format('YY')}`;
          
        }
        User.findAll()
          .then((users) => {
            for (let i = 0; i < users.length; i += 1) {

            }
          })
          .catch(next);
      })
      .catch(next);
  }
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
