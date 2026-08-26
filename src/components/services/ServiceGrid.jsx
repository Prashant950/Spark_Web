import { services } from "../../data/services";
import ServiceCard from "./ServiceCard";

const ServiceGrid = ({ onBook }) => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 md:grid-cols-3 lg:mt-14 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          onBook={onBook}
        />
      ))}
    </div>
  );
};

export default ServiceGrid;