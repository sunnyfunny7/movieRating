const sortBySelect = document.getElementById('sort-by');
const movieList = document.getElementById('movie-list');
const movieItems = movieList.querySelectorAll('li');


sortBySelect.addEventListener('change', () => {
    const sortBy = sortBySelect.value;
    const movies = Array.from(movieList.children);

    movies.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                return a.querySelector('.title').textContent.localeCompare(b.querySelector('.title').textContent);
            case 'genre':
                return a.getAttribute('data-genre').localeCompare(b.getAttribute('data-genre'));
            case 'rating':
                return Number(a.querySelector('.rating').textContent) - Number(b.querySelector('.rating').textContent);
            default:
                return 0;
        }
    });

    movieList.innerHTML = '';
    movies.forEach(movie => movieList.appendChild(movie));

    movieItems.forEach(item => {
      item.addEventListener('click', () => {
          const movieLink = item.querySelector('a').href;
          window.location.href = movieLink;
      });
  });
});