export const projectsToOptions = (state) => {
  const options = [];
  state.report.projects.forEach((project) => {
    options.push({ key: project.projectId, value: project.projectId, text: `${project.projectId} ${project.name}` });
  });
  return options;
};

export const projectDetailToMemberOptions = (state) => {
  const options = [];
  if (state.report.projectDetail) {
    state.report.projectDetail.members.forEach((member) => {
      options.push({ key: member.userId, value: member.userId, text: `${member.userId} ${member.firstName} ${member.lastName}` });
    });
  }
  return options;
};
