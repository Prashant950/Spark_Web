import { FaArrowRight, FaBolt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAuthModal } from "../auth/AuthModal";

const HeroButtons = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleCtaClick = () => {
    if (isAuthenticated) {
      navigate("/services");
      return;
    }

    openAuthModal();
  };

  return (
    <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-4 sm:mt-10 sm:max-w-none sm:flex-row sm:items-center">
      <button
        type="button"
        onClick={handleCtaClick}
        className="cursor-pointer group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-violet-700 via-indigo-600 to-fuchsia-600 px-6 py-3.5 text-base font-semibold text-white shadow-[0_18px_36px_rgba(109,40,217,0.24)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_40px_rgba(109,40,217,0.3)] sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        <span className="relative flex items-center justify-center gap-2">
          <FaBolt className="text-sm" />
          Find a Spark Partner
          <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>

      <button
        type="button"
        onClick={handleCtaClick}
        className="cursor-pointer group relative w-full rounded-full border-2 border-violet-600 bg-white/80 px-6 py-3.5 text-base font-semibold text-violet-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-600 hover:text-white sm:w-auto sm:px-8 sm:py-4 sm:text-lg"
      >
        <span className="flex items-center justify-center gap-2">
          Become a Spark Partner
          <FaArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </button>
    </div>
  );
};

export default HeroButtons;