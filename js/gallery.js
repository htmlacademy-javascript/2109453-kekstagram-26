const MAX_COMMENTS = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureDescription = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentCountNumber = document.querySelector('.comments-count');
const commentLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const commentElement = document.querySelector('.social__comment');
const commentListFragment = document.createDocumentFragment();
const closeBtn = document.querySelector('#picture-cancel');

let commentsCount = 0;
const showComments = (comments) => {
  const newArr = comments.slice(0, (commentsCount += MAX_COMMENTS));
  newArr.forEach((element) => {
    const commentElementCopy = commentElement.cloneNode(true);
    const commentAvatar = commentElementCopy.querySelector('.social__picture');
    const commentMesssage = commentElementCopy.querySelector('.social__text');

    commentAvatar.src = element.avatar;
    commentAvatar.alt = element.name;
    commentMesssage.textContent = element.message;

    commentListFragment.append(commentElementCopy);
  });

  commentList.textContent = '';
  commentList.append(commentListFragment);
  commentLoader.classList.remove('hidden');
  if (commentsCount >= comments.length) {
    const commentCountOver = `${
      comments.length
    } из <span class="comments-count">${(commentCountNumber.textContent =
      comments.length)}</span> комментариев`;
    commentCount.innerHTML = commentCountOver;
    commentLoader.classList.add('hidden');
  } else {
    const commentCountText = `${commentsCount} из <span class="comments-count">${(commentCountNumber.textContent =
      comments.length)}</span> комментариев`;
    commentCount.innerHTML = commentCountText;
  }
};

const closeImage = (evt) => {
  const bigPicturePreview = document.querySelector('.big-picture');
  if (
    evt.key === 'Escape' ||
    evt.target === closeBtn ||
    evt.target === bigPicturePreview
  ) {
    commentsCount = 0;
    bigPictureElement.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentList.textContent = '';
    closeBtn.removeEventListener('click', closeImage);
    window.removeEventListener('keydown', closeImage);
    document.removeEventListener('click', closeImage);
  }
};

const showPicture = (url, likes, description, comments) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  showComments(comments);

  commentLoader.onclick = () => {
    showComments(comments);
  };

  closeBtn.addEventListener('click', closeImage);
  window.addEventListener('keydown', closeImage);
  document.addEventListener('click', closeImage);
};

export { showPicture, showComments };
