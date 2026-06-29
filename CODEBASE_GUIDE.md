# AgriConnect Frontend - Complete Codebase Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## App Architecture

### Authentication Flow
```
LoginPage
  ↓
authService.ts (API call)
  ↓
Redux authSlice (store JWT)
  ↓
Axios interceptor (adds token to requests)
  ↓
useAuth hook (provides user context)
  ↓
ProtectedRoute (checks role & permissions)
  ↓
Dashboard/Protected Pages
```

### State Management
```
Redux Store
├── auth (user, role, permissions)
├── jobs (job listings, filters)
├── workers (worker profiles)
├── companies (company info)
└── applications (job applications)

↓ (with useAppSelector/useAppDispatch)

Page Components
├── Dashboards
├── Listing Pages
└── Detail Pages
```

### Component Hierarchy
```
App.tsx (root routing)
├── Routes (lazy-loaded)
│   ├── Public Pages
│   │   ├── HomePage
│   │   ├── LoginPage
│   │   ├── RegisterPage
│   │   └── WelcomePage
│   ├── Protected Pages
│   │   ├── WorkerDashboard
│   │   ├── CompanyDashboard
│   │   ├── AdminDashboard
│   │   ├── ProfilePage
│   │   ├── JobListingPage
│   │   └── JobDetailPage
│   └── Layout (wrapper)
│       ├── Header
│       ├── Sidebar (on some routes)
│       ├── Main Content
│       └── Footer
└── Providers
    ├── Redux Provider
    ├── Theme Provider
    ├── Language Provider
    └── Toast Provider
```

## Key Files & Their Purpose

### Pages (src/pages)

| File | Purpose | Features |
|------|---------|----------|
| HomePage.tsx | Landing page | Hero, features, testimonials, CTA |
| LoginPage.tsx | User authentication | Modern form, animations, demo credentials |
| WorkerDashboard.tsx | Worker view | Gradient stat cards, applications tracking |
| CompanyDashboard.tsx | Company view | Job management, application stats |
| AdminDashboard.tsx | Admin view | System health, monitoring, analytics |
| JobListingPage.tsx | Job search | Filters, grid cards, responsive design |
| ProfilePage.tsx | User profile | Edit user info, preferences |

### Components (src/components)

| File | Purpose |
|------|---------|
| Layout.tsx | Main layout wrapper |
| Header.tsx | Navigation header |
| ProtectedRoute.tsx | Auth guard for routes |
| common/Input.tsx | Form input field |
| common/PasswordField.tsx | Secure password input |
| common/PrimaryButton.tsx | Primary CTA button |
| common/Toast.tsx | Notification toasts |

### Redux (src/store)

| File | State |
|------|-------|
| authSlice.ts | User auth, role, permissions |
| jobsSlice.ts | Job listings, filters |
| workersSlice.ts | Worker profiles, search |
| companiesSlice.ts | Company information |
| applicationsSlice.ts | Job applications |

### API & Services (src/api, src/services)

| File | Purpose |
|------|---------|
| axios.ts | HTTP client with JWT interceptor |
| authService.ts | Auth API (login, register, logout) |
| apiService.ts | Generic API calls |
| mockData.ts | Development mock data |

### Hooks (src/hooks)

| Hook | Purpose |
|------|---------|
| useAuth() | Auth state & methods |
| useJobs() | Job filtering & fetching |
| useWorkers() | Worker data management |

## Design System

### Color Palette
- Primary: Green (#10b981)
- Secondary: Blue (#3b82f6)
- Accents: Gradients (Blue→Purple, Green→Teal, etc)
- Neutrals: Slate/Gray for text and backgrounds
- Dark Mode: Slate-900/950 backgrounds

### Typography
- Headings: Bold, sizes 2xl-4xl
- Body: Regular, size base (16px)
- Labels: Semibold, size sm
- Line height: 1.5-1.6 for readability

### Spacing Scale (Tailwind)
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px
- 2xl: 48px

### Component Patterns
- Gradient stat cards with hover effects
- Animated list items with stagger effect
- Smooth page transitions with Framer Motion
- Responsive grids (1→2→4 columns)
- Dark mode support throughout

## Performance Optimizations

### Code Splitting
```
Main Bundle: 118KB (gzipped)
Chunks:
- vendor-react: 177KB
- vendor-ui: 136KB
- pages-auth: 68.5KB
- pages-dashboard: 19.86KB
- pages-jobs: 16.78KB
```

### Lazy Loading
- Route-based code splitting
- React.lazy() for pages
- Suspense boundaries with loading states
- Icon lazy loading with Lucide React

### Build Optimizations
- Terser minification
- Drop console in production
- Tree-shaking unused code
- Image optimization

## Common Tasks

### Add a New Page
1. Create file in `src/pages/NewPage.tsx`
2. Add route in `App.tsx` with React.lazy()
3. Wrap with Suspense boundary
4. Add to protected routes if needed

### Add Redux State
1. Create slice in `src/store/slices/newSlice.ts`
2. Add to store configuration
3. Use `useAppSelector` in components
4. Dispatch actions via `useAppDispatch`

### Add API Call
1. Add method to `src/services/apiService.ts`
2. Handle JWT in `src/api/axios.ts` interceptor
3. Use in hook or component
4. Add error handling & loading states

### Style Components
1. Use Tailwind utility classes
2. Apply dark mode variants: `dark:bg-slate-800`
3. Use semantic tokens: `bg-background`, `text-foreground`
4. Responsive: `md:`, `lg:` prefixes

### Add Animation
1. Import `motion` from 'framer-motion'
2. Use motion components: `motion.div`
3. Define animation variants
4. Apply with `initial`, `animate`, `transition`

## Development Best Practices

### Code Organization
- One component per file
- Keep files under 500 lines
- Extract complex logic to hooks
- Use semantic naming

### State Management
- Keep Redux for global state
- Use Context for theme/language
- Use local state for form inputs
- Avoid prop drilling with proper state placement

### Performance
- Lazy load routes
- Memoize expensive computations
- Use useCallback for event handlers
- Split large components

### Accessibility
- Use semantic HTML
- Add alt text to images
- Label form inputs
- Use proper ARIA attributes
- Ensure color contrast

## Git Workflow

```bash
# Feature branch
git checkout -b feature/new-feature

# Make changes
git add .
git commit -m "feat: description"

# Push and create PR
git push origin feature/new-feature
```

## Troubleshooting

### Port Already in Use
```bash
# Change port in vite.config.ts or
lsof -i :3002  # Find process
kill -9 <PID>  # Kill process
```

### Module Not Found
- Check import paths
- Verify file extensions (.ts, .tsx)
- Rebuild if using path aliases

### Build Errors
```bash
# Clear cache
rm -rf dist node_modules
npm install
npm run build
```

### Type Errors
```bash
npm run type-check  # Check all types
# Fix issues in files
```

## Next Steps

1. **Deploy to Vercel**: Use Vercel CLI or GitHub integration
2. **Connect Backend**: Update API endpoints in services
3. **Add More Features**: Follow patterns in existing code
4. **Optimize Images**: Use next/image or similar
5. **Setup Analytics**: Add tracking to key pages
6. **Setup Email**: Add email notifications
7. **Add Testing**: Set up Jest + React Testing Library

## Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Redux Toolkit](https://redux-toolkit.js.org)
- [React Router](https://reactrouter.com)
- [TypeScript](https://www.typescriptlang.org)
