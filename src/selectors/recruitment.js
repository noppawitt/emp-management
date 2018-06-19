export const getVisibleRecruitment = (state) => {
  if (!state.recruitment.lists) return [];
  return state.recruitment.lists;
};
// {
//   if (!state.recruitment.lists) return [];
//   ignore special characters
//   const regExp = new RegExp(state.project.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');

//   fix filter logic
//   if
//   console.log('you return THIS >>', state.recruitment.lists);
//   return state.recruitment.lists;
//   return state.recruitment.lists
//     .filter(() => regExp)
//     .sort((a, b) => {
//       // always make a ascending sort
//       // fix sort logic or some call library
//       // if (a[state.recruitment.sortKey] < b[state.recruitment.sortKey]) {
//       if (Date.parse(a) < Date.parse(b)) {
//         return -1;
//       }
//       // else if (a[state.recruitment.sortKey] > b[state.recruitment.sortKey]) {
//       if (Date.parse(a) > Date.parse(b)) {
//         return 1;
//       }
//       return 0;
//     });
// };
