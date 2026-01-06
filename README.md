# Schwangerschaftswochen-Rechner (Pregnancy Week Calculator)

A Progressive Web App (PWA) to track pregnancy weeks with baby size comparisons.

## Features
- **Private & Secure**: All data stored locally on your device (no personal data in hosted files)
- **User-defined start date**: Enter the first day of your last menstrual period
- **Automatic week calculation**: Shows current pregnancy week in SSW X+Y format (e.g., SSW 9+3)
- **Auto-calculated due date**: Automatically calculated from start date (280-day cycle), but manually editable
- **Baby size comparisons**: Visual fruit/vegetable comparisons for each week with emojis
- **Installable on smartphones**: Works as a native-like app on iOS and Android
- **Works offline**: Fully functional once installed, even without internet
- **Data persistence**: Uses localStorage to save your dates (survives cache clears)

## Files
- `index.html` - Main HTML structure
- `styles.css` - Styling for mobile-optimized interface
- `script.js` - Week calculation logic
- `manifest.json` - PWA manifest for app installation
- `service-worker.js` - Service worker for offline functionality

## How to Use

### Desktop/Testing:
1. Open `index.html` in a web browser
2. Enter the first day of your last menstrual period in the "Startdatum" field
3. The due date will be automatically calculated (but you can edit it if your doctor gave a different date)
4. Current pregnancy week (SSW X+Y) and baby size comparison will display automatically
5. Your dates are saved locally and will persist even if you close the browser

### First-Time Setup:
1. Open the app
2. Enter your last period start date
3. Verify or adjust the calculated due date
4. That's it! The app will now track your pregnancy week and show baby size comparisons

### Install on Smartphone:

#### Android (Chrome):
1. Host the files on a web server (see "Hosting Options" below)
2. Open the URL in Chrome on your Android phone
3. Chrome will show an "Install" prompt at the bottom
4. Tap "Install" or use menu → "Add to Home screen"
5. The app icon will appear on your home screen

#### iOS (Safari):
1. Host the files on a web server
2. Open the URL in Safari on your iPhone
3. Tap the Share button (square with arrow)
4. Scroll down and tap "Add to Home Screen"
5. Name the app and tap "Add"

## Hosting Options

To install the app on your phone, you need to host it on a web server. Here are some free options:

### Option 1: GitHub Pages (Recommended)
1. Create a GitHub repository
2. Upload all files to the repository
3. Go to Settings → Pages
4. Select main branch and save
5. Your app will be available at `https://yourusername.github.io/repositoryname`

### Option 2: Netlify Drop
1. Go to https://app.netlify.com/drop
2. Drag and drop the entire folder
3. Get a free URL instantly

### Option 3: Local Testing with Python
For local testing only (not accessible from phone):
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

## Technical Details

**Data Storage:**
- Start date and due date stored in localStorage (persists across sessions)
- No personal data in the source code or on the hosted website
- Data stays on your device only

**Week Calculation:**
- Calculates full weeks + days since the start date (e.g., SSW 9+3)
- Format: SSW [completed weeks]+[additional days]
- Updates automatically at midnight each day

**Baby Size Comparisons:**
- Shows fruit/vegetable comparisons for weeks 4-42
- Based on standard fetal development measurements
- Includes emoji and size in cm/mm
- Non-breaking spaces prevent awkward line breaks in measurements

**Due Date Calculation:**
- Automatically calculated as start date + 280 days (40 weeks)
- Based on standard Naegele's rule
- Manually editable if your doctor provides a different date

**PWA Features:**
- Offline-capable through service worker caching
- Can be installed on home screen like a native app
- Loads instantly after first visit
- Works independently once installed (but requires hosted URL for installation/updates)

## Browser Support
- Chrome (Android) - Full PWA support
- Safari (iOS) - Full PWA support
- Edge, Firefox - Limited PWA support
