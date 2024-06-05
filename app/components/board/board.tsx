import { useEffect } from "react";
import { useBoardStore, useDB } from "../../store/context";
import Lists from "../lists/lists";
import AddList from "./add-list";
import styles from "./board.module.scss";

export default function Board() {
  const db = useDB();
  const { activeBoard, board, initializeBoard, updateBoard, addListToBoard } = useBoardStore();

  const updateBoardLists = (newListId: string) => {
    if (addListToBoard) {
      addListToBoard(newListId);
    }
  };

  useEffect(() => {
    if (initializeBoard) {
      initializeBoard();
    }
  }, []);

  useEffect(() => {
    if (activeBoard) {
      let boardData: Board = db.get<Board>(`board:${activeBoard}`);

      // first time using the
      if (boardData === null) {
        boardData = {
          id: activeBoard,
          lists: [],
          cards: []
        };
      }

      if (updateBoard) {
        updateBoard(boardData);
      }
    }
  }, [activeBoard]);

  return (
    <div className={styles["board"]}>
      <header className={styles["board-header"]}>
        <h1>Locello, Personal Local Board</h1>
      </header>
      <div className={styles["board-content"]}>
        {board && <Lists lists={board.lists} />}
        {board && <AddList onAddList={updateBoardLists} listSize={board.lists.length} />}
      </div>
    </div>
  );
}
