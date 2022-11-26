class HelperFuncs {
    static registersLikeButtons = (movies) => {
      const likeButtons = document.querySelectorAll('.fa-heart');
      likeButtons.forEach((likeButton) => {
        likeButton.addEventListener('click', () => {
          const movieId = parseInt(likeButton.getAttribute('data-pos'), 10);
          movies.addLike(movieId, likeButton);
        });
      });
    }
}
export default HelperFuncs;