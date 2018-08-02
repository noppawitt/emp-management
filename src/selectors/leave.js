export const getTotalPages = state => Math.ceil(state.leave.lists.length / 10);

const getSliceLeaves = (lists, currentPage) => lists.slice((currentPage - 1) * 10, currentPage * 10);

const getSortedLeaves = (lists, direction, sortKey) => (
  lists.sort((a, b) => {
    const directionValue = direction === 'ascending' ? 1 : -1;
    if (a[sortKey] < b[sortKey]) {
      return directionValue * -1;
    }
    else if (a[sortKey] > b[sortKey]) {
      return directionValue;
    }
    return 0;
  })
);

export const getVisibleLeaves = (state) => {
  let visibleLeaves = [...state.leave.lists];
  visibleLeaves = getSortedLeaves(visibleLeaves, state.leave.direction, state.leave.sortKey);
  visibleLeaves = getSliceLeaves(visibleLeaves, state.leave.currentPage);
  return visibleLeaves;
};
