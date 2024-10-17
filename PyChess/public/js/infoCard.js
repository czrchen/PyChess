window.addEventListener('scroll', function() {
    const navCheckbox = document.getElementById('nav_check');
    if (navCheckbox.checked) {
        navCheckbox.checked = false;
    }
});

let infoCard = document.querySelectorAll('.info-description-box .info-description');
let showIndex = document.querySelectorAll('.showIndex .index');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let currentIndex = 0;

// Function to display the current card and hide others
function showCard(index) {
    infoCard.forEach((card, i) => {
        if (i === index) {
            $(card).fadeIn(1000); // Fade in the current card
        } else {
            card.style.display = 'none';
        }
    });

    showIndex.forEach((dot, i) => {
        dot.style.background = (i === index) ? '#ed6161' : '#ffffff';
    });
}

// Move to the next card
function nextCard() {
    currentIndex = (currentIndex - 1 + infoCard.length) % infoCard.length;
    showCard(currentIndex);
}

// Move to the previous card
function prevCard() {
    currentIndex = (currentIndex + 1) % infoCard.length;
    showCard(currentIndex);
}

function initSlider() {
    // Initialize by showing the first card
    showCard(currentIndex);

    // Add event listeners to buttons
    next.addEventListener('click', nextCard);
    prev.addEventListener('click', prevCard);

    // Handle clicking on index dots to jump to the corresponding card
    showIndex.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentIndex = i;
            showCard(currentIndex);
        });
    });
}

// Function to remove slider behavior (for larger screens)
function removeSlider() {
    infoCard.forEach((card) => {
        card.style.display = 'block'; // Show all cards
    });
}

// Handle screen size change with media query
function handleScreenChange(e) {
    if (e.matches) {
        // Screen width is 500px or less, initialize the slider
        initSlider();
    } else {
        // Screen width is greater than 500px, remove the slider
        removeSlider();
    }
}

// Media query to check if the screen width is 500px or less
let mediaQuery = window.matchMedia("(max-width: 600px)");
mediaQuery.addEventListener('change', handleScreenChange);

// Initial check for screen size on page load
handleScreenChange(mediaQuery);