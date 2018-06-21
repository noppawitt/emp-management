import moment from 'moment';

export const fillTimesheetsToFullMonth = (state) => {
  if (!state.timesheet.lists) return [];
  const year = moment(state.timesheet.lists[0].date).format('YYYY');
  const month = moment(state.timesheet.lists[0].date).format('MM');
  const firstDay = moment(`${year}-${month}-01`);
  const lastDay = moment(`${year}-${month}-${firstDay.daysInMonth()}`);
  const n = 6 + (firstDay.isoWeekday() % 7) + firstDay.daysInMonth() - (lastDay.isoWeekday() % 7);
  const timesheets = [];
  // first date of last month
  const date = moment(firstDay).add(-(firstDay.isoWeekday() % 7), 'days');
  for (let i = 0; i < n; i += 1) {
    timesheets.push(date.format('YYYY-MM-DD'));
    date.add(1, 'days');
  }
  return timesheets;
};
