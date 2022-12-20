export const getReqPrecision = (num) => {
  if (num >= 0.1) return 3;
  let count = 0;
  while (num < 1) {
    num *= 10;
    count++;
  }
  return count+3;
}