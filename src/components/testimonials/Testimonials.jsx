import { testimonials } from "../../data/testimonials";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  return (
    <section className="w-full overflow-x-hidden bg-emerald-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-emerald-600 sm:text-4xl lg:text-5xl">
            Sparx Success Stories
          </h2>

          <p className="mt-3 text-sm text-slate-600 sm:mt-4 sm:text-lg lg:text-xl">
            Real earnings from real sparxs
          </p>
        </div>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Button */}
        <div className="mt-8 text-center sm:mt-10 lg:mt-14">
          <button className="w-full max-w-xs rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-emerald-700 sm:w-auto sm:px-8 sm:py-4 sm:text-base">
            Start Your Earning Journey →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;