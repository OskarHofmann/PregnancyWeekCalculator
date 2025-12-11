// Get start date from localStorage or use default
function getStartDate() {
    const saved = localStorage.getItem('pregnancyStartDate');
    if (saved) {
        return new Date(saved);
    }
    // Default date if not set (will prompt user to set it)
    return null;
}

// Baby size comparison data (week -> fruit/veggie)
const BABY_SIZES = {
    4: { emoji: '🫘', name: 'Mohnsamen', size: '2 mm' },
    5: { emoji: '🌱', name: 'Sesamkorn', size: '2 mm' },
    6: { emoji: '🫘', name: 'Linse', size: '4 mm' },
    7: { emoji: '🫐', name: 'Heidelbeere', size: '1 cm' },
    8: { emoji: '🫘', name: 'Kidneybohne', size: '1,6 cm' },
    9: { emoji: '🍇', name: 'Weintraube', size: '2,3 cm' },
    10: { emoji: '🫒', name: 'Olive', size: '3 cm' },
    11: { emoji: '🍓', name: 'Erdbeere', size: '4 cm' },
    12: { emoji: '🥜', name: 'Pflaume', size: '5 cm' },
    13: { emoji: '🍋', name: 'Zitrone', size: '7 cm' },
    14: { emoji: '🥝', name: 'Kiwi', size: '8,5 cm' },
    15: { emoji: '🍎', name: 'Apfel', size: '10 cm' },
    16: { emoji: '🥑', name: 'Avocado', size: '11,5 cm' },
    17: { emoji: '🍐', name: 'Birne', size: '13 cm' },
    18: { emoji: '🫑', name: 'Paprika', size: '14 cm' },
    19: { emoji: '🍅', name: 'Tomate', size: '15 cm' },
    20: { emoji: '🍌', name: 'Banane', size: '16,5 cm' },
    21: { emoji: '🥕', name: 'Karotte', size: '18 cm' },
    22: { emoji: '🥭', name: 'Mango', size: '19 cm' },
    23: { emoji: '🍆', name: 'Aubergine', size: '20 cm' },
    24: { emoji: '🌽', name: 'Maiskolben', size: '21 cm' },
    25: { emoji: '🥒', name: 'Gurke', size: '22 cm' },
    26: { emoji: '🥬', name: 'Lauch', size: '23 cm' },
    27: { emoji: '🥦', name: 'Blumenkohl', size: '24 cm' },
    28: { emoji: '🥥', name: 'Kokosnuss', size: '25 cm' },
    29: { emoji: '🍈', name: 'Honigmelone', size: '26 cm' },
    30: { emoji: '🥬', name: 'Weißkohl', size: '27 cm' },
    31: { emoji: '🥥', name: 'Große Kokosnuss', size: '28 cm' },
    32: { emoji: '🍍', name: 'Ananas', size: '29 cm' },
    33: { emoji: '🎃', name: 'Hokkaido-Kürbis', size: '30 cm' },
    34: { emoji: '🍈', name: 'Cantaloupe-Melone', size: '32 cm' },
    35: { emoji: '🍉', name: 'Kleine Wassermelone', size: '33 cm' },
    36: { emoji: '🎃', name: 'Kürbis', size: '34 cm' },
    37: { emoji: '🍉', name: 'Wassermelone', size: '35 cm' },
    38: { emoji: '🎃', name: 'Großer Kürbis', size: '36 cm' },
    39: { emoji: '🍉', name: 'Große Wassermelone', size: '37 cm' },
    40: { emoji: '🎃', name: 'Riesenkürbis', size: '38 cm' },
    41: { emoji: '🍉', name: 'Riesenmelone', size: '39 cm' },
    42: { emoji: '🎃', name: 'XXL-Kürbis', size: '40 cm' }
};

// Function to calculate pregnancy week and days
function calculateWeek() {
    const startDate = getStartDate();
    if (!startDate) return null;
    
    const today = new Date();
    const diffTime = today - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);
    const days = diffDays % 7;
    return { weeks, days, totalWeeks: weeks };
}

// Function to update the week display
function updateWeekDisplay() {
    const weekData = calculateWeek();
    const weekElement = document.getElementById('currentWeek');
    const fruitEmojiElement = document.getElementById('fruitEmoji');
    const fruitNameElement = document.getElementById('fruitName');
    
    if (weekData === null) {
        weekElement.textContent = 'Bitte Startdatum eingeben';
        fruitEmojiElement.textContent = '📅';
        fruitNameElement.textContent = 'Datum erforderlich';
    } else if (weekData.weeks >= 0) {
        weekElement.textContent = `SSW ${weekData.weeks}+${weekData.days}`;
        
        // Update baby size based on full weeks
        const currentWeek = weekData.totalWeeks;
        const sizeData = BABY_SIZES[currentWeek];
        if (sizeData) {
            fruitEmojiElement.textContent = sizeData.emoji;
            fruitNameElement.textContent = `${sizeData.name} (${sizeData.size})`;
        } else if (currentWeek < 4) {
            fruitEmojiElement.textContent = '🔬';
            fruitNameElement.textContent = 'Noch zu klein';
        } else {
            fruitEmojiElement.textContent = '👶';
            fruitNameElement.textContent = 'Bereit zur Geburt!';
        }
    } else {
        weekElement.textContent = 'Noch nicht begonnen';
        fruitEmojiElement.textContent = '🤰';
        fruitNameElement.textContent = '-';
    }
}

// Initialize the app
function init() {
    const startDateInput = document.getElementById('startDate');
    const dueDateInput = document.getElementById('dueDate');
    
    // Load saved dates from localStorage
    const savedStartDate = localStorage.getItem('pregnancyStartDate');
    if (savedStartDate) {
        startDateInput.value = savedStartDate;
    }
    
    const savedDueDate = localStorage.getItem('pregnancyDueDate');
    if (savedDueDate) {
        dueDateInput.value = savedDueDate;
    } else {
        dueDateInput.value = '2026-08-09'; // Default
    }
    
    // Update week display on load
    updateWeekDisplay();
    
    // Save start date when changed
    startDateInput.addEventListener('change', (e) => {
        if (e.target.value) {
            localStorage.setItem('pregnancyStartDate', e.target.value);
            updateWeekDisplay();
        }
    });
    
    // Save due date when changed
    dueDateInput.addEventListener('change', (e) => {
        if (e.target.value) {
            localStorage.setItem('pregnancyDueDate', e.target.value);
        }
    });
    
    // Update week display at midnight
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow - now;
    
    setTimeout(() => {
        updateWeekDisplay();
        // Then update every 24 hours
        setInterval(updateWeekDisplay, 24 * 60 * 60 * 1000);
    }, timeUntilMidnight);
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
