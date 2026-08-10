import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import Logo from "../ui/Logo";

const footerLinks = {
  Company: [
    { label: "About", to: "/about" },
    { label: "FAQ", to: "/faq" },
    { label: "Contact", to: "/contact" },
  ],

  Legal: [
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms", to: "/terms" },
    { label: "Refund Policy", to: "/refund-policy" },
  ],

  Support: [
    { label: "Help Center", to: "/help-center" },
    { label: "Code of Conduct", to: "/code-of-conduct" },
    { label: "Admin Login", to: "/admin-login" },
  ],
};

const socialLinks = [
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaTwitter,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaWhatsapp,
    href: "https://wa.me/",
    label: "WhatsApp",
  },
];

const Footer = () => {
  return (
    <footer id="contact" className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-5 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-lg font-bold text-violet-300">
                {heading}
              </h3>

              <ul className="mt-5 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-slate-300 transition-all duration-200 hover:pl-1 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social */}

          <div>
            <h3 className="text-lg font-bold text-violet-300">
              Connect With Us
            </h3>

            <div className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 text-slate-300 transition-all duration-300 hover:bg-violet-600 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="mt-10 border-t border-slate-700" />

        {/* Bottom */}

        <div className="mt-8 flex flex-col items-center gap-5">
          <Link to="/">
            <Logo />
          </Link>

          <div className="text-center text-sm text-slate-400">
            <p>
              © {new Date().getFullYear()} Sparx (A unit of SET INDIA BUSINESS
              PVT LTD). All rights reserved.
            </p>

            <p className="mt-2">
              Made with <span className="text-pink-500">❤️</span> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;