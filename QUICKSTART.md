# GramSaarthi - Quick Start Guide

Your project has been completely migrated to **Next.js 15 + shadcn/ui**. Everything is consistent and professional!

## 60 Second Setup

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open browser
# Visit http://localhost:3000
```

That's it! Your app is running.

## What's New

### Beautiful Components Everywhere
- All buttons use the same professional style
- All cards have consistent spacing and shadows
- All inputs are styled identically
- All modals use the same design

### No More Inconsistencies
- Before: Buttons were rounded in some places, square in others
- After: All buttons use shadcn/ui with consistent styling

### Modern Stack
- Next.js 15 (App Router)
- Tailwind CSS (responsive, dark mode ready)
- shadcn/ui (professional components)
- TypeScript (type safety)
- Responsive design (mobile-first)

## Project Pages

### Home Page (`/`)
- Hero section with call-to-action
- How it works section
- Features list
- Navigation bar

### Ongoing Schemes (`/schemes/ongoing`)
- Browse active government schemes
- Filter by category
- Apply for schemes
- See benefits and eligibility

### Upcoming Schemes (`/schemes/upcoming`)
- See schemes launching soon
- Set reminders
- Plan ahead

### Dashboard (`/dashboard`)
- View your profile
- Track applications
- See application status
- Statistics

### Navigation (`/`)
- Login/Signup modal
- User menu when logged in
- Responsive mobile menu

## What Changed in Code

### Old (Vite)
```jsx
const styles = {
  button: { backgroundColor: '#10b981', padding: '10px 20px' }
};
<button style={styles.button}>Apply</button>
```

### New (Next.js + shadcn)
```tsx
import { Button } from '@/components/ui/button';
<Button>Apply</Button>
```

Much cleaner!

## Key Features

### Authentication
- Email/password login and signup
- User profile management
- Protected dashboard route
- Automatic logout

### Scheme Management
- Browse all schemes
- Filter by status and category
- Apply for schemes
- Track applications
- See benefit amounts

### Data Persistence
- All data saved in browser localStorage
- Survives page refresh
- No backend needed for demo

## File Locations

```
app/                      # Pages and layouts
  └── page.tsx           # Home page

components/
  ├── navbar.tsx         # Navigation bar
  ├── auth-modal.tsx     # Login/signup form
  └── ui/                # shadcn/ui components
      ├── button.tsx
      ├── card.tsx
      ├── input.tsx
      └── badge.tsx

lib/
  ├── storage.ts         # LocalStorage helper
  ├── data.ts            # Scheme data
  └── utils.ts           # Utilities

public/
  └── hero.jpg           # Hero image
```

## Common Tasks

### Add a New Button
```tsx
import { Button } from '@/components/ui/button';

<Button>Click Me</Button>
<Button variant="outline">Cancel</Button>
<Button size="lg">Large Button</Button>
```

### Add a New Card
```tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### Create a New Page
1. Create folder in `app/` (e.g., `app/contact/`)
2. Create `page.tsx` inside
3. Add `<Navbar />` at top
4. Build your content
5. Access at `http://localhost:3000/contact`

### Add a Form Field
```tsx
import { Input } from '@/components/ui/input';

<div>
  <label>Email</label>
  <Input type="email" placeholder="your@email.com" />
</div>
```

### Show Status Badge
```tsx
import { Badge } from '@/components/ui/badge';

<Badge>Active</Badge>
<Badge variant="secondary">Pending</Badge>
<Badge variant="destructive">Rejected</Badge>
```

## Styling

All styling uses Tailwind CSS classes. No inline styles needed!

```tsx
// Instead of style={{...}}
<div className="flex gap-4 p-6 rounded-lg border">
  <Button>Submit</Button>
</div>
```

### Tailwind Classes Used
- `flex` - Flexbox layout
- `gap-4` - Space between items (4 = 16px)
- `p-6` - Padding (6 = 24px)
- `rounded-lg` - Border radius
- `border` - 1px border
- `text-lg` - Large text
- `font-bold` - Bold text
- `bg-primary` - Primary background color
- `text-white` - White text

Learn more: https://tailwindcss.com

## Data

### Schemes Data
Located in `lib/data.ts`. Contains 10 sample government schemes:
- PM-KISAN (Agriculture)
- Ayushman Bharat (Health)
- MNREGA (Employment)
- Pradhan Mantri Awas Yojana (Housing)
- And 6 more...

To add more schemes, edit `mockSchemes` array in `lib/data.ts`.

### User Storage
Users and applications are saved in browser localStorage under keys:
- `gramsaarthi_user`
- `gramsaarthi_applied_schemes`
- `gramsaarthi_saved_schemes`

View in browser DevTools → Application → Local Storage.

## Deployment

### To Vercel (Easiest)
```bash
git add .
git commit -m "Next.js migration"
git push origin main
# Go to vercel.com and connect your repo
```

Takes 2 minutes, automatic deployments on every push!

### To Other Hosts
```bash
npm run build    # Creates optimized build
npm start        # Runs production server
```

## Troubleshooting

### Port 3000 In Use
```bash
npm run dev -- -p 3001
```

### Components Not Showing
- Clear `.next` folder: `rm -rf .next`
- Restart dev server: `npm run dev`

### Build Fails
- Delete `node_modules`: `rm -rf node_modules`
- Reinstall: `npm install`
- Build again: `npm run build`

### Need Help?
- Check SETUP.md for detailed info
- Check MIGRATION_SUMMARY.md for changes
- shadcn/ui docs: https://ui.shadcn.com
- Next.js docs: https://nextjs.org/docs

## Environment Variables

Not needed for basic setup, but when adding backend:

```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3001
DATABASE_URL=your-database-url
SECRET_KEY=your-secret-key
```

## Next Features to Add

- Real authentication (Supabase/Firebase)
- Backend API integration
- Database storage
- Email notifications
- Advanced filtering
- User favorites
- Application timeline
- Chat support

## Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `npm run dev` |
| Build for prod | `npm run build` |
| Run production | `npm start` |
| Lint code | `npm run lint` |

## That's It!

You now have a modern, professional web app built with the latest technologies. All components are consistent, beautiful, and production-ready.

**Start building!** 🚀

```bash
npm run dev
```

Open http://localhost:3000 and see your beautiful app in action!
