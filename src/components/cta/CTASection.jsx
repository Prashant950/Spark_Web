const CTASection = () => {
  return (
    <section className="bg-gradient-to-r from-violet-700 via-purple-700 to-pink-600 py-20">
      <div className="mx-auto max-w-5xl px-5 text-center text-white">
        {/* Heading */}
        <h2 className="text-4xl font-extrabold leading-tight lg:text-5xl">
          Ready to Experience Sparx?
        </h2>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-violet-100">
          Whether you're looking for trusted professional support or want to
          become a Sparx Partner, your journey starts here.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button className="rounded-full bg-white px-8 py-4 font-semibold text-violet-700 shadow-lg transition-all duration-300 hover:scale-105">
            Find a Sparx Partner
          </button>

          <button className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-violet-700">
            Become a Sparx Partner
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;