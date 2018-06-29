export const getVisibleViewResult = (state) => {
  if (!state.viewResult.results) return [];
  // ignore special characters
  const regExp = new RegExp(state.viewResult.searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');

  return state.viewResult.results
    .filter(viewResult => regExp.test(viewResult.category)
    || regExp.test(viewResult.subCategory)
    || regExp.test(viewResult.type)
    || regExp.test(viewResult.requireNumber)
    || regExp.test(viewResult.date)
    || regExp.test(viewResult.point))
    .sort((a, b) => {
      if (a > b) return -1;
      return 1;
    });
};
