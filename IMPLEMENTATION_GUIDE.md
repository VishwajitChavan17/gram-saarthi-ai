# GramSaarthi Implementation Guide

## Overview
This document provides a comprehensive guide to the GramSaarthi web application - a government scheme eligibility assistant with user authentication, persistent data storage, and scheme management capabilities.

## Architecture

### State Management
- **AuthContext**: Manages user authentication state and login/logout
- **StorageService**: Handles all localStorage operations for data persistence
- **Component State**: Individual components manage their UI state

### Data Flow
```
User Interaction → Component State → StorageService (localStorage)
                                  ↓
                           Persisted Data
```

## Key Features Implementation

### 1. Authentication System
- **Location**: `src/context/AuthContext.jsx`, `src/components/Navbar.jsx`
- **Functionality**: 
  - Dummy authentication (demo purposes)
  - User session persistence
  - Login/Signup modal integration
  - User profile management

**How it Works**:
```javascript
// Users can sign up with email/password
// Sessions are stored in localStorage
// AuthContext provides useAuth hook for components
const { user, login, signup, logout } = useAuth();
```

### 2. Persistent Data Storage
- **Location**: `src/utils/StorageService.js`
- **Stored Data**:
  - User credentials
  - User profile information
  - Eligibility form data
  - Saved schemes (favorites)
  - Applied schemes history

**Storage Keys**:
- `gramsaarthi_user`: User account info
- `gramsaarthi_user_profile`: Extended profile
- `gramsaarthi_eligibility_data`: Eligibility responses
- `gramsaarthi_saved_schemes`: Favorited schemes
- `gramsaarthi_applied_schemes`: Applications history

### 3. Navigation System
- **Location**: `src/components/Navbar.jsx`, `src/App.jsx`
- **Features**:
  - Logo click redirects to home
  - Navigation links appear only for logged-in users
  - User menu with profile/applications/logout
  - Auth modal for login/signup
  - Responsive mobile menu

**Navigation Routes**:
- `/` - Home page (eligibility checker)
- `/dashboard` - User profile and statistics
- `/upcoming-schemes` - Browse upcoming schemes
- `/ongoing-schemes` - Browse active schemes
- `/my-applications` - Track applications

### 4. Scheme Management
- **Location**: `src/data/mockData.js`, `src/pages/*.jsx`
- **Features**:
  - 10 government schemes with detailed information
  - Categorization (Agriculture, Health, Employment, etc.)
  - Status tracking (Upcoming/Ongoing)
  - Save/Apply functionality

**Scheme Data Structure**:
```javascript
{
  id: '1',
  name: "PM-KISAN",
  category: "Agriculture",
  status: "ongoing",
  benefits: "₹6000 per year financial support",
  eligibility: [Array of criteria],
  applicationDeadline: "2025-12-31",
  startDate: "2019-02-01"
}
```

### 5. Pages & Components

#### Home Page (`src/pages/Home.jsx`)
- Hero section with background image
- How It Works section (3 steps)
- Benefits/Why Choose GramSaarthi section
- Links to eligibility checker

#### Eligibility Form (`src/components/InputForm.jsx`)
- Auto-populated from localStorage
- Fields: Age, Occupation, Income, State, Language
- Submits to Results page

#### Results Page (`src/pages/Results.jsx`)
- Displays eligible schemes
- Success banner with image
- Scheme cards with Apply buttons

#### Dashboard (`src/pages/Dashboard.jsx`)
- User profile with avatar
- Editable profile fields
- Statistics cards (applications, saved schemes)
- Eligibility profile display
- Recent applications list

#### Upcoming Schemes (`src/pages/UpcomingSchemes.jsx`)
- Browse schemes coming soon
- Category filtering
- Save scheme functionality
- Details for each scheme

#### Ongoing Schemes (`src/pages/OngoingSchemes.jsx`)
- Browse active schemes
- Apply for schemes
- Save schemes
- Track application status
- Filter and search

#### My Applications (`src/pages/MyApplications.jsx`)
- View all applications
- Update application status
- Remove applications
- Application timeline

### 6. Design & Styling

#### Color Palette
- **Primary**: Deep Blue (#1e3a8a) - Authority, trust
- **Accent**: Green (#10b981) - Action, success, growth
- **Neutral**: Grays (#6b7280, #9ca3af) - Text, secondary info
- **Background**: Light Gray (#f3f4f6) - Page background

#### Typography
- **Font Family**: System fonts for performance
- **Font Sizes**: Hierarchical from 12px to 48px
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

#### Responsive Design
- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**:
  - Mobile: < 480px
  - Tablet: 481px - 768px
  - Desktop: > 769px

#### Images
- **Hero Image**: `public/hero.jpg` - Farmer with smartphone
- **Eligibility Image**: `public/eligibility.jpg` - Person with form
- **Success Image**: `public/success.jpg` - Celebration

### 7. User Flows

#### New User Flow
1. Land on Home page
2. Click "Start Checking Eligibility"
3. Fill eligibility form
4. View results with eligible schemes
5. Can apply without login (basic)
6. Sign up to save progress

#### Returning User Flow
1. Login with email/password
2. See saved profile data pre-filled
3. Access Dashboard
4. Browse schemes (Upcoming/Ongoing)
5. Apply for schemes
6. Track applications in My Applications

#### Application Flow
1. Browse ongoing schemes
2. Click "Apply Now" on desired scheme
3. Application saved to localStorage
4. Track status in My Applications
5. Can update status (for demo)

## Code Organization

### Component Structure
```
App.jsx (Main app with routing)
├── AuthProvider (Auth context wrapper)
├── Navbar (Navigation & Auth)
├── Pages (Based on currentPage state)
│   ├── Home
│   ├── Dashboard
│   ├── UpcomingSchemes
│   ├── OngoingSchemes
│   ├── MyApplications
│   └── Results
└── Shared Components
    ├── InputForm
    ├── SchemeCard
    └── AuthModal (in Navbar)
```

### File Naming Conventions
- **Pages**: PascalCase.jsx (e.g., Dashboard.jsx)
- **Components**: PascalCase.jsx (e.g., Navbar.jsx)
- **Utils**: camelCase.js (e.g., StorageService.js)
- **Context**: camelCase.jsx (e.g., AuthContext.jsx)

## Development Guide

### Adding a New Scheme
```javascript
// In src/data/mockData.js
{
  id: '11',
  name: "New Scheme Name",
  category: "Category",
  status: "ongoing",
  benefits: "Benefits description",
  description: "Full description",
  eligibility: ["Criteria 1", "Criteria 2"],
  applicationDeadline: "2025-12-31",
  startDate: "2024-01-01",
  link: "#"
}
```

### Adding a New Page
1. Create `src/pages/NewPage.jsx`
2. Import in `App.jsx`
3. Add route in `renderContent()` function
4. Add navigation in `Navbar.jsx`

### Modifying Styles
- All styles are inline (CSS-in-JS)
- Update style objects at bottom of components
- Use consistent colors from palette
- Maintain responsive design with flexbox/grid

### Using StorageService
```javascript
import StorageService from '../utils/StorageService';

// Get user
const user = StorageService.getUser();

// Set data
StorageService.setUserProfile(profileData);

// Check saved schemes
const isSaved = StorageService.isSchemeSaved(schemeId);

// Add application
StorageService.addAppliedScheme(schemeId, { status: 'pending' });
```

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ JavaScript support required
- LocalStorage support required
- Mobile browsers supported

## Performance Considerations
- Component-level styling (no external CSS)
- Minimal dependencies (React + Vite)
- LocalStorage for instant data retrieval
- Responsive images with proper sizing
- No image optimization yet (can be enhanced)

## Security Notes
- **Current**: Demo authentication (no real security)
- **Production TODO**:
  - Implement backend authentication
  - Use secure password hashing (bcrypt)
  - Add HTTPS/SSL
  - Implement token-based auth
  - Sanitize user inputs
  - Add rate limiting

## Future Enhancement Ideas
1. Backend API for real scheme data
2. Multi-language support (Hindi, Regional languages)
3. SMS/Email notifications
4. Payment integration for scheme applications
5. Admin dashboard
6. Advanced analytics
7. Accessibility improvements (WCAG compliance)
8. PWA support for offline access
9. Search functionality
10. Scheme recommendations based on ML

## Troubleshooting

### Data Not Persisting
- Check browser's LocalStorage is enabled
- Verify StorageService methods are called
- Check browser console for errors

### Navigation Not Working
- Ensure Navbar is properly updated page state
- Check currentPage prop in App.jsx
- Verify all pages are imported

### Images Not Loading
- Verify images exist in `public/` folder
- Check image paths in components
- Use relative paths starting with `/`

## Testing Credentials
Since this is a demo with dummy auth:
- Email: any email format (e.g., user@example.com)
- Password: any password (e.g., password123)
- Will create account on first signup

## Deployment
1. Run `npm run build`
2. Deploy `dist/` folder to hosting
3. Ensure server serves index.html for all routes
4. LocalStorage will work on client-side

---

**Last Updated**: March 2025
**Version**: 1.0.0
