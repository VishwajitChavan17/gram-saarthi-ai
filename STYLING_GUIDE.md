# GramSaarthi Styling Guide

## Global Stylesheet Architecture

The application uses a comprehensive CSS approach with three layers:

1. **Global Styles** (`src/index.css`) - Base CSS variables, resets, typography, and utility classes
2. **Component Styles** - Inline styles defined in component objects (React style objects)
3. **Responsive Styles** - Media queries defined via `<style>` tags within components

## Color Palette

### Primary Colors
- **Primary Blue**: `#1e3a8a` - Used for headers, primary elements, and links
- **Primary Green**: `#10b981` - Used for action buttons, success states, and accents

### Neutral Colors
- **White**: `#ffffff` - Component backgrounds and text
- **Light Gray**: `#f3f4f6` - Page background and secondary sections
- **Medium Gray**: `#6b7280` - Secondary text
- **Dark Gray**: `#1f2937` - Primary text
- **Border Color**: `#e5e7eb` - Form borders and dividers

## Typography

### Font Stack
```
-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif
```

### Font Sizes
- **h1**: 40px (2.5rem) - Page titles
- **h2**: 32px (2rem) - Section titles
- **h3**: 24px (1.5rem) - Subsection titles
- **h4**: 20px (1.25rem) - Card titles
- **Body**: 16px (1rem) - Regular text
- **Small**: 14px (0.875rem) - Secondary text

### Font Weights
- **Regular**: 400
- **Medium**: 500
- **Semibold**: 600
- **Bold**: 700

## Spacing Scale

```
--spacing-xs:  4px
--spacing-sm:  8px
--spacing-md:  16px
--spacing-lg:  24px
--spacing-xl:  32px
--spacing-2xl: 48px
```

## Responsive Breakpoints

```
Mobile:    < 480px
Tablet:    480px - 768px
Desktop:   768px - 1200px
Large:     > 1200px
```

## Component Styling Patterns

### Buttons
All buttons follow this pattern:
```javascript
const styles = {
  button: {
    padding: "14px 20px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#10b981",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "14px",
    transition: "all 0.3s ease"
  }
}
```

### Cards
```javascript
const styles = {
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "24px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease"
  }
}
```

### Forms
```javascript
const styles = {
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    fontSize: "14px",
    fontFamily: "inherit",
    transition: "all 0.3s ease"
  }
}
```

## Image Handling

All images should:
1. Include the `loading="lazy"` attribute for performance
2. Have descriptive alt text
3. Use `objectFit: "cover"` for background images
4. Have appropriate styling:
```javascript
const styles = {
  image: {
    width: "100%",
    height: "auto",
    display: "block",
    borderRadius: "12px"
  }
}
```

## Responsive Design Pattern

Each page that needs responsiveness should:

1. Define responsive styles in a `<style>` tag within the component
2. Use CSS classes for responsive elements
3. Follow mobile-first approach:

```jsx
return (
  <>
    <style>
      {`
        @media (max-width: 768px) {
          .container {
            padding: 20px !important;
          }
        }
        @media (max-width: 480px) {
          .container {
            padding: 16px !important;
          }
        }
      `}
    </style>
    <div className="container" style={styles.container}>
      {/* Content */}
    </div>
  </>
)
```

## Shadows

```
Small:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
Medium: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
Large:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
XL:     0 20px 25px -5px rgba(0, 0, 0, 0.1)
```

## Border Radius

```
sm: 4px
md: 8px
lg: 12px
xl: 16px
```

## CSS Variable Usage

Use CSS variables defined in `index.css` for consistency:

```css
:root {
  --primary-blue: #1e3a8a;
  --primary-green: #10b981;
  --bg-primary: #ffffff;
  --bg-secondary: #f3f4f6;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}
```

## Best Practices

### 1. Component Structure
```jsx
import { useState } from 'react';

const Component = () => {
  const [state, setState] = useState();

  return (
    <>
      <style>{/* Media queries */}</style>
      <div style={styles.container}>
        {/* Content */}
      </div>
    </>
  );
};

const styles = {
  container: {
    // Base styles
  }
};
```

### 2. Accessibility
- Ensure text contrast ratios meet WCAG AA standards
- Use semantic HTML elements
- Include proper alt text for images
- Support keyboard navigation on all interactive elements

### 3. Performance
- Use `loading="lazy"` on images below the fold
- Minimize reflows by batching style changes
- Use CSS classes for responsive queries instead of inline media queries

### 4. Consistency
- Always use the color palette defined above
- Follow the spacing scale consistently
- Use the typography scale for all text
- Apply shadows consistently across components

## Layout Patterns

### Hero Section
```javascript
const styles = {
  heroSection: {
    position: "relative",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  heroImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(30, 58, 138, 0.4)"
  },
  heroContent: {
    position: "relative",
    zIndex: 10,
    textAlign: "center",
    color: "#ffffff"
  }
}
```

### Grid Layout
```javascript
const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "32px"
  }
}
```

### Flex Layout
```javascript
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    justifyContent: "space-between"
  }
}
```

## Testing Responsiveness

Test the application at these breakpoints:
- 320px (Small phone)
- 480px (Large phone)
- 768px (Tablet)
- 1024px (Desktop)
- 1400px (Large desktop)

## Future Improvements

- [ ] Implement CSS-in-JS library for better style management
- [ ] Add dark mode support
- [ ] Create reusable styled component library
- [ ] Implement CSS modules for better encapsulation
- [ ] Add Storybook for component documentation
