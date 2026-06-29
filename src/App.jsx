import { BrowserRouter , Routes, Route, Navigate, Suspense } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lazy } from 'react';
import { store } from './store/store';
import { ToastProvider } from './components/common/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Critical pages (preload)
import SplashPage from './pages/SplashPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy loaded pages
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const OTPVerificationPage = lazy(() => import('./pages/OTPVerificationPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const CompleteProfilePage = lazy(() => import('./pages/CompleteProfilePage'));
const JobListingPage = lazy(() => import('./pages/JobListingPage'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'));
const WorkerListingPage = lazy(() => import('./pages/WorkerListingPage'));
const WorkerDetailPage = lazy(() => import('./pages/WorkerDetailPage'));
const CompanyDetailPage = lazy(() => import('./pages/CompanyDetailPage'));
const WorkerDashboard = lazy(() => import('./pages/WorkerDashboard'));
const CompanyDashboard = lazy(() => import('./pages/CompanyDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Loading component
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <LanguageProvider>
          <ToastProvider>
            <Router>
              <Routes>
                {/* Entry Screen (Splash) */}
                <Route path="/" element={<SplashPage />} />
                
                {/* Presentation/Welcome Page */}
                <Route path="/welcome" element={<WelcomePage />} />
                
                {/* Authentications Screens */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<Suspense fallback={<PageLoader />}><RegisterPage /></Suspense>} />
                <Route path="/verify-otp" element={<Suspense fallback={<PageLoader />}><OTPVerificationPage /></Suspense>} />
                <Route path="/forgot-password" element={<Suspense fallback={<PageLoader />}><ForgotPasswordPage /></Suspense>} />
                <Route path="/reset-password" element={<Suspense fallback={<PageLoader />}><ResetPasswordPage /></Suspense>} />
                
                {/* Profile Completion Page */}
                <Route
                  path="/complete-profile"
                  element={
                    <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                      <Suspense fallback={<PageLoader />}>
                        <CompleteProfilePage />
                      </Suspense>
                    </ProtectedRoute>
                  }
                />

                {/* Layout Wrapper Pages */}
                <Route element={<Layout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/jobs" element={<Suspense fallback={<PageLoader />}><JobListingPage /></Suspense>} />
                  <Route path="/jobs/={<Suspense fallback={<PageLoader />}><JobDetailPage /></Suspense>} />
                  <Route path="/workers" element={<Suspense fallback={<PageLoader />}><WorkerListingPage /></Suspense>} />
                  <Route path="/workers/={<Suspense fallback={<PageLoader />}><WorkerDetailPage /></Suspense>} />
                  <Route path="/companies/={<Suspense fallback={<PageLoader />}><CompanyDetailPage /></Suspense>} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                        <Suspense fallback={<PageLoader />}>
                          <WorkerDashboard />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/company-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['company', 'admin']}>
                        <Suspense fallback={<PageLoader />}>
                          <CompanyDashboard />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Suspense fallback={<PageLoader />}>
                          <AdminDashboard />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                        <Suspense fallback={<PageLoader />}>
                          <ProfilePage />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />

                  <Route path="*" element={<NotFoundPage />} />
                </Route>
              </Routes>
            </Router>
          </ToastProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
