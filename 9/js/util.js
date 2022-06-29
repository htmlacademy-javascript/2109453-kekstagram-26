function getRandomPositiveInteger(a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const notRepeatedNumberList = [];

function getRandomNotRepeated() {
  const randomNumber = getRandomPositiveInteger(1, 9999);

  if (!notRepeatedNumberList.includes(randomNumber)) {
    notRepeatedNumberList.push(randomNumber);
    return randomNumber;
  }
  return getRandomNotRepeated();
}

export { getRandomPositiveInteger, getRandomNotRepeated };
