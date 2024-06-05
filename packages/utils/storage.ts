import { tryParse } from "./json";

export const localDB = (variant: "localStorage" | "sessionStorage" = "localStorage"
) => {
  const operator = window[variant];

  const get = (key: string) => {
    const item = operator.getItem(key);

    if (item === null) {
      return null;
    } else {
      return tryParse(item) ?? item;
    }
  };

  // eslint-disable-next-line
  const set = (key: string, value: any) => {
    if (typeof value === "string") {
      operator.setItem(key, value);
    } else {
      operator.setItem(key, JSON.stringify(value));
    }
  };

  const remove = (key: string) => operator.removeItem(key);

  return {
    get,
    set,
    remove
  };
};
