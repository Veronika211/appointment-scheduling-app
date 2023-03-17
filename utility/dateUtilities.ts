export const convertToISOString = (date: Date) => {
  return new Date(date).toISOString();
};

export const getOnlyDate = (date: string) => {
  return date.slice(0, 10);
};

export const createStringDate = (date?: string) => {
  if (date) return new Date(date).toString();
  return new Date().toString();
};
