const commentApi = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/4dyq58hiPupb0utce3OK/comments';

export const fetchComments = async (id) => {
  const response = await fetch(`${commentApi}?item_id=${id}`);
  const data = await response.json();

  if (!response.ok) {
    return null;
  }
  return data;
};

// eslint-disable-next-line
const createCommentHtml = ({ creation_date, comment, username }) => {

  // eslint-disable-next-line
  const creationDate = creation_date;
  const commentli = document.createElement('li');
  commentli.className = 'comment-li';
  commentli.innerHTML = `
   <span>${username}<span><span>${comment}<span><span>${creationDate}<span>
  `;
  return commentli;
};

export const generateComment = async (id) => {
  const commentUl = document.createElement('ul');
  commentUl.id = 'comments-section';
  commentUl.innerHTML = '';
  const comments = await fetchComments(id);

  if (comments === null) {
    const noCommentLi = document.createElement('li');
    noCommentLi.className = 'no_comment_li';
    noCommentLi.textContent = 'Be the first to comment';
    commentUl.append(noCommentLi);
  } else {
    comments.forEach((comment) => {
      commentUl.append(createCommentHtml(comment));
    });
  }
  return commentUl;
};

export const addComment = async (id, user, comment) => {
  const newComment = {
    item_id: id,
    username: user,
    comment,
  };

  const response = await fetch(`${commentApi}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  });
  return response;
};