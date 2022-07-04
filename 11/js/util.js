const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomNotRepeated = () => {
  const notRepeatedNumberList = [];
  const randomNumber = getRandomPositiveInteger(1, 9999);

  if (!notRepeatedNumberList.includes(randomNumber)) {
    notRepeatedNumberList.push(randomNumber);
    return randomNumber;
  }
  return getRandomNotRepeated();
};

const checkStringLength = (string, length) => string.length <= length;

export { getRandomPositiveInteger, getRandomNotRepeated, checkStringLength };
