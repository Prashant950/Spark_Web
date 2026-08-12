const stats = [
  {
    id: 1,
    value: "Millions",
    title: "Registered Spark Partners",
    bg: "bg-violet-50",
    text: "text-violet-700",
  },
  {
    id: 2,
    value: "All India",
    title: "Cities & Pin Codes",
    bg: "bg-pink-50",
    text: "text-pink-600",
  },
  {
    id: 3,
    value: "AI-Powered",
    title: "Verified Profiles",
    bg: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    id: 4,
    value: "100%",
    title: "Secure Payments",
    bg: "bg-green-50",
    text: "text-green-600",
  },
];

const AboutStats = () => {
  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.id}
              className={`${item.bg} rounded-2xl border border-gray-100 p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
            >
              <h3 className={`text-3xl font-extrabold ${item.text}`}>
                {item.value}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;