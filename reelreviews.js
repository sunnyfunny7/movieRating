const exploreButton = document.querySelector('.explore-button');

exploreButton.addEventListener('click', () => {
  exploreButton.classList.add('exploded');
  setTimeout(() => {
    window.location.href = 'your_review_page.html'; 
  }, 1000); // Redirect after 1 second
});