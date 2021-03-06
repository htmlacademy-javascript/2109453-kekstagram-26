import {
  pristine,
  formElement,
  hashtagInputElement,
  textDescriptionElement,
} from './pristine-utils.js';
import { sendData } from './api.js';
import { sliderElementWrapper, effectFilterList } from './change-effect.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
let scaleValue = 100;

const uploadButtonElement = document.querySelector('#upload-file');
const closeButtonElement = document.querySelector('#upload-cancel');
const overlay = document.querySelector('.img-upload__overlay');
const scaleControlWrapper = document.querySelector('.scale');
const scaleValueElement = document.querySelector('.scale__control--value');
const previewImageElement = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const successMessageTemplate = document.querySelector('#success').content;
const successMessageElement = successMessageTemplate.cloneNode(true);
const errorMessageTemplate = document.querySelector('#error').content;
const errorMessageElement = errorMessageTemplate.cloneNode(true);
const submitButton = document.querySelector('.img-upload__submit');

document.body.appendChild(successMessageElement);
document.body.appendChild(errorMessageElement);

document.querySelector('.error').style.display = 'none';
document.querySelector('.success').style.display = 'none';

const scaleControlHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--bigger')) {
    if (scaleValue < MAX_SCALE) {
      scaleValue += SCALE_STEP;
    }
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    if (scaleValue > MIN_SCALE) {
      scaleValue -= SCALE_STEP;
    }
  }
  scaleValueElement.value = `${scaleValue}%`;
  previewImageElement.style.transform = `scale(${scaleValue / 100})`;
};

const clearEffectRadio = () => {
  for (let i = 1; i < effectFilterList.length; i++) {
    effectFilterList[i].checked = false;
  }
  effectFilterList[0].checked = true;
};

const resetForm = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadButtonElement.value = '';
  scaleValue = 100;
  scaleValueElement.value = `${scaleValue}%`;
  previewImageElement.style.transform = 'scale(1)';
  previewImageElement.style.filter = '';
  sliderElementWrapper.style.display = 'none';
  clearEffectRadio();
  scaleControlWrapper.removeEventListener('click', scaleControlHandler);
};

const closeForm = (evt) => {
  if (
    hashtagInputElement === document.activeElement ||
    textDescriptionElement === document.activeElement
  ) {
    evt.stopPropagation();
  } else if (evt.key === 'Escape' || evt.target === closeButtonElement) {
    resetForm();
    closeButtonElement.removeEventListener('click', closeForm);
    document.removeEventListener('keydown', closeForm);
  }
};

const closeFormSubmit = () => {
  resetForm();
};

const showForm = () => {
  scaleValueElement.value = `${scaleValue}%`;

  const file = uploadButtonElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewImageElement.src = URL.createObjectURL(file);
    effectsPreview.forEach((element) => {
      element.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
    });
  }

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
    submitButton.disabled = true;
    document.removeEventListener('keydown', closeForm);
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => {
          onSuccess();
          formElement.reset();
          uploadButtonElement.value = '';
          closeFormSubmit();
          document.querySelector('.success').style.display = 'flex';
          document
            .querySelector('.success__button')
            .addEventListener('click', () => {
              document.querySelector('.success').style.display = 'none';
            });
          document.addEventListener('keydown', closeSuccessModal);
          document.addEventListener('click', closeSuccessModal);
          submitButton.disabled = false;
        },
        () => {
          submitButton.disabled = false;
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
    } else {
      submitButton.disabled = false;
    }
  });
};

uploadButtonElement.addEventListener('change', showForm);

setPhotoFormSubmit(closeFormSubmit);

export { previewImageElement, hashtagInputElement, textDescriptionElement };
