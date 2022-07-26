import { showPicture } from './gallery.js';
import { getData } from './api.js';
import { showAlert, debounce, getRandomNotRepeated } from './util.js';

const RANDOM_PHOTO_COUNT = 10;

const randonPicturesFragment = document.createDocumentFragment();
const randonPicturesTemplate = document.querySelector('#picture').content;
const picturesElement = document.querySelector('.pictures');
const filterContainer = document.querySelector('.img-filters__form');
const filterButtons = document.querySelectorAll('.img-filters__button');
const picturesList = [];

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = randonPicturesTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent =
      picture.comments.length;
    pictureElement
      .querySelector('.picture')
      .addEventListener('click', (evt) => {
        evt.preventDefault();
        showPicture(
          picture.url,
          picture.likes,
          picture.description,
          picture.comments
        );
      });
    randonPicturesFragment.append(pictureElement);
    picturesElement.append(randonPicturesFragment);
  });
};

const getPictures = () => {
  getData(
    (pictures) => {
      const imageFilterElement = document.querySelector('.img-filters');
      imageFilterElement.classList.remove('img-filters--inactive');
      picturesList.push(...pictures);
      renderPictures(picturesList);
    },
    () => {
      showAlert('Не удалось загрузить фотографии');
    }
  );
};

const showDefault = (pictures) => {
  const copyPictures = [...pictures];
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
  renderPictures(copyPictures);
};

const showRandom = (pictures) => {
  const copyPictures = [...pictures];

  const randomIndex = getRandomNotRepeated(pictures.length - 1);

  const result = [];

  for (let i = 0; i < RANDOM_PHOTO_COUNT; i++) {
    result.push(copyPictures[randomIndex()]);
  }
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
  renderPictures(result);
};

const showDiscussed = (pictures) => {
  const copyPictures = [...pictures];
  const result = copyPictures.sort((a, b) => {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  });
  document.querySelectorAll('.picture').forEach((item) => {
    item.remove();
  });
  renderPictures(result);
};

const filterHandler = (evt) => {
  const activeButton = evt.target;
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');

  if (activeButton.id === 'filter-random') {
    showRandom(picturesList);
  } else if (activeButton.id === 'filter-default') {
    showDefault(picturesList);
  } else if (activeButton.id === 'filter-discussed') {
    showDiscussed(picturesList);
  }
};

filterContainer.addEventListener('click', debounce(filterHandler));
getPictures();
