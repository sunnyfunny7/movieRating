// Author: Sebastian Rodriguez
//Purpose: Main JS file handling the displays of stored reviews and comments. As well as the like and dislike button functions.
// Wait for the DOM to fully load before executing the script
document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".star-rating label");
    let selectedRating = 0;

    // Star Rating System 
    stars.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = 5 - index; // Calculate the rating value (1-5)
            stars.forEach((s, i) => s.classList.toggle("selected", i >= 5 - selectedRating));
        });

        star.addEventListener("mouseover", () => {
            stars.forEach((s, i) => s.classList.toggle("hover", i >= 5 - index));
        });

        star.addEventListener("mouseout", () => {
            stars.forEach(s => s.classList.remove("hover"));
        });
    });

    // Image Click to Enlarge
    const movieImage = document.getElementById("movie-image");
    const modal = document.getElementById("image-modal");
    const modalImage = document.getElementById("modal-image");
    const closeModal = document.getElementById("close-modal");

    movieImage.addEventListener("click", () => {
        modal.style.display = "block";
        modalImage.src = movieImage.src; // Set the modal image to the clicked image
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Retrieve and display stored reviews from localStorage
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const reviewsList = document.querySelector(".reviews-list");
    storedReviews.forEach(review => {
        const reviewElement = createReviewElement(review);
        reviewsList.appendChild(reviewElement);
    });

    // Retrieve and display stored comments from localStorage
    const storedComments = JSON.parse(localStorage.getItem("comments")) || [];
    const commentsList = document.querySelector(".comments-list");
    storedComments.forEach(comment => {
        const commentElement = createCommentElement(comment);
        commentsList.appendChild(commentElement);
    });

    // Submit Review
    const reviewForm = document.querySelector(".new-review-form");
    reviewForm.querySelector(".submit-review").addEventListener("click", () => {
        const name = reviewForm.querySelector(".reviewer-name").value.trim();
        const text = reviewForm.querySelector(".review-textarea").value.trim();
        const date = new Date().toLocaleDateString();

        if (name && text && selectedRating) {
            const review = { name, text, rating: selectedRating, date };
            storedReviews.push(review);
            localStorage.setItem("reviews", JSON.stringify(storedReviews)); // Save to localStorage

            const reviewElement = createReviewElement(review);
            reviewsList.appendChild(reviewElement);

            reviewForm.reset(); // Clear form
            selectedRating = 0; // Reset rating
            stars.forEach(s => s.classList.remove("selected"));
        }
    });

    // Submit Comment
    const commentForm = document.querySelector(".new-comment-form");
    commentForm.querySelector(".submit-comment").addEventListener("click", () => {
        const name = commentForm.querySelector(".commenter-name").value.trim();
        const text = commentForm.querySelector(".comment-textarea").value.trim();
        const date = new Date().toLocaleDateString();

        if (name && text) {
            const comment = { name, text, date, likeCount: 0, dislikeCount: 0 };
            storedComments.push(comment);
            localStorage.setItem("comments", JSON.stringify(storedComments)); // Save to localStorage

            const commentElement = createCommentElement(comment);
            commentsList.appendChild(commentElement);

            commentForm.reset(); // Clear form
        }
    });

    // Create review element
    function createReviewElement(review) {
        const reviewElement = document.createElement("div");
        reviewElement.classList.add("review-card");
        reviewElement.innerHTML = `
            <h3>${review.name}</h3>
            <p class="rating">Rating: ${"★".repeat(review.rating)}</p>
            <p>${review.text}</p>
            <div class="date">Posted on: ${review.date}</div>
            <button class="delete-review">Delete</button>
        `;
        reviewElement.querySelector(".delete-review").addEventListener("click", () => {
            reviewElement.remove();
            const index = storedReviews.indexOf(review);
            if (index > -1) storedReviews.splice(index, 1);
            localStorage.setItem("reviews", JSON.stringify(storedReviews)); // Update localStorage
        });
        return reviewElement;
    }

    // Create comment element
    function createCommentElement(comment) {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment-card");
        commentElement.innerHTML = `
            <h3>${comment.name}</h3>
            <p>${comment.text}</p>
            <div class="date">Posted on: ${comment.date}</div>
            <div class="like-dislike-buttons">
                <button class="like-button">👍 Like</button>
                <span class="like-counter">${comment.likeCount}</span>
                <button class="dislike-button">👎 Dislike</button>
                <span class="dislike-counter">${comment.dislikeCount}</span>
            </div>
            <button class="delete-comment">Delete</button>
        `;
        initializeLikeDislikeFunctionality(commentElement, comment);
        commentElement.querySelector(".delete-comment").addEventListener("click", () => {
            commentElement.remove();
            const index = storedComments.indexOf(comment);
            if (index > -1) storedComments.splice(index, 1);
            localStorage.setItem("comments", JSON.stringify(storedComments)); // Update localStorage
        });
        return commentElement;
    }

    // Initialize like/dislike functionality for a comment
    function initializeLikeDislikeFunctionality(commentElement, comment) {
        const likeButton = commentElement.querySelector(".like-button");
        const dislikeButton = commentElement.querySelector(".dislike-button");
        const likeCounter = commentElement.querySelector(".like-counter");
        const dislikeCounter = commentElement.querySelector(".dislike-counter");

        // Initialize counters from comment data
        let likeCount = comment.likeCount;
        let dislikeCount = comment.dislikeCount;

        likeButton.addEventListener("click", () => {
            if (!likeButton.classList.contains("active")) {
                likeCount++;
                comment.likeCount = likeCount;
                likeCounter.textContent = likeCount;
                if (dislikeButton.classList.contains("active")) {
                    dislikeCount--;
                    comment.dislikeCount = dislikeCount;
                    dislikeCounter.textContent = dislikeCount;
                }
                likeButton.classList.add("active");
                dislikeButton.classList.remove("active");
                updateLocalStorage();
            }
        });

        dislikeButton.addEventListener("click", () => {
            if (!dislikeButton.classList.contains("active")) {
                dislikeCount++;
                comment.dislikeCount = dislikeCount;
                dislikeCounter.textContent = dislikeCount;
                if (likeButton.classList.contains("active")) {
                    likeCount--;
                    comment.likeCount = likeCount;
                    likeCounter.textContent = likeCount;
                }
                dislikeButton.classList.add("active");
                likeButton.classList.remove("active");
                updateLocalStorage();
            }
        });
    }

    // Update comments in localStorage
    function updateLocalStorage() {
        localStorage.setItem("comments", JSON.stringify(storedComments));
    }
});
