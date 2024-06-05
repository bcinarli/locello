import { ChangeEvent } from "react";
import { cls } from "@coding-challenge/utils";
import styles from "./textarea.module.scss";

type TextArea = {
  value: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
}

export default function Textarea({ value, className, placeholder, onChange }: TextArea) {
  const handleOnchange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return <textarea value={value} className={cls([styles["textarea"], className])} placeholder={placeholder}
                   onChange={handleOnchange} />;
}
