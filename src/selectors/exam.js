export const getVisibleExams = (state) => {
  if (!state.exam.lists) return [];

  return state.exam.lists.filter(exam => (state.exam.searchText === undefined || state.exam.searchText === '' || exam.exQuestion.includes(state.exam.searchText))
  && (state.exam.searchCategory === undefined || state.exam.searchCategory === 'all subjects' || state.exam.searchCategory === exam.exSubcategory));
};
