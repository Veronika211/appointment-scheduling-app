export const convertToISOString = (date: string | Date) => {
  return new Date(date).toISOString();
};

export const getOnlyDate = (date: string | Date) => {
  if (typeof date !== 'string') return date.toString().slice(0, 10);
  return date.slice(0, 10);
};

export const createStringDate = (date?: string | Date) => {
  if (date) return new Date(date).toString();
  return new Date().toString();
};
