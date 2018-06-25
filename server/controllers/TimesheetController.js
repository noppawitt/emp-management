const Timesheet = require('../models/Timesheet');
const moment = require('moment');

const calTotalHours = (timeIn, timeOut) => new Promise((resolve, reject) => {
  try {
    switch (timeIn) {
      case '12:30':
        timeIn = '13:00';
        break;
      case '18:30':
        timeIn = '19:00';
        break;
      default:
        break;
    }
    switch (timeOut) {
      case '12:30':
        timeOut = '12:00';
        break;
      case '18:30':
        timeOut = '18:00';
        break;
      default:
        break;
    }
    let totalHours = 0;
    const startTime = moment.duration(timeIn, 'HH:mm');
    const endTime = moment.duration(timeOut, 'HH:mm');
    const timeInHour = moment(timeIn, 'HH:mm').hour();
    const timeOutHour = moment(timeOut, 'HH:mm').hour();
    const diff = endTime.subtract(startTime);
    const min = (diff.minutes() / 60) * 100;
    if (timeInHour <= 12 && timeOutHour <= 12) {
      totalHours = diff.hours() + min;
    }
    else if (timeInHour <= 12 && timeOutHour <= 18) {
      const hour = diff.hours() - 1;
      totalHours = hour + min;
    }
    else if (timeInHour <= 12 && timeOutHour >= 19) {
      const hour = diff.hours() - 2;
      totalHours = hour + min;
    }
    else if (timeInHour >= 13 && timeOutHour <= 18) {
      totalHours = diff.hours() + min;
    }
    else if (timeInHour >= 13 && timeOutHour >= 19) {
      const hour = diff.totalHours() - 1;
      totalHours = hour + min;
    }
    else if (timeInHour >= 19 && timeOutHour >= 19) {
      totalHours = diff.hours() + min;
    }
    resolve(totalHours);
  }
  catch (error) {
    reject(error);
  }
});

exports.create = (req, res, next) => {
  const newTimesheetArray = req.body.timesheets;
  newTimesheetArray.forEach((timesheet) => {
    const newTimesheet = {};
    newTimesheet.userId = timesheet.userId;
    newTimesheet.date = timesheet.date;
    newTimesheet.projectId = timesheet.projectId;
    newTimesheet.timeIn = timesheet.timeIn;
    newTimesheet.timeOut = timesheet.timeOut;
    calTotalHours(newTimesheet.timeIn, newTimesheet.timeOut)
      .then((totalhours) => {
        newTimesheet.totalhours = totalhours;
        Timesheet.create(newTimesheet, req.user.id)
          .then((createdTimesheet) => {
            res.json(createdTimesheet);
          })
          .catch(next);
      });
  });
};

exports.update = (req, res, next) => {
  const editTimesheet = req.body.timesheet;
  calTotalHours(editTimesheet.timeIn, editTimesheet.timeOut)
    .then((totalhours) => {
      editTimesheet.totalhours = totalhours;
      Timesheet.update(editTimesheet, req.user.id)
        .then((updatedTimesheet) => {
          req.json(updatedTimesheet);
        })
        .catch(next);
    });
};

exports.findByUserId = (req, res, next) => {
  Timesheet.findByUserId(req.user.id)
    .then((timesheets) => {
      res.json(timesheets);
    })
    .catch(next);
};

exports.delete = (req, res, next) => {
  Timesheet.delete(req.body.id)
    .then(() => {
      Timesheet.findByUserId(req.user.id)
        .then((timesheets) => {
          res.json(timesheets);
        })
        .catch(next);
    })
    .catch(next);
};
