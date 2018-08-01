export const getTotalPages = state => Math.ceil(state.leave.lists.length / 10);

const getSliceLeaves = (lists, currentPage) => lists.slice((currentPage - 1) * 10, currentPage * 10);

export const getVisibleLeaves = (state) => {
  let visibleLeaves = [...state.leave.lists];
  visibleLeaves = getSliceLeaves(visibleLeaves, state.leave.currentPage);
  return visibleLeaves;
};
