import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Background image URL (Aap iski jagah apni local path ya direct image link de sakte hain)
const HERO_BG_IMAGE =
  "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop";
  
const AdminLogin = () => {
  const navigate = useNavigate();

  const [emailOrMobile, setEmailOrMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const value = emailOrMobile.trim();

    // Email validation
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    // 10-digit mobile validation
    const isMobile = /^[0-9]{10}$/.test(value);

    if (!isEmail && !isMobile) {
      setError(
        "Please enter a valid email address or 10-digit mobile number."
      );
      return;
    }

    // Password validation
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailOrMobile: value,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store authentication information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Login successful
      const profileComplete =
        data.isProfileCompleted ?? data.user?.isProfileCompleted;

      if (profileComplete) {
        navigate("/dashboard");
      } else {
        navigate("/dashboard/onboarding");
      }
    } catch (err) {
      console.error("Login failed:", err);

      setError(
        err.message || "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setError("Forgot password functionality is not implemented yet.");
  };

  return (
    <div className="min-h-screen bg-[#faf8fb]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Hero Section with Background Image */}
        <div className="relative hidden overflow-hidden lg:flex lg:w-[48%]">
          {/* Background Image */}
          <img
            src={HERO_BG_IMAGE}
            alt="Hero Background"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* Dark/Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-tr from-violet-950/90 via-purple-900/80 to-fuchsia-900/70 backdrop-blur-[2px]" />

          <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-12">
            <div className="max-w-lg text-center text-white">
              <div className="mb-8 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/20 border border-white/30 shadow-2xl backdrop-blur-md">
                  <span className="text-4xl">♥</span>
                </div>
              </div>

              <h2 className="text-4xl font-bold tracking-tight">
                Welcome Back
              </h2>

              <p className="mx-auto mt-5 max-w-md text-lg leading-8 text-white/90">
                Sign in to continue your journey and access your account.
              </p>

              <div className="mx-auto mt-10 h-px w-24 bg-white/30" />

              <p className="mt-8 text-sm text-white/70">
                Your account. Your journey. Your connections.
              </p>
            </div>
          </div>

          {/* Decorative glows */}
          <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-20 h-96 w-96 rounded-full bg-fuchsia-400/20 blur-3xl" />
        </div>

        {/* Mobile Hero with Background Image */}
        <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden px-6 py-12 lg:hidden">
          <img
            src={HERO_BG_IMAGE}
            alt="Hero Background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-violet-950/85 via-purple-900/80 to-fuchsia-900/75 backdrop-blur-[2px]" />

          <div className="relative z-10 text-center text-white">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 border border-white/30 backdrop-blur-md">
              <span className="text-3xl">♥</span>
            </div>

            <h2 className="text-2xl font-bold">
              Welcome Back
            </h2>

            <p className="mt-2 text-sm text-white/85">
              Sign in to continue your journey
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div className="relative flex flex-1 flex-col items-center justify-center px-5 py-10 sm:px-8 lg:py-12">
          {/* Background decoration */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-rose-100/40 blur-3xl" />
            <div className="absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-purple-100/30 blur-3xl" />
          </div>

          <div className="relative z-10 w-full max-w-[420px]">
            {/* Logo */}
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2"
              >
                <span className="text-2xl font-bold tracking-tight text-gray-900">
                  Spark
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8 lg:mb-10">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Sign in
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Email / Mobile */}
              <div className="space-y-2">
                <label
                  htmlFor="emailOrMobile"
                  className="text-sm font-medium text-gray-800"
                >
                  Email or Mobile Number
                </label>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    ✉
                  </span>

                  <input
                    id="emailOrMobile"
                    type="text"
                    inputMode="email"
                    placeholder="you@email.com or 9876543210"
                    value={emailOrMobile}
                    onChange={(e) => {
                      setEmailOrMobile(e.target.value);
                      setError("");
                    }}
                    required
                    className="h-12 w-full rounded-[0.875rem] border-[1.5px] border-zinc-200 bg-white px-4 py-2 pl-11 text-sm shadow-sm transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-800"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs font-medium text-rose-500 transition-colors hover:text-rose-600"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    🔒
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError("");
                    }}
                    minLength={8}
                    required
                    className="h-12 w-full rounded-[0.875rem] border-[1.5px] border-zinc-200 bg-white px-4 py-2 pl-11 pr-12 text-sm shadow-sm transition-all duration-200 placeholder:text-zinc-400 hover:border-zinc-300 focus:border-rose-300 focus:outline-none focus:ring-4 focus:ring-rose-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition-colors hover:text-gray-700"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {password.length > 0 && password.length < 8 && (
                  <p className="text-xs text-red-500">
                    Password must be at least 8 characters.
                  </p>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-100 bg-red-50/80 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={
                  loading ||
                  emailOrMobile.trim().length === 0 ||
                  password.length < 8
                }
                className="h-12 w-full rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-8 text-base font-semibold text-white shadow-lg shadow-rose-500/30 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-rose-500/40 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            {/* Register */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-rose-500 transition-colors hover:text-rose-600 hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>

            {/* Terms */}
            <p className="mt-10 text-center text-[11px] leading-relaxed text-gray-400">
              By continuing, you agree to Spark&apos;s Terms of Service
              and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;