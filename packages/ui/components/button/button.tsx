import { MouseEvent, ReactNode } from "react";
import { cls } from "@coding-challenge/utils";

import styles from "./button.module.scss";

type Button = {
  children: ReactNode
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  variant?: "primary" | "text"
  className?: string | string[]
}

export default function Button({ variant = "primary", children, onClick, className }: Button) {
  const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (onClick) {
      onClick(e);
    }
  };

  return <button
    onClick={handleOnClick}
    className={cls([styles["button"], variant === "text" && styles["text-button"], className])}
  >
    {children}
  </button>;
}
