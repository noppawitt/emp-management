export const masterTableToOptions = (masterTable = []) => {
  const options = [];
  masterTable.forEach((elem) => {
    const option = {};
    option.key = elem.id;
    option.text = elem.name;
    option.value = elem.id.toString();
    options.push(option);
  });
  return options;
};

export const handleReduxFormSubmit = (dispatch, action, values, ...args) => (
  new Promise((resolve, reject) => (
    dispatch(action(...args, values, resolve, reject))
  ))
);
