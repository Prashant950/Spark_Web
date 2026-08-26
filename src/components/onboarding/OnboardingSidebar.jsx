
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
    <aside className="dashboard-sidebar onboarding-sidebar relative flex min-h-screen w-full flex-col overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.22),_transparent_28%),linear-gradient(180deg,_#0f172a_0%,_#111827_45%,_#1e293b_100%)] p-5 sm:p-6 lg:sticky lg:top-0 lg:w-80">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-20 h-52 w-52 rounded-full bg-violet-500/20 blur-3xl" />

      <div className="absolute right-5 top-5 z-20 lg:hidden">
        <button
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100 transition-all hover:bg-white/10"
        >
          ↪ Logout
        </button>
      </div>

      <div className="relative mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
          Sathi Meet Profile
        </p>

        <h2 className="mt-1.5 text-xl font-bold tracking-tight text-white sm:text-2xl">
          Shape your presence
        </h2>

        <p className="mt-1 text-sm text-slate-300">
          Complete your setup to unlock better matches
        </p>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-100">
              {progress}% Complete
            </span>
            {progress === 100 && <span className="text-lg">✨</span>}
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-500"
              style={{
                width: `${Math.min(Math.max(progress, 0), 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

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
                "group flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm font-medium transition-all duration-200 sm:px-4 sm:py-3.5",
                isActive
                  ? "bg-white text-slate-900 shadow-[0_10px_30px_rgba(14,165,233,0.22)]"
                  : isCompleted
                    ? "bg-white/8 text-white hover:bg-white/12"
                    : "text-slate-300 hover:bg-white/5 hover:text-white",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-br from-cyan-500 to-violet-500 text-white"
                    : isCompleted
                      ? "bg-emerald-400/90 text-slate-950"
                      : "bg-slate-800 text-slate-300 ring-1 ring-inset ring-white/10 group-hover:bg-slate-700",
                ].join(" ")}
              >
                {isCompleted ? "✓" : step.number}
              </span>

              <span
                className={[
                  "flex-1",
                  isActive
                    ? "font-semibold text-slate-900"
                    : isCompleted
                      ? "text-white"
                      : "text-slate-300",
                ].join(" ")}
              >
                {step.label}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="relative mt-4">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition-all duration-200 hover:bg-white/10 sm:py-3.5"
        >
          ↪ Logout
        </button>
      </div>
    </aside>
  );
};

export default OnboardingSidebar;