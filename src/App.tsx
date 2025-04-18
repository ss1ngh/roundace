import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { PublicLayout } from '@/layouts/public-layout';
import AuthenticationLayout from '@/layouts/auth-layout';
import MainLayout from '@/layouts/main-layout';
import ProtectRoutes from './layouts/protected-layout';

import LandingPage from '@/pages/LandingPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import Generate from './components/generate';
import CreateInterview from './pages/create-interview';
import { InterviewLoadPage } from './pages/InterviewLoaderPage';
import { InterviewPage } from './pages/InterviewPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          {/* public routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<LandingPage />} />
          </Route>

          {/* authentication routes */}
          <Route path="/signin" element={<AuthenticationLayout />}>
            <Route index element={<SignInPage />} />
          </Route>

          <Route path="/signup" element={<AuthenticationLayout />}>
            <Route index element={<SignUpPage />} />
          </Route>

          {/* protected routes */}
          <Route
            element={
              <ProtectRoutes>
                <MainLayout />
              </ProtectRoutes>
            }
          >
            <Route element={<Generate/>} path="/generate">
              <Route index element={<Dashboard />} />
              <Route path=':interviewId' element={<CreateInterview/>} />
              <Route path='interview/:interviewId/load' element={<InterviewLoadPage/>} />
              <Route path="interview/:interviewId/start" element={<InterviewPage />}/>
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
