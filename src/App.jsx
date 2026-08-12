import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoute from "./components/routes/PublicRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import FAQPage from "./pages/FAQPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import HelpCenter from "./pages/HelpCenter";
import CodeOfConduct from "./pages/CodeOfConduct";
import AdminLogin from "./pages/AdminLogin";
import Register from "./pages/Register";
import Services from "./pages/Services";
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

function App() {
  const { restoreSession } = useAuth();

  useEffect(() => {
    restoreSession();
  }, [restoreSession]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/code-of-conduct" element={<CodeOfConduct />} />

        <Route element={<PublicRoute />}>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="user" />}>
          <Route path="/services" element={<Services />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/onboarding" element={<Onboarding />} />
        </Route>

        <Route element={<ProtectedRoute requiredRole="admin" />}>
          <Route path="/admin" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;