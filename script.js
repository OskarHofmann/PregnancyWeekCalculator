// Start date (fixed): 02.11.2025
const START_DATE = new Date('2025-11-02');

// Function to calculate pregnancy week (rounded up)
function calculateWeek() {
    const today = new Date();
    const diffTime = today - START_DATE;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const weeks = Math.ceil(diffDays / 7);
    return weeks;
}

// Function to update the week display
function updateWeekDisplay() {
    const currentWeek = calculateWeek();
    const weekElement = document.getElementById('currentWeek');
    
    if (currentWeek >= 0) {
        weekElement.textContent = `SSW ${currentWeek}`;
    } else {
        weekElement.textContent = 'Noch nicht begonnen';
    }
}

// Initialize the app
function init() {
    // Update week display on load
    updateWeekDisplay();
    
    // Update week display at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        updateWeekDisplay();
        // Then update every 24 hours
        setInterval(updateWeekDisplay, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
    
    // Optional: Add event listener to due date input
    const dueDateInput = document.getElementById('dueDate');
    dueDateInput.addEventListener('change', (e) => {
        console.log('Geburtstermin geändert zu:', e.target.value);
        // You can add additional logic here if needed
    });
}

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker registriert:', registration.scope);
            })
            .catch(error => {
                console.log('Service Worker Registrierung fehlgeschlagen:', error);
            });
    });
}

// Start the app
init();
