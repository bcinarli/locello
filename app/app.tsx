import Board from "./components/board/board";
import { BoardStore } from "./store/context";

export default function App() {
  return (
    <BoardStore>
      <Board />
    </BoardStore>
  );
}
