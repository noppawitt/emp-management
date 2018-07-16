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
  moment.months().forEach((month) => {
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
  { key: 'training', value: 'Training', text: 'Training' },
  { key: 'Meeting', value: 'Meeting', text: 'Meeting' }
];

export const leaveTypesOptions = [
  { key: 'Annual Leave', value: 'Annual Leave', text: 'Annual Leave' },
  { key: 'Personal Leave', value: 'Personal Leave', text: 'Personal Leave' },
  { key: 'Sick Leave', value: 'Sick Leave', text: 'Sick Leave' },
  { key: 'Ordination Leave', value: 'Ordination Leave', text: 'Ordination Leave' },
];

export const durationsOptions = [
  { key: 'Full day', value: 'Full day', text: 'Full day' },
  { key: 'Specific time', value: 'Specific time', text: 'Specific time' }
];

export const paymentTypeOptions = [
  { key: 'Turnkey', value: 'Turnkey', text: 'Turnkey' },
  { key: 'Man-month', value: 'Man-month', text: 'Man-month' },
  { key: 'Man-day', value: 'Man-day', text: 'Man-day' }
];

export const workingDayOptions = [
  { key: 22, value: 22, text: '22 days per month' },
  { key: 20, value: 20, text: '20 days per month' }
];

export const statusOptions = [
  { key: 'In Progress', value: 'In Progress', text: 'In Progress' },
  { key: 'Done', value: 'Done', text: 'Done' }
];

export const genderOptions = [
  { key: 'male', value: 'Male', text: 'Male' },
  { key: 'female', value: 'Female', text: 'Female' }
];

export const engineerOptions = [
  { key: 'engineer', value: true, text: 'Engineer' },
  { key: 'non-engineer', value: false, text: 'Non-Engineer' }
];

export const honorOption = [
  { key: '1', value: '1', text: 'เกียรตินิยมอันดับที่ 1' },
  { key: '2', value: '2', text: 'เกียรตินิยมอันดับที่ 2' },
  { key: '3', value: '-', text: '-' }
];