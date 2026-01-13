import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import PublicSignupScreen from './screens/PublicSignupScreen';
import UserDashboardScreen from './screens/UserDashboardScreen';
import MetricsDashboardScreen from './screens/MetricsDashboardScreen';
import DashboardScreen from './screens/DashboardScreen';
import PatientsScreen from './screens/PatientsScreen';
import PatientChartScreen from './screens/PatientChartScreen';
import NoteEditorScreen from './screens/NoteEditorScreen';
import CalendarScreen from './screens/CalendarScreen';
import TelehealthScreen from './screens/TelehealthScreen';
import TasksScreen from './screens/TasksScreen';
import BillingScreen from './screens/BillingScreen';
import SettingsScreen from './screens/SettingsScreen';

const ProtectedRoute = () => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
          <Route path="/signup" element={<PublicSignupScreen />} />
          <Route path="/clinician-signup" element={<SignUpScreen />} />
          <Route path="/my-dashboard" element={<UserDashboardScreen />} />
          <Route path="/metrics" element={<MetricsDashboardScreen />} />

          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/patients" element={<PatientsScreen />} />
              <Route path="/patients/:id" element={<PatientChartScreen />} />
              <Route path="/note-editor" element={<NoteEditorScreen />} />
              <Route path="/calendar" element={<CalendarScreen />} />
              <Route path="/telehealth" element={<TelehealthScreen />} />
              <Route path="/tasks" element={<TasksScreen />} />
              <Route path="/billing" element={<BillingScreen />} />
              <Route path="/settings" element={<SettingsScreen />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
