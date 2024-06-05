export const createActions = (dispatch: (action: BoardAction) => unknown): BoardActions => ({
  initializeBoard() {
    dispatch({
      type: "INITIALIZE_BOARD"
    });
  },
  updateBoard(board) {
    dispatch({
      type: "UPDATE_BOARD",
      payload: board
    });
  },
  addListToBoard(listID: string) {
    dispatch({
      type: "ADD_LIST_TO_BOARD",
      payload: listID
    });
  },
  addCardToBoard(cardID: string) {
    dispatch({
      type: "ADD_CARD_TO_BOARD",
      payload: cardID
    });
  },
  updateList(listID: string) {
    dispatch({
      type: "UPDATE_LIST",
      payload: listID
    });
  }
});
