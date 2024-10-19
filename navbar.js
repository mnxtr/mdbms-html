// Select the hamburger and the nav links
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

// Toggle the "active" class for nav-links and "toggle" class for hamburger
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});
