export const projectsToOptions = (state) => {
  const options = [];
  state.report.projects.forEach((project) => {
    options.push({ key: project.id, value: project.id, text: `${project.id} ${project.name}` });
  });
  return options;
};
