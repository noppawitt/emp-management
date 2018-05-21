export const getFilteredEmployee = (employees, text = '') => {
  if (!employees) return [];
  const regExp = new RegExp(text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return employees.filter(employee => regExp.test(employee.firstName)
  || regExp.test(employee.lastName)
  || regExp.test(employee.nickName)
  || regExp.test(employee.email));
};
