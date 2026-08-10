import React from "react";

const INTEREST_OPTIONS = [
  { label: "Travel", icon: "✈️" },
  { label: "Music", icon: "🎵" },
  { label: "Movies", icon: "🎬" },
  { label: "Sports", icon: "⚽" },
  { label: "Fitness", icon: "💪" },
  { label: "Reading", icon: "📚" },
  { label: "Cooking", icon: "🍳" },
  { label: "Photography", icon: "📷" },
  { label: "Gaming", icon: "🎮" },
  { label: "Art", icon: "🎨" },
  { label: "Dancing", icon: "💃" },
  { label: "Nature", icon: "🌿" },
  { label: "Technology", icon: "💻" },
  { label: "Fashion", icon: "👗" },
  { label: "Food", icon: "🍕" },
  { label: "Pets", icon: "🐾" },
];

const MIN_REQUIRED = 3;

const InterestsStep = ({ data, onChange }) => {
  const selectedInterests = data.interests || [];
  const count = selectedInterests.length;

  const toggleInterest = (interest) => {
    const updated = selectedInterests.includes(interest)
      ? selectedInterests.filter((item) => item !== interest)
      : [...selectedInterests, interest];

    onChange({
      interests: updated,
    });
  };

  return (
    <div className="space-y-7">
      {/* Heading */}
      <div className="relative">
        <span className="pointer-events-none absolute -top-3 right-0 text-4xl opacity-10 select-none sm:text-5xl">
          💞
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-rose-600 ring-1 ring-inset ring-rose-100">
          <span>💗</span> Show your spark
        </span>

        <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
          What Makes Your Heart Beat?
        </h3>

        <p className="mt-1.5 text-sm text-slate-500">
          Pick at least {MIN_REQUIRED} interests so we can match you with people who get you
        </p>
      </div>

      {/* Progress pill */}
      <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-fuchsia-500 text-sm font-bold text-white">
          {count}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-slate-800">
            {count >= MIN_REQUIRED
              ? "You're all set — love the variety! 💕"
              : `Select ${MIN_REQUIRED - count} more to continue`}
          </p>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 transition-all duration-500"
              style={{
                width: `${Math.min((count / MIN_REQUIRED) * 100, 100)}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Interest chips */}
      <div className="flex flex-wrap gap-2.5">
        {INTEREST_OPTIONS.map(({ label, icon }) => {
          const selected = selectedInterests.includes(label);

          return (
            <button
              key={label}
              type="button"
              onClick={() => toggleInterest(label)}
              className={[
                "inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition-all duration-200",
                selected
                  ? "border-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 text-white shadow-[0_6px_16px_rgba(236,72,153,0.35)] scale-[1.03]"
                  : "border-slate-200 bg-white text-slate-600 hover:-translate-y-0.5 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600",
              ].join(" ")}
            >
              <span>{icon}</span>
              {label}
              {selected && <span className="ml-0.5">❤️</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default InterestsStep;