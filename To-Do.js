// Get all the main sections
const mainSections = document.querySelectorAll('.main-section');

// Add click event listener to each expand button
mainSections.forEach(section => {
  const expandBtn = section.querySelector('.expand-button');
  expandBtn.addEventListener('click', () => {
    // Toggle the class 'expanded' on the sub-tasks list
    section.querySelector('.sub-tasks').classList.toggle('expanded');
    // Change the text of the expand button
    expandBtn.textContent = section.querySelector('.sub-tasks').classList.contains('expanded') ? '-' : '+';
  });
});

// Add change event listener to all checkboxes
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    // Get the main section that this checkbox belongs to
    const mainSection = checkbox.closest('.main-section');
    // Get all the checkboxes in the same main section
    const mainSectionCheckboxes = mainSection.querySelectorAll('input[type="checkbox"]');
    // Get the number of checked checkboxes in the main section
    const checkedCount = mainSection.querySelectorAll('input[type="checkbox"]:checked').length;
    // If all the checkboxes in the main section are checked, mark the main section as finished
    mainSection.classList.toggle('finished', checkedCount === mainSectionCheckboxes.length);
    // Check if all the checkboxes in the main section are checked
    const allChecked = Array.from(mainSectionCheckboxes).every(cb => cb.checked);
    // If all the checkboxes in the main section are checked, strikethrough the section title
    const sectionTitle = mainSection.querySelector('h2');
    if (allChecked) {
      sectionTitle.classList.add('strikethrough');
    } else {
      sectionTitle.classList.remove('strikethrough');
    }
    // Check if all the main sections are finished
    const allMainSections = document.querySelectorAll('.main-section');
    const allFinished = Array.from(allMainSections).every(main => main.classList.contains('finished'));
    // If all the main sections are finished, increment the day count and reset all the checkboxes
    if (allFinished) {
      const dayCountEl = document.querySelector('#day-count');
      const currentDayCount = parseInt(dayCountEl.textContent);
      dayCountEl.textContent = currentDayCount + 1;
      // Reset all the checkboxes to unchecked
      checkboxes.forEach(cb => {
        cb.checked = false;
        const mainSection = cb.closest('.main-section');
        mainSection.classList.remove('finished');
        const sectionTitle = mainSection.querySelector('h2');
        sectionTitle.classList.remove('strikethrough');
      });
      // Play superhero animation
const gifContainer = document.createElement('div');
gifContainer.className = 'gif-container';
gifContainer.innerHTML = '<div class="overlay">Day Finished!</div><img src="Superman.gif" alt="Example GIF">';

// Append the container element to the document body
document.body.appendChild(gifContainer);

// Schedule a function to remove the container after 5 seconds
setTimeout(() => {
  gifContainer.remove();
}, 3000);

    }
  });
});

