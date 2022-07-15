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

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, 3000);
};

export {
  getRandomPositiveInteger,
  getRandomNotRepeated,
  checkStringLength,
  showAlert,
};
