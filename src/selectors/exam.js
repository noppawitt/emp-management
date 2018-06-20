export const getVisibleExams = (state) => {
  if (!state.exam.lists) return [];

  return state.exam.lists.filter(exam => (state.exam.searchText === undefined || state.exam.searchText === '' || exam.exQuestion.includes(state.exam.searchText))
  && (state.exam.searchType === undefined || state.exam.searchType === 'all subjects' || state.exam.searchType === exam.exType));
};
