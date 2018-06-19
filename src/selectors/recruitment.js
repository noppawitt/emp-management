const dateCheck = (a, b) => {
  if (Date.parse(a) < Date.parse(b)) { return -1; }
  else if (Date.parse(a) > Date.parse(b)) { return 1; }
  return 0;
};

export const getVisibleRecruitment = (state) => {
  if (!state.recruitment.lists) return [];
  // ignore special characters
  const regExp = new RegExp(state.recruitment.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');

  return state.recruitment.lists
    .filter(recruitment => regExp.test(recruitment.citizenId)
      || regExp.test(recruitment.firstName)
      || regExp.test(recruitment.lastName)
      || regExp.test(recruitment.firstNameTh)
      || regExp.test(recruitment.lastNameTh)
      || regExp.test(recruitment.position)
      || regExp.test(recruitment.appointment)
      || regExp.test(recruitment.status))
    .sort((a, b) => {
      const direction = state.recruitment.direction === 'ascending' ? 1 : -1;
      // sort by 'sortKey' first, then sort by Date
      if (state.recruitment.sortKey === 'name') {
        // name has 4 sub-components, that is 'firstName', 'lastName', 'firstNameTh', 'lastNameTh'
        if (a.firstName < b.firstName) { return direction * -1; }
        else if (a.firstName > b.firstName) { return direction; }
        // if firstName equal go ahead to compare on 'lastName'
        else if (a.lastName < b.lastName) { return direction * -1; }
        else if (a.lastName > b.lastName) { return direction; }
        // if firstName equal go ahead to compare on 'firstNameTh'
        else if (a.firstNameTh < b.firstNameTh) { return direction * -1; }
        else if (a.firstNameTh > b.firstNameTh) { return direction; }
        // if firstName equal go ahead to compare on 'lastNameTh'
        else if (a.lastNameTh < b.lastNameTh) { return direction * -1; }
        else if (a.lastNameTh > b.lastNameTh) { return direction; }
        return dateCheck(a.appointment, b.appointment);
      }
      else if (a[state.recruitment.sortKey] < b[state.recruitment.sortKey]) { return direction * -1; }
      else if (a[state.recruitment.sortKey] > b[state.recruitment.sortKey]) { return direction; }
      return dateCheck(a.appointment, b.appointment);
    });
};
