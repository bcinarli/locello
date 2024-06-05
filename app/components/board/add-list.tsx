import { ChangeEvent, useState } from "react";
import { Button, Cross, Plus, TextField } from "@locello/ui";
import { useDB } from "../../store/context";

import styles from "./add-list.module.scss";
import { uuid } from "@locello/utils";

type AddList = {
  onAddList: (id: string) => void
  listSize: number
}

export default function AddList({ onAddList, listSize }: AddList) {
  const db = useDB();
  const [toggleForm, setToggleForm] = useState(false);
  const [value, setValue] = useState("");

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setValue(value);
  };
  const handleAddList = () => {
    const listID = uuid();

    const list: SingleList = {
      id: listID,
      label: value,
      cards: []
    };

    db.set(`list:${listID}`, list);

    onAddList(listID);

    setValue("");
    setToggleForm(false);
  };
  return (toggleForm ? (
      <form className={styles["add-list"]}>
        <fieldset>
          <p className={styles["list-name"]}>
            <TextField value={value} placeholder={"Enter list title..."}
                       className={styles["list-name-field"]}
                       onChange={handleFieldChange} />
          </p>
          <Button onClick={handleAddList}>Add List</Button>
          <Button onClick={() => setToggleForm(false)} variant={"text"}
                  className={styles["add-list-cancel"]}><Cross /></Button>
        </fieldset>
      </form>
    ) :
    <Button onClick={() => setToggleForm(true)}
            variant={"text"}><Plus /> Add {listSize === 0 ? "a" : "another"} list</Button>);
}
