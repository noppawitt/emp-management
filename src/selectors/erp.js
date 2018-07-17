export const getVisibleErps = (erps, searchText) => {
  if (!erps) return [];
  const regExp = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return erps[1].fetchall
    .filter(e => regExp.test(e.statusapproveid)
      || regExp.test(e.name)
      || regExp.test(e.createdDate));
};
