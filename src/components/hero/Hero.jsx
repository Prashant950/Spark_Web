import HeroButtons from "./HeroButtons";
// import HeroStats from "./HeroStats";

const ConstellationBackground = () => {
  // A loose network of pulsing nodes + connecting lines — the hero's
  // signature element: literal "sparks" forming connections, echoing
  // both the brand name and the platform's core idea.
  const nodes = [
    { x: 90, y: 60, r: 4, delay: "0s" },
    { x: 230, y: 30, r: 3, delay: "0.6s" },
    { x: 340, y: 110, r: 5, delay: "1.2s" },
    { x: 500, y: 45, r: 3, delay: "0.3s" },
    { x: 640, y: 95, r: 4, delay: "1.8s" },
    { x: 780, y: 40, r: 3, delay: "0.9s" },
    { x: 900, y: 100, r: 5, delay: "1.5s" },
    { x: 1030, y: 55, r: 3, delay: "0.4s" },
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [1, 3],
    [4, 6],
  ];

  return (
    <svg
      className="pointer-events-none absolute inset-x-0 top-8 mx-auto hidden h-[160px] w-full max-w-6xl opacity-40 lg:block"
      viewBox="0 0 1120 160"
      fill="none"
      aria-hidden="true"
    >
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="url(#spark-line)"
          strokeWidth="1"
        />
      ))}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill={i % 2 === 0 ? "#a78bfa" : "#f472b6"}
          className="motion-safe:animate-[spark-pulse_3.5s_ease-in-out_infinite]"
          style={{ animationDelay: n.delay, transformOrigin: `${n.x}px ${n.y}px` }}
        />
      ))}
      <defs>
        <linearGradient id="spark-line" x1="0" y1="0" x2="1120" y2="0">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#f472b6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.5" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative scroll-mt-24 overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.22),_transparent_30%),linear-gradient(135deg,_#f5f3ff_0%,_#ffffff_35%,_#f8fafc_100%)]"
    >
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes spark-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.6); }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(124,58,237,0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-200/50 blur-3xl motion-safe:animate-[float-slow_8s_ease-in-out_infinite]" />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-pink-200/45 blur-3xl motion-safe:animate-[float-slow_9s_ease-in-out_infinite]"
        style={{ animationDelay: "1.5s" }}
      />

      <ConstellationBackground />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-4 py-10 text-center sm:px-6 sm:py-14 lg:px-8 lg:py-20">
        <div className="flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-4 py-2 shadow-[0_12px_30px_rgba(124,58,237,0.08)] backdrop-blur-sm sm:px-5">
          <span className="text-sm motion-safe:animate-pulse">✨</span>
          <p className="text-[11px] font-semibold tracking-[0.12em] text-violet-700 uppercase sm:text-xs">
            India&apos;s #1 Social &amp; Lifestyle Support Platform
          </p>
        </div>

        <h1 className="mt-6 max-w-5xl text-4xl font-black leading-[1.08] tracking-[-0.04em] text-slate-900 sm:mt-8 sm:text-5xl lg:text-7xl">
          <span className="relative inline-block">
            <span className="absolute -inset-x-1 bottom-1 -z-10 h-3 rounded-full bg-gradient-to-r from-violet-300/80 to-pink-300/80 sm:h-4 lg:h-5" />
            <span className="bg-gradient-to-r from-violet-700 via-fuchsia-600 to-pink-600 bg-clip-text text-transparent">
              Spark
            </span>
          </span>{" "}
          for smarter everyday support
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:mt-8 sm:text-lg sm:leading-8 lg:text-xl">
          Safe, verified, professional support across Indian cities and pin codes —
          designed for convenience, trust, and a premium experience.
        </p>

        <HeroButtons />

        
      </div>
    </section>
  );
};

export default Hero;