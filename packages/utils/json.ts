export const tryParse = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    /* ignore error */
  }
};
