type BoardDB = "localStorage" | "sessionStorage"

type BoardState = {
  config: {
    db: {
      get<T>(key: string): T
      set(key: string, value: string | { [key: string]: unknown }): void
      remove(key: string): void
    }
  }
  activeBoard?: string
  board?: Board
  changedList: string
}

type Board = {
  id: string,
  lists: string[],
  cards: string[]
}

type SingleList = {
  id: string
  label: string,
  cards: string[]
}

type SingleCard = {
  id: string
  content: string
}

type BoardActions = {
  initializeBoard(): void
  updateBoard(board: Board): void
  addListToBoard(listID: string): void
  addCardToBoard(cardID: string): void
  updateList(listID: string): void
}

type ActionTypes = "INITIALIZE_BOARD" | "UPDATE_BOARD" | "ADD_LIST_TO_BOARD" | "ADD_CARD_TO_BOARD" | "UPDATE_LIST"

type BoardActionInitializeBoard = {
  type: Extract<ActionTypes, "INITIALIZE_BOARD">
}

type BoardActionUpdateBoard = {
  type: Extract<ActionTypes, "UPDATE_BOARD">
  payload: BoardStateData
}

type BoardActionAddListToBoard = {
  type: Extract<ActionTypes, "ADD_LIST_TO_BOARD">
  payload: string
}

type BoardActionAddCardToBoard = {
  type: Extract<ActionTypes, "ADD_CARD_TO_BOARD">
  payload: string
}

type BoardActionUpdateList = {
  type: Extract<ActionTypes, "UPDATE_LIST">
  payload: string
}

type BoardAction =
  BoardActionInitializeBoard
  | BoardActionUpdateBoard
  | BoardActionAddListToBoard
  | BoardActionAddCardToBoard
  | BoardActionUpdateList
