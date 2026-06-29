# AgriConnect - Agricultural Workforce Marketplace

A modern web application for connecting agricultural professionals with employment opportunities. Built with Vite, React, TypeScript, and Redux Toolkit.

## Features

### For Workers
- Browse available agricultural jobs
- Apply for positions
- Manage applications and track status
- Build and showcase professional profile
- View company details and ratings
- Track job applications and offers

### For Companies
- Post job listings
- Browse qualified agricultural workers
- Manage applications from candidates
- View worker profiles and ratings
- Track hiring progress
- Access company dashboard with analytics

### For Admins
- System-wide analytics and monitoring
- User and company management
- Job listing oversight
- Application status tracking
- Platform health monitoring

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Routing**: React Router v7
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios with mock API support
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   └── ProtectedRoute.tsx
├── pages/            # Page components
│   ├── HomePage.tsx
│   ├── JobListingPage.tsx
│   ├── JobDetailPage.tsx
│   ├── WorkerListingPage.tsx
│   ├── WorkerDetailPage.tsx
│   ├── WorkerDashboard.tsx
│   ├── CompanyDashboard.tsx
│   ├── AdminDashboard.tsx
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ProfilePage.tsx
│   └── NotFoundPage.tsx
├── store/            # Redux store configuration
│   ├── store.ts
│   ├── hooks.ts
│   └── slices/
│       ├── authSlice.ts
│       ├── jobsSlice.ts
│       ├── workersSlice.ts
│       ├── companiesSlice.ts
│       └── applicationsSlice.ts
├── services/         # API services
│   ├── apiService.ts
│   ├── authService.ts
│   └── mockData.ts
├── hooks/            # Custom React hooks
│   ├── useAuth.ts
│   ├── useJobs.ts
│   └── useWorkers.ts
├── App.tsx           # Main app component with routing
└── main.tsx          # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js 16+
- pnpm (or npm/yarn)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
pnpm install
```

3. Create `.env` file (use `.env.example` as template):
```bash
VITE_API_URL=http://localhost:8080/api
VITE_USE_MOCK_API=true
```

4. Start development server:
```bash
pnpm dev
```

The application will open automatically at `http://localhost:3000`

## Available Scripts

- `pnpm dev` - Start Vite development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm lint` - Run ESLint

## Mock API

The application includes a mock API layer for development. Real data is generated dynamically based on predefined templates. To switch to a real backend API:

1. Update `VITE_USE_MOCK_API=false` in `.env`
2. Set `VITE_API_URL` to your backend URL
3. Ensure your backend implements the expected API endpoints

## Authentication

### Demo Credentials
- Email: `demo@example.com`
- Password: `demo123`

The auth system uses token-based authentication with local storage. Tokens are automatically added to request headers via Axios interceptors.

## User Roles

1. **Worker** - Job seekers and agricultural professionals
2. **Company** - Employers and hiring managers
3. **Admin** - Platform administrators

Each role has access to specific features and dashboards based on permissions.

## Color System

- **Primary**: Green (#8EC86E) - Main brand color for CTAs and highlights
- **Secondary**: Blue (#3B82F6) - Secondary actions and accents
- **Accent**: Orange (#FFB800) - Special highlights and ratings
- **Neutral**: Grays and whites for backgrounds and text

## Development Notes

### State Management
Redux Toolkit is used for complex state management. Each domain (auth, jobs, workers, companies, applications) has its own slice with reducers and actions.

### Custom Hooks
`useAppDispatch` and `useAppSelector` provide typed Redux hooks. Domain-specific hooks (`useAuth`, `useJobs`, `useWorkers`) provide convenience methods for common operations.

### Protected Routes
The `ProtectedRoute` component wraps routes that require authentication. It checks user role and redirects to login if necessary.

### Filtering
Jobs and workers have built-in filtering capabilities managed via Redux. Filters are applied reactively as the user adjusts them.

## Backend Integration

To connect this frontend to a Spring Boot backend:

1. Update `VITE_API_URL` to point to your Spring Boot server
2. Implement authentication endpoints:
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `POST /api/auth/logout`
   - `GET /api/auth/me`

3. Implement job endpoints:
   - `GET /api/jobs`
   - `GET /api/jobs/:id`
   - `POST /api/jobs`
   - `PUT /api/jobs/:id`
   - `DELETE /api/jobs/:id`

4. Implement worker endpoints:
   - `GET /api/workers`
   - `GET /api/workers/:id`

5. Implement application endpoints:
   - `GET /api/applications`
   - `POST /api/applications`
   - `PUT /api/applications/:id`

## License

MIT

## Support

For issues or questions, please open an issue on the project repository.
