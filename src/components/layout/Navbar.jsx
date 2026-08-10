
import { Link } from "react-router-dom";
import Logo from "../ui/Logo";

const Navbar = () => {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
      {/* Logo */}
      <Logo />

      {/* Navigation */}
      <ul className="hidden items-center gap-8 text-[15px] font-medium text-gray-700 md:flex">
        <li>
          <a
            href="#home"
            className="transition-colors duration-300 hover:text-violet-600"
          >
            Home
          </a>
        </li>

        <li>
          <a
            href="#services"
            className="transition-colors duration-300 hover:text-violet-600"
          >
            Services
          </a>
        </li>

        <li>
          <a
            href="#why-choose-us"
            className="transition-colors duration-300 hover:text-violet-600"
          >
            Why Choose Us
          </a>
        </li>

        <li>
          <a
            href="#pricing"
            className="transition-colors duration-300 hover:text-violet-600"
          >
            Pricing
          </a>
        </li>

        <li>
          <a
            href="#faq"
            className="transition-colors duration-300 hover:text-violet-600"
          >
            FAQ
          </a>
        </li>

        <li>
          <a
            href="#contact"
            className="transition-colors duration-300 hover:text-violet-600"
          >
            Contact
          </a>
        </li>
      </ul>

      {/* Login Button */}
      <Link
        to="/admin-login"
        className="rounded-full bg-gradient-to-r from-violet-700 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
      >
        Login
      </Link>
    </nav>
  );
};

export default Navbar;

