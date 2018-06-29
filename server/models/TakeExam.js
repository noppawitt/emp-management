const db = require('../db');

const TakeExam = {};

TakeExam.fetchSomething = () => (
  db.none('SELECT NOTHING FROM NOTHING')
);
