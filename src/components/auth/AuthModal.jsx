import { useEffect, useState } from "react";
import { Eye, EyeOff, Mail, Lock, Phone, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const openAuthModal = () => {
  window.dispatchEvent(new CustomEvent("spark-auth-modal-open"));
};

const AuthModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [localOpen, setLocalOpen] = useState(false);
  const [mode, setMode] = useState("login");
  const [loginData, setLoginData] = useState({
    emailOrMobile: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleOpen = () => setLocalOpen(true);
    window.addEventListener("spark-auth-modal-open", handleOpen);
    return () =>
      window.removeEventListener("spark-auth-modal-open", handleOpen);
  }, []);

  useEffect(() => {
    const shouldLockScroll = isOpen || localOpen;
    if (!shouldLockScroll) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, localOpen]);

  const handleClose = () => {
    setLocalOpen(false);
    onClose?.();
  };

  if (!isOpen && !localOpen) return null;

  const resetState = () => {
    setMode("login");
    setLoginData({ emailOrMobile: "", password: "" });
    setRegisterData({
      fullName: "",
      contactNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowLoginPassword(false);
    setShowRegisterPassword(false);
    setShowConfirmPassword(false);
    setError("");
  };

  const closeModal = () => {
    resetState();
    handleClose();
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const value = loginData.emailOrMobile.trim();
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isMobile = /^[0-9]{10}$/.test(value);

    if (!isEmail && !isMobile) {
      setError("Please enter a valid email address or 10-digit mobile number.");
      return;
    }

    if (loginData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const data = await signIn({
        emailOrMobile: value,
        password: loginData.password,
      });

      closeModal();
      navigate(data?.user?.role === "admin" ? "/admin" : "/services", { replace: true });
    } catch (err) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const name = registerData.fullName.trim();
    const mobile = registerData.contactNumber.trim();
    const emailValue = registerData.email.trim().toLowerCase();

    if (!name) return setError("Please enter your full name.");
    if (!/^[0-9]{10}$/.test(mobile))
      return setError("Please enter a valid 10-digit mobile number.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue))
      return setError("Please enter a valid email address.");
    if (registerData.password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (registerData.password !== registerData.confirmPassword)
      return setError("Passwords do not match.");

    setLoading(true);

    try {
      const data = await signUp({
        fullName: name,
        contactNumber: mobile,
        email: emailValue,
        password: registerData.password,
      });

      closeModal();
      navigate("/services", { replace: true });
    } catch (err) {
      setError(
        err?.data?.message ||
          err?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3 sm:p-4 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl">
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Close Button */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/30"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Compact Top Banner */}
          <div className="bg-gradient-to-r from-violet-700 via-purple-700 to-indigo-600 px-6 py-6 text-white">
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Welcome to <span className="text-fuchsia-300">Spark</span>
            </h2>
            <p className="mt-1 text-xs font-medium text-violet-100/90 sm:text-sm">
              Your social & lifestyle support platform
            </p>
          </div>

          {/* Clean Modern Mode Switcher */}
          <div className="bg-slate-50 px-6 pt-5 pb-2">
            <div className="relative flex rounded-2xl bg-slate-200/80 p-1.5 shadow-inner">
              {/* Animated Active Pill with Violet Color */}
              <div
                className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-violet-600 shadow-md shadow-violet-300 transition-all duration-300 ease-out ${
                  mode === "register"
                    ? "translate-x-[calc(100%+6px)]"
                    : "translate-x-0"
                }`}
              />

              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setError("");
                }}
                className={`relative z-10 w-1/2 py-2.5 text-sm font-bold transition-colors duration-200 ${
                  mode === "login"
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setMode("register");
                  setError("");
                }}
                className={`relative z-10 w-1/2 py-2.5 text-sm font-bold transition-colors duration-200 ${
                  mode === "register"
                    ? "text-white"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-slate-50 px-6 pb-6 pt-2">
            {error && (
              <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-600">
                {error}
              </div>
            )}

            {mode === "login" ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Phone or Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="text"
                      value={loginData.emailOrMobile}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          emailOrMobile: e.target.value,
                        })
                      }
                      placeholder="Mobile number or email"
                      maxLength={254}
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      placeholder="Your password"
                      className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showLoginPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-xs font-semibold text-violet-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !loginData.emailOrMobile ||
                    loginData.password.length < 8
                  }
                  className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-violet-600 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Login"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <User size={16} />
                    </span>
                    <input
                      type="text"
                      value={registerData.fullName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Enter full name"
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Phone size={16} />
                    </span>
                    <input
                      type="tel"
                      value={registerData.contactNumber}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          contactNumber: e.target.value,
                        })
                      }
                      placeholder="10-digit mobile number"
                      maxLength={10}
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Email
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Mail size={16} />
                    </span>
                    <input
                      type="email"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      placeholder="you@example.com"
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showRegisterPassword ? "text" : "password"}
                      value={registerData.password}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          password: e.target.value,
                        })
                      }
                      placeholder="At least 8 characters"
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowRegisterPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showRegisterPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                      <Lock size={16} />
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={registerData.confirmPassword}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm password"
                      className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-800 shadow-sm outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={
                    loading ||
                    !registerData.fullName ||
                    !registerData.contactNumber ||
                    !registerData.email ||
                    !registerData.password ||
                    !registerData.confirmPassword
                  }
                  className="mt-2 h-11 w-full cursor-pointer rounded-xl bg-violet-600 text-sm font-bold text-white shadow-md shadow-violet-200 transition hover:bg-violet-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Creating account..." : "Register"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
