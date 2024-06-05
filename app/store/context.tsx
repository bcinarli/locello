import { createContext, ReactNode, useContext, useMemo, useReducer } from "react";
import { INITIAL_BOARD, INITIAL_CONTEXT } from "./defaults";
import { BoardReducers } from "./reducer";
import { createActions } from "./actions";
import { localDB } from "@locello/utils";

type BoardStoreProps = {
  db?: BoardDB
  children: ReactNode
}

const BoardContext = createContext(INITIAL_CONTEXT);

export const BoardStore = ({ db = "localStorage", children }: BoardStoreProps) => {
  const INIT = { ...INITIAL_BOARD, config: { db: localDB(db) }, actions: {} };

  const [state, dispatch] = useReducer(BoardReducers, INIT);

  const actions = createActions(dispatch);

  const initialBoard = { ...state, actions };

  const boardContext = useMemo(() => ({ ...initialBoard, ...state, actions }), [state]);

  return <BoardContext.Provider value={boardContext}>{children}</BoardContext.Provider>;
};

export const useBoardStore = (): Partial<BoardActions> & BoardState => {
  const { actions, ...state } = useContext(BoardContext);

  return {
    ...actions,
    ...state
  };
};

export const useDB = () => {
  const { config: { db } } = useBoardStore();

  return db;
};
