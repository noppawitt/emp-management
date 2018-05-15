export const getEducationProfile = (state, id) => (
  state.profile.educations.find(e => e.id === id)
);
