import { createRandomPosts } from './data.js';

const pictures = document.querySelector('.pictures');

const randonPicturesTemplate = document.querySelector('#picture').content;

const randonPictures = createRandomPosts();
const randonPicturesFragment = document.createDocumentFragment();

randonPictures.forEach(({ url, likes, comments }) => {
  const pictureElement = randonPicturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent =
    comments.length;
  randonPicturesFragment.append(pictureElement);
});
pictures.append(randonPicturesFragment);
