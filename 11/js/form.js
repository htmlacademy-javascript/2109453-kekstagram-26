import {
  formElement,
  validateForm,
  hashtagInputElement,
  textDescriptionElement,
} from './pristine-utils.js';

const uploadButtonElement = document.querySelector('#upload-file');
const closeButtonElement = document.querySelector('#upload-cancel');
const overlay = document.querySelector('.img-upload__overlay');
const scaleControlWrapper = document.querySelector('.scale');
const scaleValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');

const number = { value: 100, percent: '%' };

const scaleControlHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--bigger')) {
    if (number.value < 100) {
      number.value += 25;
    }
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    if (number.value > 25) {
      number.value -= 25;
    }
  }
  scaleValueElement.value = number.value + number.percent;
  previewImageElement.style.transform = `scale(${number.value / 100})`;
};

const closeForm = (evt) => {
  if (
    hashtagInputElement === document.activeElement ||
    textDescriptionElement === document.activeElement
  ) {
    evt.stopPropagation();
  } else if (evt.key === 'Escape' || evt.target === closeButtonElement) {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadButtonElement.value = '';
    number.value = 100;
    previewImageElement.style.transform = `scale(${number.value / 100})`;
  }
  closeButtonElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeForm);
  formElement.removeEventListener('submit', validateForm);
  scaleControlWrapper.removeEventListener('click', scaleControlHandler);
};

const showForm = () => {
  scaleValueElement.value = number.value + number.percent;
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeForm);
  formElement.addEventListener('submit', validateForm);
  scaleControlWrapper.addEventListener('click', scaleControlHandler);
};

uploadButtonElement.addEventListener('change', showForm);

export { previewImageElement, hashtagInputElement, textDescriptionElement };
