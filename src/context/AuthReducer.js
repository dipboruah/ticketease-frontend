export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "RESET":
      return {
        ...state,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
};
