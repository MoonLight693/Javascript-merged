// Fetch data from content.json
fetch('content.json')
  .then(response => response.json())
  .then(contentData => {
    let sectionIndex = 0; // To keep track of the currently displayed section
    const deletedSections = []; // Store deleted sections to be re-added later

    // Function to create a new section
    function createSection(section) {
      const sectionDiv = document.createElement('div');
      sectionDiv.classList.add('section', 'mb-4', 'border', 'p-3');

      const sectionTitle = document.createElement('h2');
      sectionTitle.textContent = section.title;

      const sectionContent = document.createElement('div');
      sectionContent.innerHTML = section.content;

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete Section';
      deleteButton.classList.add('btn', 'btn-danger');
      deleteButton.addEventListener('click', function() {
        sectionDiv.remove();
        deletedSections.push(section); // Store deleted section for re-adding

        // Only show the add button if there are deleted sections to re-add
        if (deletedSections.length > 0) {
          document.getElementById('add-section-btn').style.display = 'inline-block';
        }
      });

      sectionDiv.id = section.id;
      sectionDiv.append(sectionTitle, sectionContent, deleteButton);

      return sectionDiv;
    }

    // Function to load a single section
    function loadSection() {
      if (sectionIndex < contentData.sections.length) {
        const section = contentData.sections[sectionIndex];
        const sectionElement = createSection(section);
        document.getElementById('sections-container').appendChild(sectionElement);
        sectionIndex++;

        // Hide "Add Section" button if last section is added
        if (sectionIndex === contentData.sections.length) {
          document.getElementById('add-section-btn').style.display = 'none';
        }
      }
    }

    // Handle the button click to add the next section or re-add a deleted section
    document.getElementById('add-section-btn').addEventListener('click', function() {
      if (deletedSections.length > 0) {
        // Re-add a deleted section
        const section = deletedSections.pop(); // Get the last deleted section
        const sectionElement = createSection(section);
        document.getElementById('sections-container').appendChild(sectionElement);
      } else {
        // Load the next section from the original list
        loadSection();
      }

      // Check if there are any more sections to add
      if (sectionIndex === contentData.sections.length && deletedSections.length === 0) {
        document.getElementById('add-section-btn').style.display = 'none'; // Hide button when no sections to add
      }
    });

    // Load the first section on page load
    loadSection();
  })
  .catch(error => {
    console.error('Error fetching content.json:', error);
  });

// Back to Top Button
// Get the button
const backToTopBtn = document.getElementById('backToTop');

// Show the button when scrolling down
window.onscroll = function() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    backToTopBtn.style.display = "block";
  } else {
    backToTopBtn.style.display = "none";
  }
};

// Scroll to the top when the button is clicked
backToTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});