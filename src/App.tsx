import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
// Import tempo-routes conditionally to avoid build issues
import tempoRoutes from "tempo-routes";
const routes = import.meta.env.DEV ? tempoRoutes : [];
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import Dashboard from "./components/pages/dashboard";
import AIConsultationPage from "./components/pages/AIConsultationPage";
import ConsultationDetailPage from "./components/pages/ConsultationDetailPage";
import MasterUserSystemPage from "./components/pages/MasterUserSystemPage";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen } from "./components/ui/loading-spinner";

// Lazy load the AppointmentFollowUpPage component
const AppointmentFollowUpPage = lazy(
  () => import("./components/pages/AppointmentFollowUpPage"),
);

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  // For Tempo routes, we need to ensure they're properly handled
  // but we'll also define all routes directly to avoid routing issues
  return (
    <>
      {/* Include Tempo routes if in Tempo environment */}
      {import.meta.env.VITE_TEMPO === "true" && (
        <Routes>
          <Route path="/tempobook/*" element={null} />
        </Routes>
      )}

      {/* Main application routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/consultation"
          element={
            <PrivateRoute>
              <AIConsultationPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/consultation/:id"
          element={
            <PrivateRoute>
              <ConsultationDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/master"
          element={
            <PrivateRoute>
              <MasterUserSystemPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/patients"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/records"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/appointments"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/appointments/follow-up"
          element={
            <PrivateRoute>
              <Suspense
                fallback={<LoadingScreen text="Loading follow-up page..." />}
              >
                <AppointmentFollowUpPage />
              </Suspense>
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard/help"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
