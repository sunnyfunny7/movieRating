document.addEventListener("DOMContentLoaded", () => {
  const sliderContainers = document.querySelectorAll(".slider-container");

  sliderContainers.forEach((container) => {
    const track = container.querySelector(".slider-track");
    const items = Array.from(track.children);
    const rightArrow = container.querySelector(".right-arrow");

    const itemWidth = track.querySelector(".slider-item").offsetWidth + 20; // Include gap

    // Right arrow functionality for scrolling
    rightArrow.addEventListener("click", () => {
      track.scrollBy({
        left: itemWidth, // Scroll one item's width
        behavior: "smooth", // Smooth scrolling
      });

      // Loop back to start when reaching the end
      if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
        setTimeout(() => {
          track.scrollTo({ left: 0, behavior: "smooth" });
        }, 500); // Slight delay for smooth looping
      }
    });
  });
});
