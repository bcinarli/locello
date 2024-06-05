import { localDB } from "@locello/utils";

export const INITIAL_BOARD: BoardState = {
  config: {
    db: localDB("localStorage")
  },
  changedList: ""
};

export const INITIAL_CONTEXT = {
  ...INITIAL_BOARD,
  actions: {}
};
