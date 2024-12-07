const searchInput = document.querySelector('.input');
const exploreButton = document.querySelector('.explore-button');

exploreButton.addEventListener('click', () => {
  const searchQuery = searchInput.value.toLowerCase();

  // Simple search logic: redirect based on exact match
  if (searchQuery === 'the dark knight') {
    window.location.href = 'the_dark_knight.html';
  } else if (searchQuery === 'transformers 2' || searchQuery === 'transformers revenge of the fallen') {
    window.location.href = 'transformers_2.html';
  } else if (searchQuery === 'batman and robin') {
    window.location.href = 'batman_and_robin.html';
  } else if (searchQuery === 'forrest gump') {
    window.location.href = 'forrest_gump.html';
  } else if (searchQuery === 'godfather') {
    window.location.href = 'godfather.html';
  } else if (searchQuery === 'jurassic world') {
    window.location.href = 'jurassic_world.html';
  } else if (searchQuery === 'planet of the apes') {
    window.location.href = 'planet_of_the_apes.html';
  } else {
    // Handle invalid search query or no match
    alert('Movie not found. Please try again.');
  }
});