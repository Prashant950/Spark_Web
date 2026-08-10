import React from "react";

const ONBOARDING_STEPS = [
  {
    id: "basic",
    number: 1,
    label: "Basic Information",
  },
  {
    id: "interests",
    number: 2,
    label: "Interests",
  },
  {
    id: "physical",
    number: 3,
    label: "Physical & Preferences",
  },
  {
    id: "lifestyle",
    number: 4,
    label: "Lifestyle",
  },
  {
    id: "location",
    number: 5,
    label: "Location",
  },
  {
    id: "career",
    number: 6,
    label: "Career & About",
  },
  {
    id: "photos",
    number: 7,
    label: "Photos",
  },
];

const OnboardingSidebar = ({
  activeStep,
  completedSteps = new Set(),
  progress = 0,
  onStepClick,
  onLogout,
}) => {
  return (
    <aside className="dashboard-sidebar onboarding-sidebar relative flex min-h-screen w-full flex-col overflow-hidden bg-gradient-to-b from-violet-800 via-purple-700 to-fuchsia-600 p-5 sm:p-6 lg:sticky lg:top-0 lg:w-80">
      {/* Subtle decorative glow, no busy imagery */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-10 h-48 w-48 rounded-full bg-fuchsia-400/10 blur-3xl" />

      {/* Mobile Logout */}
      <div className="absolute right-5 top-5 z-20 lg:hidden">
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/15 backdrop-blur transition-all hover:bg-white/20"
        >
          ↪ Logout
        </button>
      </div>

      {/* Header */}
      <div className="relative mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-pink-100/80">
          Onboarding
        </p>

        <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Build your profile 💗
        </h2>

        <p className="mt-1 text-sm text-white/70">
          Complete all steps to unlock matching
        </p>

        {/* Progress */}
        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-white">
              {progress}% Complete
            </span>
            {progress === 100 && <span>🎉</span>}
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{
                width: `${Math.min(Math.max(progress, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Steps */}
      <nav className="relative flex-1 space-y-1.5 overflow-y-auto pr-1">
        {ONBOARDING_STEPS.map((step) => {
          const isActive = activeStep === step.id;
          const isCompleted = completedSteps.has(step.id);

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => onStepClick?.(step.id)}
              className={[
                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 sm:px-4 sm:py-3.5",
                isActive
                  ? "bg-white text-purple-700 shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
                  : isCompleted
                    ? "bg-white/10 text-white hover:bg-white/15"
                    : "text-white/60 hover:bg-white/5 hover:text-white/85",
              ].join(" ")}
            >
              {/* Single indicator: number or check */}
              <span
                className={[
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
                  isActive
                    ? "bg-purple-600 text-white"
                    : isCompleted
                      ? "bg-white/90 text-purple-700"
                      : "bg-white/10 text-white/60 ring-1 ring-inset ring-white/15 group-hover:bg-white/15",
                ].join(" ")}
              >
                {isCompleted ? "✓" : step.number}
              </span>

              {/* Label */}
              <span
                className={[
                  "flex-1",
                  isActive
                    ? "font-semibold text-purple-700"
                    : isCompleted
                      ? "text-white"
                      : "text-white/70",
                ].join(" ")}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="relative mt-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/15 backdrop-blur transition-all duration-200 hover:bg-white/20 sm:py-3.5"
        >
          ↪ Logout
        </button>
      </div>
    </aside>
  );
};

export default OnboardingSidebar;