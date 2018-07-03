import moment from 'moment';

export const getYearOptions = () => {
  const yearOptions = [];
  const year = moment();
  for (let y = 0; y < 10; y += 1) {
    yearOptions.push({ key: year.year(), value: year.year(), text: year.format('YYYY') });
    year.add(-1, 'years');
  }
  return yearOptions;
};

export const getMonthOptions = () => {
  const monthOptions = [];
  moment.months().forEach((month, i) => {
    monthOptions.push({ key: month, value: i + 1, text: month });
  });
  return monthOptions;
};
