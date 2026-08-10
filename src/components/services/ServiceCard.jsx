import { FaArrowRight } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const Icon = service.icon;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl">
      {/* Tinted glow overlay on hover, matches the card's own gradient */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 transition-opacity duration-300 group-hover:opacity-[0.06]`}
      />

      {/* Card Body */}
      <div className="relative flex-1 p-5 sm:p-6">
        {/* Icon */}
        <div className="relative inline-flex">
          <div
            className={`absolute inset-0 rounded-xl bg-gradient-to-r ${service.color} opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-50`}
          />
          <div
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${service.color} shadow-md transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl`}
          >
            <Icon className="text-lg text-white sm:text-2xl" />
          </div>
        </div>

        {/* Title */}
        <h3 className="mt-4 text-base font-bold text-slate-800 transition-colors duration-300 group-hover:text-violet-700 sm:mt-5 sm:text-xl">
          {service.title}
        </h3>

        {/* Description */}
        <p className="mt-1.5 text-xs leading-5 text-slate-500 sm:mt-2 sm:text-sm sm:leading-6">
          {service.description}
        </p>

        {/* Price */}
        <div className="mt-4 sm:mt-5">
          <span
            className={`inline-flex items-center rounded-full bg-gradient-to-r ${service.color} bg-clip-text text-base font-extrabold text-transparent sm:text-lg`}
          >
            {service.price}
          </span>
        </div>
      </div>

      {/* Button */}
      <button
        className={`relative flex w-full items-center justify-center gap-2 bg-gradient-to-r ${service.color} py-2.5 text-xs font-semibold text-white transition-all duration-300 group-hover:brightness-110 sm:py-3 sm:text-sm`}
      >
        {service.button}
        <FaArrowRight className="text-[10px] transition-transform duration-300 group-hover:translate-x-1 sm:text-xs" />
      </button>
    </div>
  );
};

export default ServiceCard;