import { ChangeEvent, useState } from "react";
import { Button, Cross, Plus, Textarea } from "@locello/ui";
import styles from "./add-card.module.scss";
import { useBoardStore, useDB } from "../../store/context";
import { uuid } from "@locello/utils";

type AddCard = {
  list: string,
  onAddCard: (id: string) => void
}

export default function AddCard({ onAddCard }: AddCard) {
  const db = useDB();
  const { addCardToBoard } = useBoardStore();
  const [toggleForm, setToggleForm] = useState(false);
  const [value, setValue] = useState("");

  const handleFieldChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;

    setValue(value);
  };

  const handleAddCard = () => {
    const cardID = uuid();

    const cardData: SingleCard = {
      id: cardID,
      content: value
    };

    db.set(`card:${cardID}`, cardData);

    if (addCardToBoard) {
      addCardToBoard(cardID);
    }

    onAddCard(cardID);

    setToggleForm(false);
    setValue("");
  };

  return (toggleForm ? (
      <form className={styles["add-card"]}>
        <fieldset>
          <p className={styles["card-name"]}>
            <Textarea value={value} placeholder={"Enter card description..."}
                      className={styles["card-name-field"]}
                      onChange={handleFieldChange} />
          </p>
          <Button onClick={handleAddCard}>Add Card</Button>
          <Button onClick={() => setToggleForm(false)} variant={"text"}
                  className={styles["add-card-cancel"]}><Cross /></Button>
        </fieldset>
      </form>
    ) :
    <Button onClick={() => setToggleForm(true)} variant={"text"} className={styles["add-card-button"]}><Plus /> Add a
      Card</Button>);
}
