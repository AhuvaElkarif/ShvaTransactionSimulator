import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { SignupPage } from './pages/SignupPage/SignupPage';
import { SimulatorPage } from './pages/SimulatorPage/SimulatorPage';
import { ProtectedRoute } from './routes/ProtectedRoute';

/** Top-level route table. The simulator is protected; auth pages are public. */
export const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <SimulatorPage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);
