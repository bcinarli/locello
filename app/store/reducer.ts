import { uuid } from "@locello/utils";

export const BoardReducers = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case "INITIALIZE_BOARD": {
      const board = state.config.db.get("activeBoard");
      let boardID: string;

      if (!board) {
        boardID = uuid();
        state.config.db.set("activeBoard", boardID);
      } else {
        boardID = board as string;
      }

      return { ...state, activeBoard: boardID };
    }
    case "UPDATE_BOARD": {
      state.config.db.set(`board:${state.activeBoard}`, action.payload);

      return { ...state, board: action.payload };
    }
    case "ADD_LIST_TO_BOARD": {
      const board = state.board as Board;

      const updatedBoard = { ...board, lists: [...board.lists, action.payload] };

      state.config.db.set(`board:${state.activeBoard}`, updatedBoard);

      return { ...state, board: updatedBoard };
    }
    case "ADD_CARD_TO_BOARD": {
      const board = state.board as Board;

      const updatedBoard = { ...board, cards: [...board.cards, action.payload] };

      state.config.db.set(`board:${state.activeBoard}`, updatedBoard);

      return { ...state, board: updatedBoard };
    }
    case "UPDATE_LIST": {
      return { ...state, changedList: action.payload };
    }
    default:
      return { ...state };
  }
};
