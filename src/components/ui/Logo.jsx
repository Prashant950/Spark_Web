const Logo = ({ light = false, className = "" }) => {
  return (
    <div
      className={`group flex items-center gap-2.5 cursor-pointer select-none transition-transform duration-300 hover:scale-[1.03] ${className}`}
    >
      <img
        src="/Sathi_Meet_Logo.png"
        alt="Sathi Meet Logo"
        className={`
          h-12 sm:h-14 md:h-16
          w-auto
          max-w-[550px] sm:max-w-[590px] md:max-w-[700px] 
          object-contain
          transition-all duration-300
          ${
            light
              ? "brightness-110 drop-shadow-[0_0_16px_rgba(236,72,153,0.4)] filter"
              : "drop-shadow-[0_2px_8px_rgba(236,72,153,0.15)]"
          }
        `}
      />
    </div>
  );
};

export default Logo;