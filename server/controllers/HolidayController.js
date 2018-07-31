const Holiday = require('../models/Holiday');

exports.create = (req, res, next) => {
  const newHoliday = req.body.holiday;
  Holiday.create(newHoliday, req.user.id)
    .then(() => {
      Holiday.findByYear(req.body.year)
        .then((holidays) => {
          res.json(holidays);
        })
        .catch(next);
    })
    .catch(next);
};

exports.update = (req, res, next) => {
  const editHoliday = req.body.holiday;
  Holiday.update(editHoliday, req.user.id)
    .then((updatedHoliday) => {
      req.json(updatedHoliday);
    })
    .catch(next);
};

exports.findHolidays = (req, res, next) => {
  if (req.query.month && req.query.year) {
    Holiday.findByYearAndMonth(req.query.year, req.query.month)
      .then((holidays) => {
        res.json(holidays);
      })
      .catch(next);
  }
  else if (req.query.year) {
    Holiday.findByYear(req.query.year)
      .then((holidays) => {
        res.json(holidays);
      })
      .catch(next);
  }
};

exports.delete = (req, res, next) => {
  Holiday.delete(req.body.id)
    .then(() => {
      Holiday.findByYear(req.body.year)
        .then((holidays) => {
          res.json(holidays);
        })
        .catch(next);
    })
    .catch(next);
};
