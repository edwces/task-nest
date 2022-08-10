export const toNumberArray = (array: string[]) =>
  array.map((item) => {
    if (Number.isNaN(item)) throw new Error("Item is not an integer");
    return Number.parseInt(item);
  });

export const toStringArray = (array: number[]) =>
  array.map((item) => {
    return item.toString();
  });

export const filterNans = (array: string[]) =>
  array.filter((item) => !Number.isNaN(Number.parseInt(item)));
