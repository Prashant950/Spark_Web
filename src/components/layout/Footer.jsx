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
    <footer id="contact" className="bg-slate-950 text-white border-t border-slate-800/80">
      <div className="mx-auto max-w-7xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/">
              <Logo light={true} />
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              India's premier social support & lifestyle companion platform. Connecting verified, trained partners for safe, consent-first assistance across 700+ districts.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                24/7 Verified Support
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs text-violet-300">
                100% Encrypted & Safe
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-bold tracking-wider uppercase text-violet-400">
                {heading}
              </h3>

              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 transition-all duration-200 hover:text-white hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-slate-800/80 pt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Follow Us:</span>
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 border border-slate-800 text-slate-400 transition-all duration-300 hover:bg-violet-600 hover:border-violet-500 hover:text-white hover:-translate-y-0.5"
              >
                <Icon size={14} />
              </a>
            ))}
          </div>

          <div className="text-center sm:text-right text-xs text-slate-500 space-y-1">
            <p>© {new Date().getFullYear()} Sathi Meet. All rights reserved.</p>
            <p>Made with <span className="text-rose-500">❤️</span> in India • Powered by Nitecore Solutions Pvt Ltd</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;