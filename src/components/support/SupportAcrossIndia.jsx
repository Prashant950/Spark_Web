import { FaMapMarkedAlt, FaCity, FaMapMarkerAlt, FaBuilding } from "react-icons/fa";

const coverage = [
  {
    title: "All States",
    subtitle: "Every state in India",
    icon: FaMapMarkedAlt,
    titleColor: "text-violet-600",
    bgColor: "bg-violet-50",
    bar: "from-violet-500 to-violet-300",
  },
  {
    title: "All Districts",
    subtitle: "All 700+ districts",
    icon: FaCity,
    titleColor: "text-pink-600",
    bgColor: "bg-pink-50",
    bar: "from-pink-500 to-pink-300",
  },
  {
    title: "All Pin Codes",
    subtitle: "Complete pin code coverage",
    icon: FaMapMarkerAlt,
    titleColor: "text-green-600",
    bgColor: "bg-green-50",
    bar: "from-green-500 to-green-300",
  },
  {
    title: "Metro Cities",
    subtitle: "Tier 1, 2 & 3 cities",
    icon: FaBuilding,
    titleColor: "text-blue-600",
    bgColor: "bg-blue-50",
    bar: "from-blue-500 to-blue-300",
  },
];

const SupportAcrossIndia = () => {
  return (
    <section className="bg-violet-50 py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-10 lg:p-14">
          {/* Eyebrow */}
          <div className="text-center">
            <span className="inline-block rounded-full bg-violet-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-violet-600 sm:text-sm">
              Nationwide Coverage
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-4 text-center text-2xl font-extrabold leading-tight text-slate-800 sm:text-4xl lg:text-5xl">
            Professional Social Support Service{" "}
            <span className="bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
              Across India
            </span>
          </h2>

          {/* Paragraph 1 */}
          <p className="mt-6 text-sm leading-7 text-slate-700 sm:mt-8 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
            Looking for trusted <strong>social support service in India?</strong>{" "}
            Spark is <strong>India's #1 Social & Lifestyle Support Services Platform</strong>{" "}
            connecting you with professional support services across all Indian
            states, districts and pin codes.
          </p>

          {/* Paragraph 2 */}
          <p className="mt-5 text-sm leading-7 text-slate-700 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
            <strong>Find a Spark Partner near me</strong> has never been easier.
            Our platform connects you with verified, professional Spark partners
            who provide safe, reliable and consent-first services. With{" "}
            <strong>millions of registered Spark Partners</strong> and coverage
            across <strong>all Indian pin codes</strong>, Spark ensures quality
            professional support wherever you are.
          </p>

          {/* Cards */}
          <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {coverage.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`group relative overflow-hidden rounded-2xl ${item.bgColor} p-6 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-8`}
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.bar}`} />

                  <Icon
                    className={`mx-auto text-xl ${item.titleColor} opacity-70 transition-transform duration-300 group-hover:scale-110 sm:text-2xl`}
                  />

                  <h3 className={`mt-3 text-2xl font-bold ${item.titleColor} sm:mt-4 sm:text-3xl`}>
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm text-slate-600 sm:text-base lg:text-lg">
                    {item.subtitle}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Paragraph 3 */}
          <p className="mt-10 text-sm leading-7 text-slate-700 sm:mt-12 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
            Our <strong>social support services</strong> help with everyday
            activities through safe and professional care. All Spark Partners
            are background-verified, trained professionals committed to
            maintaining high service standards while ensuring your comfort,
            privacy and safety.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SupportAcrossIndia;