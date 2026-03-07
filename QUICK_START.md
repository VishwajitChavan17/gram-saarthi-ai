# GramSaarthi - Quick Start Guide

## Installation & Running

### Prerequisites
- **Node.js**: Version 16 or higher
- **npm**: Version 8 or higher
- A modern web browser (Chrome, Firefox, Safari, or Edge)

### Step 1: Install Dependencies
```bash
npm install
```
This will install all required packages from `package.json`.

### Step 2: Start Development Server
```bash
npm run dev
```

You should see output like:
```
  VITE v4.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Step 3: Open in Browser
Click the link or manually go to: **http://localhost:5173/**

## If You See a Blank White Screen

### Quick Diagnostics

1. **Check Browser Console** (Press F12)
   - Look for red error messages
   - Screenshots of errors help troubleshooting

2. **Try the Test Component**
   - Open `src/main.jsx`
   - Change line 5 from:
     ```javascript
     import App from './App.jsx'
     ```
     To:
     ```javascript
     import App from './AppTest.jsx'
     ```
   - Save (hot reload should happen automatically)
   - If you see a test page, React is working

3. **Try These Commands**
   ```bash
   # Clean and reinstall
   rm -rf node_modules package-lock.json
   npm install
   npm run dev
   
   # Or if that doesn't work
   npm cache clean --force
   npm install
   npm run dev
   ```

### Still Not Working?

See **TROUBLESHOOTING.md** for detailed solutions.

## First Time Using the App

### Without Login (Demo Mode)
1. You should see the home page immediately
2. The page shows:
   - Hero section with farmer image
   - "How It Works" steps
   - "Why Choose GramSaarthi" benefits
3. Scroll down and click **"Start Checking Eligibility"** button

### With Login (Optional)
1. Click **"Sign Up"** button (top right)
2. Enter email, password, and name
3. Click "Create Account"
4. You'll see dashboard with:
   - Your profile info
   - Application statistics
   - Recent applications
5. Navigate using menu: Dashboard, Upcoming Schemes, Ongoing Schemes

### Checking Eligibility
1. Fill the form with your details:
   - Age (18-80)
   - Occupation (Farmer, Worker, Student, etc.)
   - Income (in rupees)
   - State (Choose from list)
   - Language preference
2. Click "Submit"
3. Wait for analysis (takes ~1.5 seconds)
4. See recommended schemes you're eligible for
5. Click "Apply Now" to apply for schemes

## File Structure Overview

```
GramSaarthi/
├── src/
│   ├── main.jsx              ← App entry point
│   ├── App.jsx               ← Main application
│   ├── index.css             ← Global styles
│   ├── AppTest.jsx           ← Test component (if main fails)
│   ├── components/           ← Reusable components
│   │   ├── Navbar.jsx
│   │   ├── InputForm.jsx
│   │   └── SchemeCard.jsx
│   ├── pages/                ← Full page components
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Results.jsx
│   │   └── ...
│   ├── context/              ← State management
│   │   └── AuthContext.jsx
│   ├── utils/                ← Helper functions
│   │   └── StorageService.js
│   └── data/                 ← Mock data
│       └── mockData.js
├── index.html                ← HTML template
├── package.json              ← Dependencies
└── vite.config.js            ← Build configuration
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code (if configured)
npm run lint
```

## Data Storage

All user data is stored locally in your browser:
- User accounts (email, name)
- Eligibility answers
- Applied schemes
- Saved favorites

**No data is sent to a server** - it's all local.

### Clear All Data
If you want to reset:
```javascript
// In browser console (F12 → Console tab):
localStorage.clear()
```
Then refresh the page.

## Color Theme

The app uses a consistent color scheme:
- **Primary Blue**: `#1e3a8a` (headings, links, primary actions)
- **Green Accent**: `#10b981` (buttons, highlights, success)
- **Light Gray**: `#f3f4f6` (backgrounds)
- **Dark Gray**: `#6b7280` (secondary text)

## Browser Compatibility

Works best on:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Mobile Support

- ✅ Fully responsive on mobile (tested on 375px width)
- ✅ Touch-friendly buttons and forms
- ✅ Optimized for small screens

## Features Included

- [x] User authentication (local, no backend)
- [x] Eligibility form
- [x] Scheme recommendations
- [x] Scheme filtering by category
- [x] Application tracking
- [x] User dashboard
- [x] Responsive design
- [x] Local data persistence
- [x] Accessibility support

## Keyboard Shortcuts

- **Tab**: Navigate between form fields
- **Enter**: Submit forms
- **Esc**: Close modals/dropdowns
- **F12**: Open developer console

## Getting Help

1. **First check**: TROUBLESHOOTING.md
2. **For styling issues**: STYLING_CHECKLIST.md
3. **For features**: README.md
4. **For implementation details**: IMPLEMENTATION_GUIDE.md

## Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Blank white screen | See TROUBLESHOOTING.md |
| Styles not loading | Check Network tab (F12), clear cache |
| Can't save data | Check if localStorage is enabled |
| Login not working | Refresh page, clear localStorage |
| Images not showing | Check if image files exist in `public/` |

## What to Do Next

1. **Explore the app** - Sign up, fill eligibility form, apply for schemes
2. **Customize** - Edit mockData.js to add your own schemes
3. **Style** - Modify index.css to change colors and fonts
4. **Integrate** - Connect to a real backend API
5. **Deploy** - Use `npm run build` then deploy the `dist/` folder

## Questions?

Refer to the documentation files in the project:
- **README.md** - Complete feature overview
- **TROUBLESHOOTING.md** - Problem solving
- **STYLING_GUIDE.md** - Design system
- **IMPLEMENTATION_GUIDE.md** - Technical details
