export const getFilteredEmployee = (employees, text = '', department) => {
  if (!employees) return [];
  const regExp = new RegExp(text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return employees.filter(employee => regExp.test(`${employee.firstName} ${employee.lastName}`)
  || regExp.test(employee.nickName)
  || regExp.test(employee.email)
  || regExp.test(`${employee.firstNameTh} ${employee.lastNameTh}`));
};

export const employeesToOptions = (state) => {
  if (!state.employee.lists) return [];
  const options = [];
  state.employee.lists.forEach((employee) => {
    options.push({ key: employee.id, value: employee.id, text: `${employee.id} ${employee.firstName} ${employee.lastName}` });
  });
  return options;
};
