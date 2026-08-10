import { features } from "../../data/features";
import FeatureCard from "./FeatureCard";

const WhyChooseUs = () => {
  return (
    <section
      id="why-choose-us"
      className="scroll-mt-24 bg-gradient-to-b from-white to-violet-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5">
        <div className="text-center">
          <span className="inline-block rounded-full bg-violet-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-violet-600 sm:text-sm">
            Why Sparx
          </span>

          <h2 className="mt-4 bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl">
            Why Choose Us
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:mt-4 sm:text-lg lg:text-xl">
            India's #1 Trusted Social & Lifestyle Support Platform
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:mt-12 sm:gap-6 md:grid-cols-2 lg:mt-16 lg:gap-8 xl:grid-cols-4">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;