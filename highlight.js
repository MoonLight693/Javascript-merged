// initial ideas from:
// - ByteGrad: https://www.youtube.com/watch?v=z70GTU3p72I
// - WEB CIFAR: https://www.youtube.com/watch?v=RsPWEmfOQdU -> https://codepen.io/Web_Cifar/pen/LYRBbVE
// This particular part of the assignment was amoung the hardest becasuse our html is in desperate 
// need of fixing, as targeting sections is not easy.

document.addEventListener("DOMContentLoaded", () => {
    // Select all sections with an ID
    const sections = document.querySelectorAll("div[id]");

    // Select all navigation links inside the navbar
    const navLinks = document.querySelectorAll("nav .navbar-nav .nav-link");

    // Listen for the scroll event
    window.addEventListener("scroll", () => {
        let current = null; // Stores the currently active section
        let minDistance = Infinity; // Tracks the closest section

        // Get scroll position and viewport details
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const middleScreen = scrollY + windowHeight / 2; // Midpoint of the viewport

        // Loop through each section to determine which one is in view
        sections.forEach(section => {
            const sectionId = section.getAttribute("id");

            // Exclude margin sections as they are not actual content sections
            if (["Left Margin", "Right Margin"].includes(sectionId)) return;

            // Get section position and size
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionBottom = sectionTop + sectionHeight;

            console.log(`Checking section: ${sectionId}`);
            console.log(`  Top: ${sectionTop}, Bottom: ${sectionBottom}, Height: ${sectionHeight}`);

            // Check if the middle of the screen is within this section
            if (middleScreen >= sectionTop && middleScreen < sectionBottom) {
                const distance = Math.abs(middleScreen - sectionTop);

                // Select the closest section to the middle of the screen
                if (distance < minDistance) {
                    minDistance = distance;
                    current = sectionId;
                }
            }
        });

        // Treat "sections-container" as "Additional_Sections"
        if (current === "sections-container") {
            current = "Additional_Sections";
        }

        console.log(`Final Active Section: ${current}`); // Debug: Show the final active section

        // Ensure History is NOT selected by default when no section is active
        if (!current) {
            console.log("No valid section found, keeping previous active section.");
            return;
        }

        // Loop through each nav link and update the active class
        navLinks.forEach(link => {
            const linkTarget = link.getAttribute("href").substring(1); // Extract the section ID from href

            // Remove active styling from all links
            link.classList.remove("bg-warning", "text-white");

            // If the link corresponds to the active section, highlight it
            if (linkTarget === current) {
                console.log(`Activating link: ${current}`); // Debug: Show which link is being activated
                link.classList.add("bg-warning", "text-white");
            }
        });
    });
});
