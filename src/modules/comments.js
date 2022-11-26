import { generateComment, addComment } from './display-comments.js';
import commentCounter from './comment-counter.js';

const fillDetails = async (id) => {
  const baseApi = 'https://api.tvmaze.com/shows/';
  const list = await fetch(`${baseApi}${id}`).then((response) => response.json());
  return list;
};

const addCommentEvent = async () => {
  const commentForm = document.querySelector('.new-comment-form');
  const submitComment = document.querySelector('.submit-btn');
  commentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const { user } = commentForm.elements;
    const { comment } = commentForm.elements;

    await addComment(submitComment.id, user.value, comment.value);

    const commentsDiv = document.querySelector('.comment-display');
    const commentCountSpan = document.querySelector('.comment-count');

    const commentul = await generateComment(submitComment.id);
    commentsDiv.innerHTML = '';
    commentsDiv.append(commentul);

    const commentCount = commentCounter();
    commentCountSpan.textContent = `(${commentCount})`;

    commentForm.reset();
  });
};

const addClosePopUpevent = () => {
  const closeBtn = document.querySelector('.mclose-btn');
  closeBtn.addEventListener('click', () => {
    const popupModal = document.querySelector('.modal-wraper');
    popupModal.style.display = 'none';
  });
};

export const createPopUpDetails = (details) => {
  const projectModal = document.createElement('div');
  projectModal.className = 'movie-pop-up';

  projectModal.innerHTML = `
  <div class="mclose-btn">
  <span class="close-span">X</span>  
  </div>

  
  <div class="popup-top-section">
  <div class= 'modal-image'>
  <img
  src="${details.image.medium}";
  alt="cover image"
  id="modal-cover"
  />
  </div>
  <div class= "modal-head">
      <div class = "summary">${details.summary}</div>
  </div>
  </div>

  
  <div class = "movie-attributes">
      <ul>
      <li><span>Name:</span>${details.name}</li>
      <li><span>Language:</span>${details.language}</li>
      </ul>
      <ul>
      <li><span>Genre:</span>${details.genres[0]}</li>
      <li><span>Premiered:</span>${details.premiered}</li>
      </ul>
  </div>
  
  <h2>Comments<span class="comment-count"></span></h2>
  <div class= "comment-display">
  </div>
  
  <div class="add-comment">
  <h2>Add Comment</h2>

  <div class="comments-form">
  <form class="new-comment-form">
  <input type="text" id="user" placeholder="name" required>
  <textarea cols="30" rows="10" placeholder="comment" id="comment" required></textarea>
  <button type="submit" class="submit-btn" id="${details.id}">Add Comment</button>
  </form>
  </div>
  </div>
`;
  return projectModal;
};

const displayPoUp = async (id) => {
  const popupModal = document.querySelector('.modal-wraper');
  popupModal.innerHTML = '';

  const movieDetail = await fillDetails(id);

  popupModal.append(createPopUpDetails(movieDetail));

  const commentsDiv = document.querySelector('.comment-display');
  const commentCountSpan = document.querySelector('.comment-count');

  const commentul = await generateComment(id);
  commentsDiv.append(commentul);

  const commentCount = commentCounter();
  commentCountSpan.textContent = `(${commentCount})`;

  popupModal.style.display = 'flex';
  addCommentEvent();
  addClosePopUpevent();
};

export const addCommentPopupEvent = () => {
  const commentBtns = document.querySelectorAll('.btn');
  commentBtns.forEach((btn) => btn.addEventListener('click', (e) => {
    e.preventDefault();
    displayPoUp(btn.id);
  }));
};
