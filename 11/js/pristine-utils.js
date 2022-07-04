import { checkStringLength } from './util.js';

const formElement = document.querySelector('#upload-select-image');
const textDescriptionElement = document.querySelector('.text__description');
const hashtagInputElement = document.querySelector('.text__hashtags');

const HASHTAG_REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG_QUANTITY_MAX = 5;
const HASHTAG_LENGTH_MAX = 20;
const DESCRIPTION_MAX = 140;

const errorMessages = {
  accuracy:
    'строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.',
  quantity: 'нельзя указать больше пяти хэш-тегов',
  uniqueness: 'один и тот же хэш-тег не может быть использован дважды',
  hashtagLength:
    'максимальная длина одного хэш-тега 20 символов, включая решётку',
  descriptionLength:
    'длина комментария не может составлять больше 140 символов',
};

const pristine = new Pristine(formElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const getHashtags = (array) =>
  array
    .toLowerCase()
    .split(' ')
    .filter((item) => item !== '');

const checkAccuracy = (array) => {
  const hashtags = getHashtags(array);
  return hashtags.every((item) => HASHTAG_REGEX.test(item));
};

const checkQuantity = (array) => {
  if (getHashtags(array).length <= HASHTAG_QUANTITY_MAX) {
    return true;
  }
  return false;
};

const checkUniqueness = (array) => {
  const hashtags = getHashtags(array);
  const uniques = new Set(hashtags);
  return hashtags.length === uniques.size;
};

const checkHashtagLength = (array) => {
  const hashtags = getHashtags(array);
  return hashtags.every((item) => checkStringLength(item, HASHTAG_LENGTH_MAX));
};

const checkLengthDescription = (array) =>
  checkStringLength(array, DESCRIPTION_MAX);

pristine.addValidator(
  hashtagInputElement,
  checkAccuracy,
  errorMessages.accuracy,
  false
);

pristine.addValidator(
  hashtagInputElement,
  checkQuantity,
  errorMessages.quantity,
  false
);

pristine.addValidator(
  hashtagInputElement,
  checkUniqueness,
  errorMessages.uniqueness,
  false
);

pristine.addValidator(
  hashtagInputElement,
  checkHashtagLength,
  errorMessages.hashtagLength
);

pristine.addValidator(
  textDescriptionElement,
  checkLengthDescription,
  errorMessages.descriptionLength
);

const validateForm = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

export {
  validateForm,
  formElement,
  hashtagInputElement,
  textDescriptionElement,
};
