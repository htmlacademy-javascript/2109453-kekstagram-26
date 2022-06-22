import { createRandomPosts } from './data.js';
import { showPicture } from './gallery.js';

const randonPicturesTemplate = document.querySelector('#picture').content;
const picture = document.querySelector('.pictures');
const randonPictures = createRandomPosts();
const randonPicturesFragment = document.createDocumentFragment();

randonPictures.forEach(({ url, likes, description, comments }) => {
  const pictureElement = randonPicturesTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent =
    comments.length;
  pictureElement.querySelector('.picture').addEventListener('click', (evt) => {
    evt.preventDefault();
    showPicture(url, likes, description, comments);
  });
  randonPicturesFragment.append(pictureElement);
});

picture.append(randonPicturesFragment);

export { randonPictures };
