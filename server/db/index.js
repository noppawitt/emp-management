const humps = require('humps');

const camelizeColumns = (data) => {
  const names = Object.keys(data[0]);
  const camels = names.map(n => humps.camelize(n));
  data.forEach((d) => {
    names.forEach((n, i) => {
      const c = camels[i];
      if (!(c in d)) {
        d[c] = d[n];
        delete d[n];
      }
    });
  });
};

const options = {
  receive(data) {
    if (data.length !== 0) {
      camelizeColumns(data);
    }
  }
};

const pgp = require('pg-promise')(options);

pgp.pg.types.setTypeParser(1082, value => value);

const db = pgp(process.env.DATABASE_URL);

module.exports = db;
