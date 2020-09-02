export const playListReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_ORDER':
      return action.newOrder
    default:
      return state;
  }
};


