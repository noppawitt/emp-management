import moment from 'moment';

export const getYearOptions = () => {
  const yearOptions = [];
  const year = moment();
  for (let y = 0; y < 10; y += 1) {
    yearOptions.push({ key: year.format('YYYY'), value: year.format('YYYY'), text: year.format('YYYY') });
    year.add(-1, 'years');
  }
  return yearOptions;
};

export const getMonthOptions = () => {
  const monthOptions = [];
  moment.months().forEach((month, i) => {
    monthOptions.push({ key: moment(month,'MMMM').format('MM'), value: moment(month,'MMMM').format('MM'), text: month });
  });
  return monthOptions;
};
