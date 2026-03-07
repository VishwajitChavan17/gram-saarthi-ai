# GramSaarthi - Government Scheme Eligibility Assistant

An AI-powered civic assistant helping rural citizens discover government schemes they are eligible for. Built with React + Vite, featuring user authentication, persistent data storage, and comprehensive scheme management.

## Features

### User Authentication & Profiles
- Sign up and login functionality with local storage persistence
- User profile management with editable information
- Personalized dashboards with application statistics
- Session persistence across browser refreshes

### Scheme Discovery & Management
- **Eligibility Checker**: Interactive form to determine government scheme eligibility
- **Upcoming Schemes**: Browse new schemes coming soon with filter by category
- **Ongoing Schemes**: Explore active schemes with apply functionality
- **Saved Schemes**: Save favorite schemes for later review
- **Application Tracking**: Monitor status of applied schemes (pending/approved/rejected)

### Persistent Data Storage
- User credentials and profile data stored locally
- Eligibility data automatically saved and pre-populated
- Application history with status tracking
- Saved schemes collection

### Responsive Design
- Mobile-first design approach
- Works seamlessly on desktop, tablet, and mobile devices
- Optimized layout and typography for all screen sizes

### Comprehensive UI/UX
- Professional navigation bar with user menu
- Beautiful hero sections with engaging imagery
- Organized scheme cards with eligibility badges
- Status tracking with visual indicators
- Category-based filtering and search

## Project Structure

```
src/
├── components/
│   ├── AuthModal.jsx         # Login/signup modal
│   ├── InputForm.jsx         # Eligibility form with persistence
│   ├── Navbar.jsx            # Navigation with user menu
│   └── SchemeCard.jsx        # Scheme card with apply functionality
├── context/
│   └── AuthContext.jsx       # Auth state management
├── data/
│   └── mockData.js           # Scheme database and helpers
├── pages/
│   ├── Home.jsx              # Landing page with hero section
│   ├── Dashboard.jsx         # User profile and stats
│   ├── UpcomingSchemes.jsx  # Upcoming schemes list
│   ├── OngoingSchemes.jsx   # Active schemes list
│   ├── MyApplications.jsx   # Application tracking
│   └── Results.jsx           # Eligibility results
├── utils/
│   └── StorageService.js     # LocalStorage management
├── App.jsx                   # Main app with routing
└── main.jsx                  # Entry point

public/
├── hero.jpg                  # Hero section image
├── eligibility.jpg          # Eligibility form image
└── success.jpg              # Success banner image
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app in development mode.

### Build

```bash
npm run build
```

## Usage

### For New Users
1. Click "Sign Up" in the navbar
2. Create account with email and password
3. Fill the eligibility form with your details
4. View recommended schemes

### For Returning Users
1. Click "Login" to access your account
2. Your previous data is automatically loaded
3. Access dashboard to view profile and application status

### Managing Schemes
- **Save Schemes**: Click the heart icon to save schemes
- **Apply for Schemes**: Click "Apply Now" on ongoing schemes
- **Track Applications**: View status in "My Applications" page
- **Filter Schemes**: Use category filters to narrow down options

## Technology Stack

- **React 18**: UI library with hooks
- **Vite**: Fast build tool and dev server
- **Context API**: State management
- **LocalStorage**: Data persistence
- **CSS-in-JS**: Inline styles for component styling

## Authentication System

The app implements a dummy authentication system for demonstration:
- User credentials are stored in localStorage
- Session persists across browser refreshes
- Profile data can be edited and saved
- Logout clears user session

**Note**: This is a demo system. In production, implement proper backend authentication with secure password hashing and token management.

## Data Persistence

All user data is stored in browser localStorage:
- `gramsaarthi_user`: User account information
- `gramsaarthi_user_profile`: Extended user profile
- `gramsaarthi_eligibility_data`: Eligibility form responses
- `gramsaarthi_saved_schemes`: Favorited schemes
- `gramsaarthi_applied_schemes`: Application history

## Design Features

- **Color Scheme**: Deep blue (#1e3a8a) with green accents (#10b981)
- **Typography**: System fonts for optimal performance
- **Spacing**: Consistent 8px grid system
- **Responsive**: Mobile-first approach with adaptive layouts
- **Accessibility**: Semantic HTML and ARIA attributes

## Scheme Categories

The app includes schemes across multiple categories:
- Agriculture
- Health
- Employment
- Housing
- Pension
- Education & Savings
- Business
- Social Security
- Utilities

## Future Enhancements

- Backend API integration for real scheme data
- SMS/Email notifications for application status
- Advanced filtering and search
- Multi-language support
- Real authentication with secure passwords
- Payment gateway for scheme applications
- Admin dashboard for scheme management

## License

MIT

## Support

For issues or questions, please contact the development team.
