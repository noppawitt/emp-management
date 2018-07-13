export const projectsToOptions = (state) => {
  const options = [];
  state.report.projects.forEach((project) => {
    options.push({ key: project.projectId, value: project.projectId, text: `${project.projectId} ${project.name}` });
  });
  return options;
};
