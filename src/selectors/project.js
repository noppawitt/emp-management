const getFilteredProjects = (lists, searchText) => {
  const regExp = new RegExp(searchText.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return lists
    .filter(project => regExp.test(project.id)
    || regExp.test(project.name)
    || regExp.test(project.customer)
    || regExp.test(project.quotationId));
};

const getSortedProjects = (lists, direction, sortKey) => (
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

const getSlicedProjects = (lists, currentPage) => lists.slice((currentPage - 1) * 10, currentPage * 10);

export const getVisibleProjects = (state) => {
  let visibleProjects = [...state.project.lists];
  visibleProjects = getFilteredProjects(visibleProjects, state.project.searchText);
  visibleProjects = getSortedProjects(visibleProjects, state.project.direction, state.project.sortKey);
  visibleProjects = getSlicedProjects(visibleProjects, state.project.currentPage);
  return visibleProjects;
};

export const getTotalPages = state => Math.ceil(getFilteredProjects(state.project.lists, state.project.searchText).length / 10);

export const projectsToOptions = (state) => {
  if (!state.project.lists) return [];
  const options = [];
  state.project.lists.forEach((project) => {
    options.push({ key: project.id, value: project.id, text: `${project.id} ${project.name}` });
  });
  return options;
};
