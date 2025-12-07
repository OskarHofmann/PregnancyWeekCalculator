// Start date (fixed): 02.11.2025
const START_DATE = new Date('2025-11-02');

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
    const fruitEmojiElement = document.getElementById('fruitEmoji');
    const fruitNameElement = document.getElementById('fruitName');
    
    if (currentWeek >= 0) {
        weekElement.textContent = `SSW ${currentWeek}`;
        
        // Update baby size
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
