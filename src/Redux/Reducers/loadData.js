const storeData = (state = {}, action) => {
  switch (action.type) {
    case "LOAD-DATA":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default storeData;
