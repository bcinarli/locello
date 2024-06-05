import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import { Button, Cross, Edit, Textarea } from "@locello/ui";
import styles from "./card.module.scss";
import { useDB } from "../../store/context";

type Card = {
  cardID: string
  listID: string
}
export default function Card({ cardID, listID }: Card) {
  const db = useDB();
  const [edit, setEdit] = useState(false);
  const [card, setCard] = useState<SingleCard>();
  const [content, setContent] = useState("");

  const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;

    setContent(value);
  };

  const handleCancelUpdate = () => {
    setContent((card as SingleCard).content);
    setEdit(false);
  };
  const handleUpdate = () => {
    const updatedCard = { ...card, content } as SingleCard;

    db.set(`card:${cardID}`, updatedCard);
    setCard(updatedCard);
    setEdit(false);
  };

  const handleDrag = (cardID: string, prevListID: string) => (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("id", JSON.stringify({ cardID, prevListID }));
  };

  useEffect(() => {
    const card = db.get<SingleCard>(`card:${cardID}`);
    setCard(card);
    setContent(card.content);
  }, [cardID]);

  return (
    card ? (
      edit ?
        <form>
          <fieldset>
            <p><Textarea value={content} placeholder={"Update card description..."}
                         onChange={handleFieldChange} className={styles["card-edit-field"]} /></p>
            <Button onClick={handleUpdate}>Save Changes</Button>
            <Button onClick={handleCancelUpdate} variant={"text"}
                    className={styles["card-edit-cancel"]}><Cross /></Button>
          </fieldset>
        </form>
        :
        <div draggable={true} className={styles["card"]} onDragStart={handleDrag(cardID, listID)}>
          <p className={styles["card-content"]}>{card.content}</p>
          <Button variant={"text"} className={styles["card-edit"]} aria-labelledby={`${cardID}-edit`}
                  onClick={() => setEdit(true)}>
            <Edit />
            <span id={`${cardID}-edit`} hidden>Edit</span>
          </Button>
        </div>

    ) : null
  )
    ;
}
