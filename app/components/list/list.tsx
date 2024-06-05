import { useEffect, useState } from "react";
import { useBoardStore, useDB } from "../../store/context";
import Cards from "../cards/cards";
import AddCard from "./add-card";
import styles from "./list.module.scss";

type ListProps = {
  listID: string
}

export default function List({ listID }: ListProps) {
  const db = useDB();
  const { changedList, updateList } = useBoardStore();
  const [list, setList] = useState<SingleList>();

  const updateCurrentList = (newCardId: string) => {
    const currentListInfo = list as SingleList;

    const updatedList = { ...currentListInfo, cards: [...currentListInfo.cards, newCardId] };

    db.set(`list:${listID}`, updatedList);

    setList(updatedList);
  };

  const removeFromList = (cardIDToRemove: string, targetList: string) => {
    const list = db.get<SingleList>(`list:${targetList}`);

    const updatedList = { ...list, cards: list.cards.filter(card => card !== cardIDToRemove) };

    db.set(`list:${targetList}`, updatedList);
  };

  const onCardDrag = (dragData: { cardID: string, prevListID: string }) => {
    if (dragData.prevListID !== listID) {
      updateCurrentList(dragData.cardID);
      removeFromList(dragData.cardID, dragData.prevListID);
      if (updateList) {
        updateList(dragData.prevListID);
      }
    }
  };

  useEffect(() => {
    if (changedList === listID) {
      const listData = db.get<SingleList>(`list:${changedList}`);
      setList(listData);
      if (updateList) {
        updateList("");
      }
    }
  }, [changedList]);

  useEffect(() => {
    const listData = db.get<SingleList>(`list:${listID}`);

    setList(listData);
  }, [listID]);

  return (
    <div className={styles["list"]}>
      {
        list && <>
          <h2 className={styles["list-title"]}>{list.label}</h2>
          <Cards cards={list.cards} listID={list.id} onCardDrag={onCardDrag} />
        </>
      }
      <AddCard list={listID} onAddCard={updateCurrentList} />
    </div>
  );
}
