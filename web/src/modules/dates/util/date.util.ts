export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US");
};

export const getTodayDate = () => {
  return new Date(new Date().setHours(0, 0, 0, 0));
};
