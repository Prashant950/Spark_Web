const AboutHero = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-5xl px-5 text-center">
        {/* Badge */}

        <div className="inline-flex rounded-full bg-violet-100 px-5 py-2">
          <span className="text-sm font-medium text-violet-700">
            🇮🇳 India's #1 Professional Social Support Platform
          </span>
        </div>

        {/* Heading */}

        <h1 className="mt-8 bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent lg:text-6xl">
          About Spark
        </h1>

        {/* Quote */}

        <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-slate-600">
          "People are extremely active on social media, but disconnected from
          relatives, neighbours and even close friends. When they need help —
          medical assistance, someone to shop with, or even just a movie
          partner — they often have no one to turn to."
        </p>

        {/* Bottom Text */}

        <p className="mt-8 text-lg font-semibold text-slate-800">
          This isn't just a quote. This is the reality of modern India.
        </p>
      </div>
    </section>
  );
};

export default AboutHero;