const darkModeToggle = document.getElementById("darkModeToggle");
const icon = document.getElementById("icon");

// Ensure we check for the "dark" value
const isDarkMode = localStorage.getItem("theme") === "dark";

// Apply dark mode if stored in localStorage
if (isDarkMode) {
    document.body.classList.add("dark-mode");
    icon.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    // Toggle the correct class
    document.body.classList.toggle("dark-mode");

    // Check the current mode and update localStorage
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Update icon based on mode
    icon.textContent = isDark ? "☀️" : "🌙";
});
