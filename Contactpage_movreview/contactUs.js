document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from refreshing the page

    // Capture form data
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value,
        submittedAt: new Date().toISOString() // Capture timestamp
    };

    // Convert data to JSON format
    const jsonData = JSON.stringify(formData, null, 2);

    // Log to console for testing
    console.log("Feedback Form Data:", jsonData);

    // Save JSON data to a file (For testing purposes, requires a server)
    downloadJSON(jsonData, "contactUs.json");
});

// Function to trigger download of JSON file
function downloadJSON(data, filename) {
    const blob = new Blob([data], { type: "application/json" }); // Create JSON blob
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename; // File name to save as
    link.click();
}
