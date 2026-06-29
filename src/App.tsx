import { BrowserRouter as Router, Routes, Route, Navigate, Suspense } from 'react-router-dom';
import { Provider } from 'react-redux';
import { lazy, Suspense as ReactSuspense } from 'react';
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
                <Route path="/register" element={<ReactSuspense fallback={<PageLoader />}><RegisterPage /></ReactSuspense>} />
                <Route path="/verify-otp" element={<ReactSuspense fallback={<PageLoader />}><OTPVerificationPage /></ReactSuspense>} />
                <Route path="/forgot-password" element={<ReactSuspense fallback={<PageLoader />}><ForgotPasswordPage /></ReactSuspense>} />
                <Route path="/reset-password" element={<ReactSuspense fallback={<PageLoader />}><ResetPasswordPage /></ReactSuspense>} />
                
                {/* Profile Completion Page */}
                <Route
                  path="/complete-profile"
                  element={
                    <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                      <ReactSuspense fallback={<PageLoader />}>
                        <CompleteProfilePage />
                      </ReactSuspense>
                    </ProtectedRoute>
                  }
                />

                {/* Layout Wrapper Pages */}
                <Route element={<Layout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/jobs" element={<ReactSuspense fallback={<PageLoader />}><JobListingPage /></ReactSuspense>} />
                  <Route path="/jobs/:id" element={<ReactSuspense fallback={<PageLoader />}><JobDetailPage /></ReactSuspense>} />
                  <Route path="/workers" element={<ReactSuspense fallback={<PageLoader />}><WorkerListingPage /></ReactSuspense>} />
                  <Route path="/workers/:id" element={<ReactSuspense fallback={<PageLoader />}><WorkerDetailPage /></ReactSuspense>} />
                  <Route path="/companies/:id" element={<ReactSuspense fallback={<PageLoader />}><CompanyDetailPage /></ReactSuspense>} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                        <ReactSuspense fallback={<PageLoader />}>
                          <WorkerDashboard />
                        </ReactSuspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/company-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['company', 'admin']}>
                        <ReactSuspense fallback={<PageLoader />}>
                          <CompanyDashboard />
                        </ReactSuspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <ReactSuspense fallback={<PageLoader />}>
                          <AdminDashboard />
                        </ReactSuspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                        <ReactSuspense fallback={<PageLoader />}>
                          <ProfilePage />
                        </ReactSuspense>
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
