import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQPage />} />

        {/* Legal */}
        <Route
          path="/privacy-policy"
          element={<PrivacyPolicy />}
        />

        <Route
          path="/terms"
          element={<Terms />}
        />

        <Route
          path="/refund-policy"
          element={<RefundPolicy />}
        />

        {/* Support */}
        <Route
          path="/help-center"
          element={<HelpCenter />}
        />

        <Route
          path="/code-of-conduct"
          element={<CodeOfConduct />}
        />

        {/* Authentication */}
        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Onboarding */}
        <Route
          path="/dashboard/onboarding"
          element={<Onboarding />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<Dashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;