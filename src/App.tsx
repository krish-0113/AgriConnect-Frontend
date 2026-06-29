import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ToastProvider } from './components/common/Toast';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import SplashPage from './pages/SplashPage';
import WelcomePage from './pages/WelcomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import HomePage from './pages/HomePage';
import JobListingPage from './pages/JobListingPage';
import JobDetailPage from './pages/JobDetailPage';
import WorkerListingPage from './pages/WorkerListingPage';
import WorkerDetailPage from './pages/WorkerDetailPage';
import CompanyDetailPage from './pages/CompanyDetailPage';
import WorkerDashboard from './pages/WorkerDashboard';
import CompanyDashboard from './pages/CompanyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

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
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/verify-otp" element={<OTPVerificationPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                <Route path="/reset-password" element={<ResetPasswordPage />} />
                
                {/* Profile Completion Page */}
                <Route
                  path="/complete-profile"
                  element={
                    <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                      <CompleteProfilePage />
                    </ProtectedRoute>
                  }
                />

                {/* Layout Wrapper Pages */}
                <Route element={<Layout />}>
                  <Route path="/home" element={<HomePage />} />
                  <Route path="/jobs" element={<JobListingPage />} />
                  <Route path="/jobs/:id" element={<JobDetailPage />} />
                  <Route path="/workers" element={<WorkerListingPage />} />
                  <Route path="/workers/:id" element={<WorkerDetailPage />} />
                  <Route path="/companies/:id" element={<CompanyDetailPage />} />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                        <WorkerDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/company-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['company', 'admin']}>
                        <CompanyDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/admin-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute allowedRoles={['worker', 'company', 'admin']}>
                        <ProfilePage />
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
