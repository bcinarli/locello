import { ChangeEvent } from "react";
import { cls } from "@coding-challenge/utils";
import styles from "./text-field.module.scss";

type TextField = {
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  className?: string
}

export default function TextField({ value, placeholder, onChange, className = "" }: TextField) {
  const handleOnchange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return <label>
    <input type={"text"} value={value} className={cls([styles["text-field"], className])} placeholder={placeholder}
           onChange={handleOnchange} />
  </label>;
}
