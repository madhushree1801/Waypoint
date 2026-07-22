import { Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ResumeAnalyzerPage from "./pages/ResumeAnalyzerPage";
import CareerRoadmapPage from "./pages/CareerRoadmapPage";
import SkillGapPage from "./pages/SkillGapPage";
import InterviewPrepPage from "./pages/InterviewPrepPage";
import CareerChatPage from "./pages/CareerChatPage";
import SettingsPage from "./pages/SettingsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";

import SidebarLayout from "./layouts/SidebarLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <SidebarLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />

        <Route
          path="resume-analyzer"
          element={<ResumeAnalyzerPage />}
        />

        <Route
          path="career-roadmap"
          element={<CareerRoadmapPage />}
        />

        <Route
          path="skill-gap"
          element={<SkillGapPage />}
        />

        <Route
          path="interview-prep"
          element={<InterviewPrepPage />}
        />

        <Route
          path="career-chat"
          element={<CareerChatPage />}
        />

        <Route
          path="settings"
          element={<SettingsPage />}
        />
      </Route>

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;