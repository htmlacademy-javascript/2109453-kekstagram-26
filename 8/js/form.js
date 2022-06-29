const formElement = document.querySelector('#upload-select-image');
const uploadBtn = document.querySelector('#upload-file');
const closeBtn = document.querySelector('#upload-cancel');
const overlay = document.querySelector('.img-upload__overlay');
const hashtagValue = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const pristine = new Pristine(formElement, {});

const validateHashtags = (value) => {
  if (value.length > 1) {
    const hashtagList = value.split(' ');
    const validTest = (item) => regex.test(item);

    return hashtagList.some(validTest);
  } else {
    return false;
  }
};

pristine.addValidator(
  hashtagValue,
  validateHashtags,
  'неправильный хэштэг',
  false
);

const validateForm = (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
};

const closeForm = (evt) => {
  if (
    hashtagValue === document.activeElement ||
    textDescription === document.activeElement
  ) {
    evt.stopPropagation();
  } else if (evt.key === 'Escape' || evt.target === closeBtn) {
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    uploadBtn.value = '';
  }
};

const showForm = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeBtn.addEventListener('click', closeForm);
  document.addEventListener('keydown', closeForm);
  formElement.addEventListener('submit', validateForm);
};

uploadBtn.addEventListener('change', showForm);
