import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import OnboardingSidebar from "../components/onboarding/OnboardingSidebar";

import BasicInfoStep from "../components/onboarding/steps/BasicInfoStep";
import InterestsStep from "../components/onboarding/steps/InterestsStep";
import PhysicalStep from "../components/onboarding/steps/PhysicalStep";
import LifestyleStep from "../components/onboarding/steps/LifestyleStep";
import LocationStep from "../components/onboarding/steps/LocationStep";
import CareerStep from "../components/onboarding/steps/CareerStep";
import PhotosStep from "../components/onboarding/steps/PhotosStep";

const ONBOARDING_STEPS = [
  {
    id: "basic",
    label: "Basic Information",
  },
  {
    id: "interests",
    label: "Interests",
  },
  {
    id: "physical",
    label: "Physical & Preferences",
  },
  {
    id: "lifestyle",
    label: "Lifestyle",
  },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "career",
    label: "Career & About",
  },
  {
    id: "photos",
    label: "Photos",
  },
];

const DEFAULT_ONBOARDING_DATA = {
  age: 18,
  gender: "",
  interests: [],
  height: "",
  weight: "",
  lookingFor: [],
  ageRange: {
    min: 18,
    max: 99,
  },
  lifestyle: {
    drinking: "",
    smoking: "",
    workout: "",
    diet: "",
    pets: "",
  },
  photos: [],
  location: {
    type: "Point",
    coordinates: [0, 0],
    city: "",
    state: "",
    country: "",
    address: "",
  },
  bio: "",
  jobTitle: "",
  company: "",
  educationLevel: "",
  university: "",
};

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const validateStep = (step, data) => {
  switch (step) {
    case "basic":
      return data.age >= 18 && !!data.gender;

    case "interests":
      return data.interests.length >= 3;

    case "physical":
      return (
        !!data.height &&
        !!data.weight &&
        data.lookingFor.length > 0
      );

    case "lifestyle":
      return Object.values(data.lifestyle).some(Boolean);

    case "location":
      return (
        data.location.coordinates[0] !== 0 ||
        data.location.coordinates[1] !== 0 ||
        !!data.location.city
      );

    case "career":
      return !!data.bio && data.bio.length >= 10;

    case "photos":
      return data.photos.length >= 1;

    default:
      return false;
  }
};

// Merge a saved profile (which may be missing keys, or come back with
// slightly different nesting from the API) safely on top of the defaults.
const mergeProfileIntoDefaults = (profile) => ({
  ...DEFAULT_ONBOARDING_DATA,
  ...profile,
  ageRange: {
    ...DEFAULT_ONBOARDING_DATA.ageRange,
    ...(profile?.ageRange || {}),
  },
  lifestyle: {
    ...DEFAULT_ONBOARDING_DATA.lifestyle,
    ...(profile?.lifestyle || {}),
  },
  location: {
    ...DEFAULT_ONBOARDING_DATA.location,
    ...(profile?.location || {}),
  },
  interests: profile?.interests || [],
  lookingFor: profile?.lookingFor || [],
  photos: profile?.photos || [],
});

const Onboarding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Allows deep-linking straight into a section, e.g. /dashboard/onboarding?step=photos
  const requestedStep = searchParams.get("step");
  const initialStep = ONBOARDING_STEPS.some((step) => step.id === requestedStep)
    ? requestedStep
    : "basic";

  const [activeStep, setActiveStep] = useState(initialStep);

  const [data, setData] = useState(DEFAULT_ONBOARDING_DATA);

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [hasExistingProfile, setHasExistingProfile] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Load any previously saved profile so this screen doubles as an
  // "edit profile" flow instead of always starting from scratch.
  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/admin-login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/profile/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const result = await response.json();
          const profile = result.profile || result.data || result;

          if (profile && typeof profile === "object" && Object.keys(profile).length > 0) {
            setData(mergeProfileIntoDefaults(profile));
            setHasExistingProfile(true);
          }
        }
      } catch (err) {
        console.error("Failed to load existing profile:", err);
        // Non-fatal: fall back to a blank profile so new users can still onboard.
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateData = (updates) => {
    setData((previous) => ({
      ...previous,
      ...updates,
    }));

    setError("");
  };

  const completedSteps = useMemo(() => {
    const completed = new Set();

    ONBOARDING_STEPS.forEach((step) => {
      if (validateStep(step.id, data)) {
        completed.add(step.id);
      }
    });

    return completed;
  }, [data]);

  const progress = Math.round(
    (completedSteps.size / ONBOARDING_STEPS.length) * 100
  );

  const currentIndex = ONBOARDING_STEPS.findIndex(
    (step) => step.id === activeStep
  );

  const isFirst = currentIndex === 0;

  const isLast =
    currentIndex === ONBOARDING_STEPS.length - 1;

  const currentStep = ONBOARDING_STEPS[currentIndex];

  const goNext = () => {
    if (!validateStep(activeStep, data)) {
      setError(
        "Please complete this step before continuing."
      );
      return;
    }

    if (!isLast) {
      setActiveStep(
        ONBOARDING_STEPS[currentIndex + 1].id
      );

      setError("");
    }
  };

  const goPrev = () => {
    if (!isFirst) {
      setActiveStep(
        ONBOARDING_STEPS[currentIndex - 1].id
      );

      setError("");
    }
  };

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
    setError("");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/admin-login");
  };

  const handleSubmit = async () => {
    if (!validateStep("photos", data)) {
      setError("Please add at least one photo.");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/admin-login");
        return;
      }

      const response = await fetch(
        `${API_URL}/api/profile/save`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to save profile"
        );
      }

      console.log("Profile saved successfully:", result);

      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...user,
            isProfileCompleted: true,
          })
        );
      }

      navigate("/dashboard");
    } catch (err) {
      console.error("Profile submission failed:", err);

      setError(
        err.message ||
          "Failed to save profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    const props = {
      data,
      onChange: updateData,
    };

    switch (activeStep) {
      case "basic":
        return <BasicInfoStep {...props} />;

      case "interests":
        return <InterestsStep {...props} />;

      case "physical":
        return <PhysicalStep {...props} />;

      case "lifestyle":
        return <LifestyleStep {...props} />;

      case "location":
        return <LocationStep {...props} />;

      case "career":
        return <CareerStep {...props} />;

      case "photos":
        return <PhotosStep {...props} />;

      default:
        return null;
    }
  };

  // Show a lightweight loading state while we check for an existing
  // profile, so the form doesn't flash empty before filling in.
  if (loadingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8fb]">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-white px-8 py-10 shadow-sm ring-1 ring-slate-100">
          <span className="text-3xl animate-pulse">💗</span>
          <p className="text-sm font-medium text-slate-500">
            Loading your profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8fb]">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="hidden lg:block lg:w-80 lg:shrink-0">
          <OnboardingSidebar
            activeStep={activeStep}
            completedSteps={completedSteps}
            progress={progress}
            onStepClick={handleStepClick}
            onLogout={handleLogout}
          />
        </div>

        {/* Main Content */}
        <main className="flex min-h-screen flex-1 items-start justify-center px-5 py-10 pt-24 sm:px-8 lg:items-center lg:px-12 lg:py-20 lg:pt-20">
          <div className="w-full max-w-3xl">
            {/* Mobile Progress */}
            <div className="mb-6 lg:hidden">
              <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-rose-600">
                      {progress}% Complete
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Step {currentIndex + 1} of{" "}
                      {ONBOARDING_STEPS.length}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="rounded-full bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-red-500/20"
                  >
                    Logout
                  </button>
                </div>

                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Form Card */}
            <div className="rounded-2xl bg-white p-6 shadow-[0_30px_80px_rgba(15,23,42,0.06)] ring-1 ring-slate-100 sm:p-10 lg:p-12">
              {/* Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="inline-flex items-center gap-1.5 text-sm font-semibold uppercase tracking-widest text-rose-500">
                    <span>💗</span>
                    {hasExistingProfile ? "Edit Profile" : "Onboarding"}
                  </p>

                  {hasExistingProfile && (
                    <button
                      type="button"
                      onClick={() => navigate("/dashboard")}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                      ← Back to Dashboard
                    </button>
                  )}
                </div>

                <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
                  {hasExistingProfile
                    ? "Update your profile"
                    : "Build your profile"}
                </h1>

                <p className="mt-1 text-sm text-slate-500">
                  {hasExistingProfile
                    ? "Jump to any section below and save your changes"
                    : "Complete all steps to unlock matching"}
                </p>

                <div className="mt-5">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-rose-600">
                      {progress}% Complete
                    </span>

                    <span className="text-xs text-slate-400">
                      Step {currentIndex + 1} of{" "}
                      {ONBOARDING_STEPS.length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Current Step */}
              <div className="min-h-[420px]">
                {renderStep()}
              </div>

              {/* Error */}
              {error && (
                <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex items-center justify-between gap-4 border-t border-slate-100 pt-6">
                <button
                  type="button"
                  onClick={goPrev}
                  disabled={isFirst}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40"
                >
                  ← Previous
                </button>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    {currentStep?.label}
                  </p>
                </div>

                {!isLast ? (
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:opacity-50"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                      submitting ||
                      !validateStep("photos", data)
                    }
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5 hover:shadow-xl disabled:pointer-events-none disabled:opacity-50"
                  >
                    {submitting
                      ? "Saving..."
                      : hasExistingProfile
                        ? "Save Changes 💾"
                        : "Complete Profile"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Onboarding;