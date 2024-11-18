// scripts.js

// Wait for the DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Select carousel and navigation buttons
    const carousel = document.querySelector('.carousel');
    const images = document.querySelectorAll('.carousel img');
    const leftArrow = document.querySelector('.arrow.left');
    const rightArrow = document.querySelector('.arrow.right');

    let currentIndex = 0; // Track the current slide index
    const totalImages = images.length; // Total number of images
    const imageWidth = 300; // Width of each image (adjust as needed)

    // Function to update carousel's translateX position
    function updateCarousel() {
        const offset = -(currentIndex * imageWidth); // Calculate offset
        carousel.style.transform = `translateX(${offset}px)`; // Apply transformation
        carousel.style.transition = 'transform 0.5s ease'; // Smooth transition
    }

    // Right arrow click event
    rightArrow.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalImages; // Move to next image
        updateCarousel();
    });

    // Left arrow click event
    leftArrow.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalImages) % totalImages; // Move to previous image
        updateCarousel();
    });

    // Optional: Auto-scroll feature (comment out if not needed)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages; // Auto-increment index
        updateCarousel();
    }, 5000); // Change slide every 5 seconds
});
