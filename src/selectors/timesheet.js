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
    const tasks = state.timesheet.lists.filter(l => l.date === date.format('YYYY-MM-DD'));
    if (tasks.length > 0) {
      timesheets.push(tasks);
    }
    else {
      timesheets.push([{ date: date.format('YYYY-MM-DD'), totalhours: 0 }]);
    }
    date.add(1, 'days');
  }
  return timesheets;
};

export const getTimesheetById = (state, id) => state.timesheet.lists.find(t => t.id === id);

export const getFormInitialValues = (state) => {
  const { year, month, startDay, endDay, lists } = state.timesheet;
  const timesheets = [];
  for (let day = startDay; day <= endDay; day += 1) {
    const date = moment(`${year}-${month}-${day}`).format('YYYY-MM-DD');
    const tasks = lists.filter(l => l.date === date);
    const remark = [];
    if (tasks.length > 0) {
      tasks.forEach((task, i) => {
        if (i === 0 && tasks.length === 1) { remark.push(`*you heve ${task.projectId} ${task.timeIn}-${task.timeOut} on this day`); }
        else if (i === 0 && tasks.length !== 1) { remark.push(`*you heve ${task.projectId} ${task.timeIn}-${task.timeOut}`); }
        else if (i === tasks.length - 1) { remark.push(`*${task.projectId} ${task.timeIn}-${task.timeOut} on this day`); }
        else {
          remark.push(`*${task.projectId} ${task.timeIn}-${task.timeOut}`);
        }
      });
      timesheets.push({
        userId: state.auth.id,
        date,
        timeIn: '09:00:00',
        timeOut: '18:00:00',
        projectId: state.timesheet.projectId,
        task: state.timesheet.task,
        description: '',
        remark
      });
    }
    else {
      timesheets.push({
        userId: state.auth.id,
        date,
        timeIn: '09:00:00',
        timeOut: '18:00:00',
        projectId: state.timesheet.projectId,
        task: state.timesheet.task,
        description: '',
        remark
      });
    }
  }
  timesheets.forEach((timesheet) => {
    timesheet.userId = state.auth.id;
  });
  return timesheets;
};

export const timesheetProjectsToOptions = (state) => {
  if (!state.timesheet.projects) return [];
  const options = [];
  state.timesheet.projects.forEach((project) => {
    options.push({ key: project.projectId, value: project.projectId, text: `${project.projectId} ${project.name}` });
  });
  return options;
};
