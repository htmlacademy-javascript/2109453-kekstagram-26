const bigPicture = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureDescription = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentCountNumber = document.querySelector('.comments-count');
const commentLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const closeBtn = document.querySelector('#picture-cancel');

const showPicture = (url, likes, description, comments) => {
  commentCount.classList.add('hidden');
  commentLoader.classList.add('hidden');
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  commentCountNumber.textContent = comments.length;
  commentList.textContent = '';
  comments.forEach((element) => {
    commentList.insertAdjacentHTML(
      'afterbegin',
      `
        <li class="social__comment">
            <img class="social__picture" src=${element.avatar} alt=${element.name} width="35" height="35">
                <p class="social__text">${element.message}</p>
            </li>
        </li>
        `
    );
  });

  const closeImage = (evt) => {
    if (evt.key === 'Escape' || evt.target === closeBtn) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }
    closeBtn.removeEventListener('click', closeImage);
    window.removeEventListener('keydown', closeImage);
  };

  closeBtn.addEventListener('click', closeImage);
  window.addEventListener('keydown', closeImage);
};

export { showPicture };
