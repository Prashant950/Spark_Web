import { FaUsers, FaMapMarkedAlt, FaShieldAlt, FaHeadset } from "react-icons/fa";

const stats = [
  {
    title: "Millions",
    subtitle: "of Spark Partners",
    icon: FaUsers,
    color: "text-violet-600",
    bg: "bg-violet-50",
    bar: "from-violet-500 to-violet-300",
  },
  {
    title: "All India",
    subtitle: "Coverage",
    icon: FaMapMarkedAlt,
    color: "text-pink-600",
    bg: "bg-pink-50",
    bar: "from-pink-500 to-pink-300",
  },
  {
    title: "AI-Verified",
    subtitle: "Profiles",
    icon: FaShieldAlt,
    color: "text-green-600",
    bg: "bg-green-50",
    bar: "from-green-500 to-green-300",
  },
  {
    title: "24/7",
    subtitle: "Support",
    icon: FaHeadset,
    color: "text-blue-600",
    bg: "bg-blue-50",
    bar: "from-blue-500 to-blue-300",
  },
];

const HeroStats = () => {
  return (
    <div className="mt-12 grid w-full max-w-5xl grid-cols-2 gap-4 sm:mt-16 sm:gap-5 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.title}
            className={`group relative overflow-hidden rounded-2xl ${item.bg} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:p-8`}
          >
            {/* top accent bar */}
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.bar}`} />

            <Icon
              className={`text-lg ${item.color} opacity-70 transition-transform duration-300 group-hover:scale-110 sm:text-2xl`}
            />

            <h3 className={`mt-3 text-2xl font-extrabold ${item.color} sm:mt-4 sm:text-4xl`}>
              {item.title}
            </h3>

            <p className="mt-1 text-sm text-slate-600 sm:mt-2 sm:text-lg">
              {item.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default HeroStats;