const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImage = document.querySelector('.big-picture__img img');
const bigPictureLikes = document.querySelector('.likes-count');
const bigPictureDescription = document.querySelector('.social__caption');
const commentCount = document.querySelector('.social__comment-count');
const commentCountNumber = document.querySelector('.comments-count');
const commentLoader = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');
const closeBtn = document.querySelector('#picture-cancel');

let commentsStart = 0;
let commentsEnd = 5;

const showComments = (elements) => {
  if (commentsEnd >= elements.length) {
    const commentCountOver = `${
      elements.length
    } из <span class="comments-count">${(commentCountNumber.textContent =
      elements.length)}</span> комментариев`;
    commentCount.innerHTML = commentCountOver;
    commentLoader.style.display = 'none';
  }
  const newArr = elements.slice(commentsStart, commentsEnd);
  newArr.forEach((element) => {
    commentList.insertAdjacentHTML(
      'beforeend',
      `
        <li class="social__comment">
            <img class="social__picture" src=${element.avatar} alt=${element.name} width="35" height="35">
                <p class="social__text">${element.message}</p>
            </li>
        </li>
        `
    );
  });
};

const showPicture = (url, likes, description, comments) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImage.src = url;
  bigPictureLikes.textContent = likes;
  bigPictureDescription.textContent = description;
  commentList.textContent = '';
  const commentContent = `${
    commentsEnd < comments.length ? commentsEnd : comments.length
  } из <span class="comments-count">${(commentCountNumber.textContent =
    comments.length)}</span> комментариев`;
  commentCount.innerHTML = commentContent;
  commentLoader.style.display = 'block';

  showComments(comments);

  const loadComments = () => {
    if (commentsEnd > comments.length) {
      commentsEnd = comments.length;
    } else {
      commentsStart += 5;
      commentsEnd += 5;
    }
    showComments(comments);
  };

  commentLoader.addEventListener('click', loadComments);

  const closeImage = (evt) => {
    if (evt.key === 'Escape' || evt.target === closeBtn) {
      commentsStart = 0;
      commentsEnd = 5;
      bigPictureElement.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentLoader.removeEventListener('click', loadComments);
      commentList.textContent = '';
    }
    closeBtn.removeEventListener('click', closeImage);
    window.removeEventListener('keydown', closeImage);
  };

  closeBtn.addEventListener('click', closeImage);
  window.addEventListener('keydown', closeImage);
};

export { showPicture };
