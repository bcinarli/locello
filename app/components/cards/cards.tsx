import { DragEvent, useState } from "react";
import { cls } from "@locello/utils";
import Card from "../card/card";
import styles from "./cards.module.scss";

type Cards = {
  cards: string[]
  listID: string
  onCardDrag: ({ cardID, prevListID }: { cardID: string, prevListID: string }) => void
}

export default function Cards({ cards, listID, onCardDrag }: Cards) {
  const [dragOver, setDragOver] = useState(false);

  const handleOnDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleOnDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };
  const handleOnDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData("id"));
    onCardDrag(dragData);
    setDragOver(false);
  };

  return (
    <div className={cls([styles["cards"], dragOver && styles["cards-drag-active"]])} onDrop={handleOnDrop}
         onDragOver={handleOnDragOver} onDragLeave={handleOnDragLeave} onDragEnd={handleOnDragLeave}>
      {cards.map(card => <Card key={card} cardID={card} listID={listID} />)}
    </div>
  );
}
