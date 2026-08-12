import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { openAuthModal } from "../auth/AuthModal";

const CTASection = () => {
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
    <section className="bg-gradient-to-r from-violet-700 via-purple-700 to-pink-600 py-20">
      <div className="mx-auto max-w-5xl px-5 text-center text-white">
        <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">
          Ready to Experience Spark?
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-violet-100">
          Whether you're looking for trusted professional support or want to
          become a Spark Partner, your journey starts here.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={handleCtaClick}
            className="cursor-pointer rounded-full bg-white px-8 py-4 font-semibold text-violet-700 shadow-lg transition-all duration-300 hover:scale-105"
          >
            Find a Spark Partner
          </button>

          <button
            type="button"
            onClick={handleCtaClick}
            className="cursor-pointer rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-violet-700"
          >
            Become a Spark Partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;