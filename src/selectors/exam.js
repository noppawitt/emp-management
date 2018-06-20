export const getVisibleExams = (state) => {
  if (!state.exam.lists) return [];

  return state.exam.lists.filter(exam => (state.exam.searchText === '' || state.exam.searchText === exam.exQuestion)
  && (state.exam.searchType === 'all subjects' || state.exam.searchType === exam.exType));
};