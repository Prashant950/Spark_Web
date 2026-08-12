const Logo = () => {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      {/* Logo Icon */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-fuchsia-500 shadow-lg">
        <span className="text-xl font-bold text-white font-serif">
          S
        </span>

        {/* Heart accent */}
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="absolute bottom-1.5 right-1.5 h-2.5 w-2.5"
        >
          <path d="M12 21s-6.716-4.35-9.428-8.06C.86 10.35 1.2 6.9 4.1 5.2c2.2-1.3 4.8-.6 6.1 1.2l1.8 2.4 1.8-2.4c1.3-1.8 3.9-2.5 6.1-1.2 2.9 1.7 3.24 5.15 1.53 7.74C18.716 16.65 12 21 12 21z" />
        </svg>
      </div>

      {/* Brand Name */}
      <h1 className="text-2xl font-bold text-violet-700 font-serif tracking-tight">
        Spark
      </h1>
    </div>
  );
};

export default Logo;