import { showPicture } from './gallery.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
const randonPicturesFragment = document.createDocumentFragment();
const randonPicturesTemplate = document.querySelector('#picture').content;
const picturesElement = document.querySelector('.pictures');

getData(
  (pictures) => {
    pictures.forEach((picture) => {
      const pictureElement = randonPicturesTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = picture.url;
      pictureElement.querySelector('.picture__likes').textContent =
        picture.picturelikes;
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
  },
  () => {
    showAlert('Не удалось загрузить фотографии');
  }
);
