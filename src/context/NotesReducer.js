export const NotesReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_NOTE":
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };

    case "GET_NOTES":
      return {
        ...state,
        notes: action.payload,
      };

    default:
      return state;
  }
};
