const inputTextReducer = (state = {}, action) => {
  switch (action.type) {
    case "INPUT-TEXT":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default inputTextReducer;
