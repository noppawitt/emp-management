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
<<<<<<< HEAD
  moment.months().forEach((month, i) => {
=======
  moment.months().forEach((month) => {
>>>>>>> 289a5db6543758b2fce72a32ddb4386cbfcaa762
    monthOptions.push({ key: moment(month, 'MMMM').format('MM'), value: moment(month, 'MMMM').format('MM'), text: month });
  });
  return monthOptions;
};

export const getRangeOptions = (start, end) => {
  const rangeOptions = [];
  for (let i = start; i <= end; i += 1) {
    rangeOptions.push({ key: i, value: i, text: i });
  }
  return rangeOptions;
};

export const taskOptions = [
  { key: 'development', value: 'Development', text: 'Development' },
  { key: 'testing', value: 'Testing', text: 'Testing' },
  { key: 'training', value: 'Traning', text: 'Traning' },
  { key: 'Meeting', value: 'Meeting', text: 'Meeting' }
];
