import { FaArrowRight, FaBolt } from "react-icons/fa";

const HeroButtons = () => {
  return (
    <div className="mt-8 flex w-full max-w-md flex-col items-center justify-center gap-4 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row sm:gap-5">
      <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-violet-600 to-pink-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-violet-300/50 sm:w-auto sm:px-10 sm:py-4 sm:text-lg">
        {/* shine sweep on hover */}
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex items-center justify-center gap-2">
          <FaBolt className="text-sm" />
          Find a Sparx Partner
          <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>

      <button className="group relative w-full rounded-full border-2 border-violet-600 px-8 py-3.5 text-base font-semibold text-violet-700 transition-all duration-300 hover:bg-violet-600 hover:text-white sm:w-auto sm:px-10 sm:py-4 sm:text-lg">
        <span className="flex items-center justify-center gap-2">
          Become a Sparx Partner
          <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
};

export default HeroButtons;