import ServiceGrid from "./ServiceGrid";

const Services = () => {
  return (
    <section
      id="services"
      className="scroll-mt-24 bg-gradient-to-b from-white to-violet-50 py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center">
          <span className="inline-block rounded-full bg-violet-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-violet-600 sm:text-sm">
            What We Offer
          </span>

          <h2 className="mt-4 bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl lg:text-5xl">
            Our Services
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 sm:mt-4 sm:text-base lg:text-lg">
            Choose from our wide range of professional social and lifestyle
            support services across India.
          </p>
        </div>

        {/* Grid */}
        <ServiceGrid />
      </div>
    </section>
  );
};

export default Services;