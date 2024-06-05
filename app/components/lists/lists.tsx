import List from "../list/list";
import styles from "./lists.module.scss";

type Lists = {
  lists: string[]
}
export default function Lists({ lists }: Lists) {
  return (
    <div className={styles["lists"]}>
      {
        lists.map(list => <List key={list} listID={list} />)
      }
    </div>
  );
}
