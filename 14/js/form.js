import {
  pristine,
  formElement,
  hashtagInputElement,
  textDescriptionElement,
} from './pristine-utils.js';
import { sendData } from './api.js';
import { sliderElementWrapper } from './change-effect.js';
import { toggleDisabled } from './util.js';

const uploadButtonElement = document.querySelector('#upload-file');
const closeButtonElement = document.querySelector('#upload-cancel');
const overlay = document.querySelector('.img-upload__overlay');
const scaleControlWrapper = document.querySelector('.scale');
const scaleValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');
const successMessageTemplate = document.querySelector('#success').content;
const successMessageElement = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const submitButton = document.querySelector('.img-upload__submit');

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

document.body.appendChild(successMessageElement);
document.body.appendChild(errorMessageElement);

document.querySelector('.error').style.display = 'none';
document.querySelector('.success').style.display = 'none';

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
  } else {
    if (evt.key === 'Escape') {
      overlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      closeButtonElement.removeEventListener('click', closeForm);
      document.removeEventListener('keydown', closeForm);
      scaleControlWrapper.removeEventListener('click', scaleControlHandler);
    } else if (evt.target === closeButtonElement) {
      overlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      uploadButtonElement.value = '';
      number.value = 100;
      scaleValueElement.value = number.value + number.percent;
      previewImageElement.style.transform = `scale(${number.value / 100})`;
      sliderElementWrapper.style.display = 'none';
      closeButtonElement.removeEventListener('click', closeForm);
      document.removeEventListener('keydown', closeForm);
      scaleControlWrapper.removeEventListener('click', scaleControlHandler);
    }
  }
};

const closeFormSubmit = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButtonElement.value = '';
  number.value = 100;
  scaleValueElement.value = number.value + number.percent;
  previewImageElement.style.transform = `scale(${number.value / 100})`;
  previewImageElement.style.filter = '';
  sliderElementWrapper.style.display = 'none';
  document.querySelector('.img-upload__control').style.display = 'none';
  closeButtonElement.removeEventListener('click', closeForm);
  document.removeEventListener('keydown', closeForm);
  scaleControlWrapper.removeEventListener('click', scaleControlHandler);
};

const showForm = () => {
  const file = uploadButtonElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImageElement.src = URL.createObjectURL(file);
  }

  scaleValueElement.value = number.value + number.percent;
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButtonElement.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeForm);
  scaleControlWrapper.addEventListener('click', scaleControlHandler);
};

const closeSuccessModal = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('.success').style.display = 'none';
  } else if (evt.target === document.querySelector('.success')) {
    document.querySelector('.success').style.display = 'none';
  }
};

const closeErrorModal = (evt) => {
  document.addEventListener('keydown', closeForm);
  if (evt.key === 'Escape') {
    document.querySelector('.error').style.display = 'none';
  } else if (evt.target === document.querySelector('.error')) {
    document.querySelector('.error').style.display = 'none';
  }
};

const setPhotoFormSubmit = (onSuccess) => {
  formElement.addEventListener('submit', (evt) => {
    document.removeEventListener('keydown', closeForm);
    evt.preventDefault();
    toggleDisabled(submitButton);
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => {
          onSuccess();
          formElement.reset();
          closeFormSubmit();
          document.querySelector('.success').style.display = 'flex';
          document
            .querySelector('.success__button')
            .addEventListener('click', () => {
              document.querySelector('.success').style.display = 'none';
            });
          document.addEventListener('keydown', closeSuccessModal);
          document.addEventListener('click', closeSuccessModal);
        },
        () => {
          toggleDisabled(submitButton);
          document.querySelector('.error').style.zIndex = 5;
          document.querySelector('.error').style.display = 'flex';
          document
            .querySelector('.error__button')
            .addEventListener('click', () => {
              document.querySelector('.error').style.display = 'none';
            });
          document.addEventListener('keydown', closeErrorModal);
          document.addEventListener('click', closeErrorModal);
        },
        new FormData(evt.target)
      );
    }
  });
};

uploadButtonElement.addEventListener('change', showForm);

setPhotoFormSubmit(closeFormSubmit);

export { previewImageElement, hashtagInputElement, textDescriptionElement };
