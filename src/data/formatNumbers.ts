export const formatNumbers = (digit: number) => {
  return new Intl.NumberFormat("en-US").format(digit);
};
