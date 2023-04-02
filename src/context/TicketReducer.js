export const TicketReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_TICKET":
      return {
        ...state,
        ticket: action.payload,
      };
    case "UPDATE_TICKET":
      return {
        ...state,
        ticket: action.payload,
      };
    case "DELELTE_TICKET":
      return {
        ...state,
        ticket: null,
      };
    case "GET_TICKET":
      return {
        ...state,
        ticket: action.payload,
      };
    case "GET_TICKETS":
      return {
        ...state,
        tickets: action.payload,
      };

    case "CLOSE_TICKET":
      return {
        ...state,
        ticket: action.payload,
      };
    default:
      return state;
  }
};
