window.addEventListener('DOMContentLoaded', () => {
    // Show the "Introduction" section
    const introductionSection = document.querySelector('#introduction');
    if (introductionSection) {
        introductionSection.style.display = 'block';
    }

    // Select all navigation links
    const navLinks = document.querySelectorAll('.section-nav a');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            // Prevent the default action (scrolling)
            event.preventDefault();

            // Hide all top-level sections
            document.querySelectorAll('.content > section').forEach(section => {
                section.style.display = 'none';
            });

            // Hide all subsections
            document.querySelectorAll('.content section section').forEach(subsection => {
                subsection.style.display = 'none';
            });

            // Show the target section
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.style.display = 'block';

                // If the target section is a subsection, also show the parent section
                if (targetSection.parentElement !== document.querySelector('.content')) {
                    targetSection.parentElement.style.display = 'block';
                }
            }

            // Update the URL in the address bar
            history.pushState(null, '', this.getAttribute('href'));
        });
    });
});