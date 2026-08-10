import { coverage } from "../../data/coverage";

const Coverage = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5">
        {/* Heading */}
        <div className="text-center">
          <h2 className="bg-gradient-to-r from-violet-700 to-pink-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Sparx Available Across All India
          </h2>

          <p className="mt-4 text-xl text-slate-600">
            Trusted professionals available nationwide.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {coverage.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-violet-100 bg-violet-50 p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <h3 className="text-3xl font-bold text-violet-700">
                {item.title}
              </h3>

              <p className="mt-4 leading-8 text-slate-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <p className="mx-auto mt-12 max-w-4xl text-center text-lg leading-8 text-slate-600">
          Whether you're in a metro city or a smaller town, Sparx helps you
          connect with trusted and verified professionals across India.
        </p>
      </div>
    </section>
  );
};

export default Coverage;