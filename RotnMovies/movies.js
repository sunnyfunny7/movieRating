// movies.js

// Fetch the dataset
fetch('movies.json')
    .then(response => response.json())
    .then(movies => {
        // Categorize movies by genre
        const categories = {};
        movies.forEach(movie => {
            if (!categories[movie.genre]) {
                categories[movie.genre] = [];
            }
            categories[movie.genre].push(movie);
        });

        // Sort movies by popularity
        const popularMovies = [...movies].sort((a, b) => b.reviews - a.reviews);

        // Sort movies by rating
        const highestRatedMovies = [...movies].sort((a, b) => b.rating - a.rating);
        const lowestRatedMovies = [...movies].sort((a, b) => a.rating - b.rating);

        // Function to display movies in a container
        function displayMovies(movies, containerId) {
            const container = document.getElementById(containerId);
            container.innerHTML = "";
            movies.forEach(movie => {
                const movieElement = document.createElement("div");
                movieElement.className = "movie-item";
                movieElement.innerHTML = `<h3>${movie.title}</h3>
                                          <p>Genre: ${movie.genre}</p>
                                          <p>Rating: ${movie.rating}</p>
                                          <p>Reviews: ${movie.reviews}</p>`;
                container.appendChild(movieElement);
            });
        }

        // Display movies in respective containers
        displayMovies(popularMovies, "popular-movies-container");
        displayMovies(highestRatedMovies, "highest-rated-movies-container");
        displayMovies(lowestRatedMovies, "lowest-rated-movies-container");
    })
    .catch(error => console.error('Error fetching movies:', error));
