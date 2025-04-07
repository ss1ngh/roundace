import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { PublicLayout } from '@/layouts/public-layout';
import AuthenticationLayout from '@/layouts/auth-layout';
import MainLayout from '@/layouts/main-layout';
import ProtectRoutes from './layouts/protected-layout';

import LandingPage from '@/pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
          </Route>

          {/* authentication routes - outside of public layout */}
          <Route path="/signin" element={<AuthenticationLayout />}>
            <Route index element={<SignInPage />} />
          </Route>

          <Route path="/signup" element={<AuthenticationLayout />}>
            <Route index element={<SignUpPage />} />
          </Route>

          {/* protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectRoutes>
                <MainLayout />
              </ProtectRoutes>
            }
          >
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;