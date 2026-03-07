# GramSaarthi - Troubleshooting White Screen Issue

## Quick Fix (Try These First)

### Option 1: Use the Test Component
If you're seeing a completely blank white screen:

1. Open `src/main.jsx`
2. Change this line:
   ```javascript
   import App from './App.jsx'
   ```
   To this:
   ```javascript
   import App from './AppTest.jsx'
   ```
3. Save and check if you see the test page

If the test page appears, then React is working and the issue is in the main App or its dependencies.

### Option 2: Clear Cache and Reinstall
```bash
# Stop the dev server (Ctrl+C)
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Option 3: Check for Build Errors
```bash
npm run build
```
This will show any compilation errors preventing the app from running.

## Detailed Troubleshooting Steps

### Step 1: Open Browser Developer Tools
1. Press **F12** or **Ctrl+Shift+I** (Windows/Linux) / **Cmd+Option+I** (Mac)
2. Click the **Console** tab

### Step 2: Look for These Specific Messages

**Good Sign - You should see:**
```
[v0] main.jsx loading
[v0] Root element: <div id="root"...>
[v0] App wrapper rendering
[v0] AuthProvider initializing
```

**Not seeing these?** → JavaScript might not be loading
- Check the **Network** tab for failed requests
- Look for red X marks on files
- Reload the page and watch the Network tab

### Step 3: Look for Errors

**Red text in console** indicates an error. Common ones:

#### Error: "Cannot find module"
- **Cause:** Missing import or typo in filename
- **Solution:** Check file paths in imports match actual filenames (case-sensitive on Mac/Linux)

#### Error: "useAuth must be used within an AuthProvider"
- **Cause:** AuthContext not wrapping components properly
- **Solution:** This shouldn't happen if App.jsx wraps with <AuthProvider>

#### Error: "localStorage is not defined"
- **Cause:** Trying to access localStorage before page loads
- **Solution:** Already handled in code, but check if browser has localStorage disabled

#### Error: "Cannot read property of undefined"
- **Cause:** Accessing property on null/undefined object
- **Solution:** Check component prop passing and default values

### Step 4: Network Tab Analysis

1. Open **DevTools → Network** tab
2. Reload the page
3. Look at the files that loaded:

**Should load:**
- `main.jsx` or similar (your app bundle)
- `index.css` (the stylesheet)
- `vendor.js` or chunks (dependencies)

**If any are missing or failed (red):**
- Check if the path is correct
- Try clearing npm cache: `npm cache clean --force`
- Rebuild: `rm -rf dist && npm run build`

### Step 5: Check Individual Components

The logging shows which component fails. If logs show:
- `[v0] Home page rendering` ✓ 
- Then it stops...
- **Solution:** Issue is in Home.jsx or its children

### Step 6: Disable CSS to Test

If you think CSS is hiding content:
1. In DevTools Console, run:
   ```javascript
   document.getElementById('root').style.display = 'block';
   document.body.style.display = 'block';
   document.body.style.backgroundColor = 'red'; // To make it visible
   ```
2. If you see red, CSS was hiding it
3. Check z-index, display properties in styles

### Step 7: Check localhost Settings

1. Make sure you're accessing `http://localhost:5173` (or port shown in terminal)
2. **NOT** `https://localhost:5173` (https causes issues)
3. Try `http://127.0.0.1:5173` instead of `localhost`

## File-by-File Checklist

Check that all these files exist and have no syntax errors:

```
src/
├── main.jsx ................... Must import './index.css' and App
├── App.jsx .................... Must have AuthProvider wrapper
├── index.css .................. Global styles
├── context/AuthContext.jsx .... Auth management
├── components/
│   ├── Navbar.jsx ............. Top navigation
│   ├── InputForm.jsx .......... Eligibility form
│   ├── SchemeCard.jsx ......... Scheme display
│   └── AuthModal.jsx .......... (inline in Navbar)
├── pages/
│   ├── Home.jsx ............... Main page
│   ├── Dashboard.jsx .......... User profile
│   ├── Results.jsx ............ Scheme results
│   ├── UpcomingSchemes.jsx .... New schemes
│   ├── OngoingSchemes.jsx ..... Active schemes
│   └── MyApplications.jsx ..... User applications
└── utils/
    └── StorageService.js ...... Local storage management
```

## Common Error Solutions

### "Module not found" Error
**Check:**
1. File path spelling (especially case sensitivity)
2. File extension (.jsx vs .js)
3. Relative path correctness (../ for parent directories)

**Example fix:**
```javascript
// ❌ Wrong
import AuthContext from './AuthContext';

// ✅ Correct  
import { AuthProvider, useAuth } from './context/AuthContext';
```

### "Cannot read property of undefined"
**Check:**
1. Component props are being passed correctly
2. useState hooks are initialized with defaults
3. Conditional rendering checks before accessing properties

**Example fix:**
```javascript
// ❌ Wrong
const name = user.name; // user might be null

// ✅ Correct
const name = user?.name || 'Guest';
```

### App Shows But No Content
**Check:**
1. Container divs have `display`, `width`, `height` styles
2. Colors aren't white text on white background
3. Components are returning JSX, not null/undefined

### CSS Not Applying
**Check:**
1. `import './index.css'` is at top of main.jsx
2. CSS file has no syntax errors (check Network tab)
3. No inline styles overriding CSS
4. Browser cache cleared (Ctrl+Shift+Delete)

## Nuclear Option: Start Minimal

If nothing works, go back to basics:

1. Temporarily replace `src/App.jsx` with:
```jsx
export default function App() {
  return <div style={{backgroundColor: 'red', height: '100vh'}}>HELLO</div>;
}
```

2. If you see red "HELLO", React works
3. Gradually add components back one by one to find the breaking point

## Getting Help

If still stuck, provide these details:

1. **Full console output** (copy all logs including [v0] messages)
2. **Browser & version** (Chrome 120, Firefox 121, etc.)
3. **Operating system** (Windows, Mac, Linux)
4. **Node version** (run: `node --version`)
5. **Package versions** (run: `npm list react react-dom`)
6. **Any error messages** (exact text)
7. **When it started** (after which change, or fresh install?)

## Prevention Tips

- Always check console after code changes
- Test components in isolation before integrating
- Use descriptive console.log messages
- Keep dependencies updated: `npm update`
- Don't ignore warning messages
- Use VSCode/IDE error highlighting

---

**Still stuck?** The test component (`src/AppTest.jsx`) proves React works. If it displays, gradually replace imports to find the exact failing component.
