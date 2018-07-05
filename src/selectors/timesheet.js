import moment from 'moment';

export const fillTimesheetsToFullMonth = (state) => {
  const { year, month } = state.timesheet;
  const firstDay = moment(`${year}-${month}-01`);
  const lastDay = moment(`${year}-${month}-${firstDay.daysInMonth()}`);
  const n = 6 + (firstDay.isoWeekday() % 7) + firstDay.daysInMonth() - (lastDay.isoWeekday() % 7);
  const timesheets = [];
  // first date of last month
  const date = moment(firstDay).add(-(firstDay.isoWeekday() % 7), 'days');
  for (let i = 0; i < n; i += 1) {
    timesheets.push({ date: date.format('YYYY-MM-DD'), totalhours: 0 });
    date.add(1, 'days');
  }
  for (let i = 0; i < state.timesheet.lists.length; i += 1) {
    const index = timesheets.findIndex(t => t.date === state.timesheet.lists[i].date);
    timesheets[index] = state.timesheet.lists[i];
  }
  return timesheets;
};

export const getTimesheetById = (state, id) => state.timesheet.lists.find(t => t.id === id);

export const getFormInitialValues = (state) => {
  const { year, month, startDay, endDay, lists } = state.timesheet;
  let timesheets = [];
  for (let day = startDay; day <= endDay; day += 1) {
    const date = moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');
    const tasks = lists.filter(l => l.date === date);
    if (tasks.length > 0) timesheets = timesheets.concat(tasks);
    else {
      timesheets.push({
        date,
        timeIn: '09:00:00',
        timeOut: '18:00:00',
      });
    }
  }
  return timesheets;
};
