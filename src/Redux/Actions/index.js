export const logUser = () => {
  return {
    type: "SIGN-IN",
  };
};

export const storeData = (data, name) => {
  return {
    type: "LOAD-DATA",
    payload: { [name]: data },
  };
};

export const inputText = (name, value) => {
  return {
    type: "INPUT-TEXT",
    payload: { [name]: value },
  };
};
