const commentCounter = () => {
  const comments = document.querySelectorAll('.comment-li');
  return comments.length;
};

export default commentCounter;