//Thor Pilegaard handled this section of code for Team assignment of JavaScript

//This code was written from W3 schools, help from Chatgpt as
//well as Sling Academy



//This section of code is for retaining the history of previous inquerries using LocalStorage

document.addEventListener("DOMContentLoaded", function () {
    let searchInput = document.getElementById("search-bar");
    let historyDropdown = document.getElementById("search-history");
   
    // Retrieve search history from localStorage
    let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];

    // Function to update the dropdown list
    function updateHistoryDropdown() {
        historyDropdown.innerHTML = ""; // Clear previous items

        if (searchHistory.length === 0) {
            historyDropdown.style.display = "none"; // Hide if empty
            return;
        }

        historyDropdown.style.display = "block"; // Show dropdown

        searchHistory.forEach(searchTerm => {
            let listItem = document.createElement("li");
            listItem.textContent = searchTerm;
            listItem.addEventListener("click", function () {
                searchInput.value = searchTerm; // Set input value when clicked
                historyDropdown.style.display = "none"; // Hide dropdown
            });
            historyDropdown.appendChild(listItem);
        });
    }

    // Show past searches when clicking the search bar
    searchInput.addEventListener("focus", function () {
        updateHistoryDropdown();
    });

    // Save search term when the user presses Enter
    searchInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter" && this.value.trim() !== "") {
            let newSearch = this.value.trim();

            // Prevent duplicates
            if (!searchHistory.includes(newSearch)) {
                searchHistory.unshift(newSearch); // Add new search to the top
                localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
            }

            historyDropdown.style.display = "none"; // Hide dropdown after selection
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!searchInput.contains(event.target) && !historyDropdown.contains(event.target)) {
            historyDropdown.style.display = "none";
        }
    });

    // Clear history when clicking the "Clear History" button
    document.getElementById("clear-history").addEventListener("click", function () {
        localStorage.removeItem("searchHistory");
        searchHistory = [];
        updateHistoryDropdown();
    });
});




//This section of code is for saving data entries in case of browser interuption or reset.
//It is also for real-time (dynamic) user input validation and form validation (prompting the user to not enter "").


document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("myForm");
    const searchInput = document.getElementById("search-bar");
    const errorElement = document.getElementById("search-bar-error");


    //in case page reloads or internet connectivity is ascew

    if(localStorage.getItem("savedSearch")){
        searchInput.value = localStorage.getItem("savedSearch")
    }

    searchInput.addEventListener("input", function () {
        localStorage.setItem("savedSearch", searchInput.value);
    });

    // Form submission validation
    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        let isValid = validateForm();
        if (!isValid) {
            event.preventDefault(); // Only prevent submission if invalid
        }
    });

    // Real-time validation while typing
    searchInput.addEventListener("input", function () {
        validateForm();
    });

    // Function to validate input
    function validateForm() {
        const searchbar = searchInput.value.trim();
        errorElement.textContent = ""; // Reset error message

        if (searchbar === "") {
            errorElement.textContent = "Search cannot be blank!";
            return false;
        } else if (containsSpecialCharacters(searchbar)) {
            errorElement.textContent = "Do not enter special characters!";
            return false;
        }

        return true; // Input is valid
    }

    // Function to check for special characters
    function containsSpecialCharacters(input) {
        const specialCharRegex = /[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~]/; // Special character pattern
        return specialCharRegex.test(input);
    }
});