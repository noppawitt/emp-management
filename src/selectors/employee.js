export const getFilteredEmployee = (state) => {
  if (!state.employee.lists) return [];
  const regExp = new RegExp(state.employee.filter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return state.employee.lists.filter(employee =>
    regExp.test(`${employee.firstName} ${employee.lastName}`)
  || regExp.test(employee.nickName)
  || regExp.test(employee.email)
  || regExp.test(`${employee.firstNameTh} ${employee.lastNameTh}`))
    .filter((employee) => {
      if (state.employee.departmentId) return state.employee.departmentId === employee.departmentId;
      return employee;
    });
};

export const employeesToOptions = (state) => {
  if (!state.employee.lists) return [];
  const options = [];
  state.employee.lists.forEach((employee) => {
    options.push({ key: employee.id, value: employee.id, text: `${employee.id} ${employee.firstName} ${employee.lastName}` });
  });
  return options;
};
