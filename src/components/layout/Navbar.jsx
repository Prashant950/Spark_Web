import { useState } from "react";
import { Bell, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "../ui/Logo";
import AuthModal from "../auth/AuthModal";
import { useAuth } from "../../hooks/useAuth";
import { useGetMyProfileQuery } from "../../features/api/apiSlice";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const profileUser = profile || user;
  const userInitial = profileUser?.fullName?.trim()?.charAt(0)?.toUpperCase?.() || profileUser?.name?.trim()?.charAt(0)?.toUpperCase?.() || "P";

  const handleLogout = async () => {
    await signOut();
    setProfileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <Logo />

          <ul className="hidden items-center gap-7 text-[15px] font-medium text-slate-700 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="transition-colors duration-300 hover:text-violet-600"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 md:flex">
            {!isAuthenticated ? (
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="cursor-pointer inline-flex items-center justify-center rounded-full bg-gradient-to-r from-violet-700 via-indigo-600 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(109,40,217,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(109,40,217,0.35)]"
              >
                Login
              </button>
            ) : (
              <div className="relative flex items-center gap-3">
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:text-violet-600"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => setProfileMenuOpen((prev) => !prev)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-base font-bold text-white shadow-[0_10px_22px_rgba(168,85,247,0.35)] transition hover:opacity-95"
                  aria-label="Open profile menu"
                >
                  {userInitial}
                </button>

                {profileMenuOpen && (
                  <div className="absolute right-0 top-[calc(100%+12px)] z-20 w-[290px] rounded-[20px] border border-slate-200 bg-white p-3 shadow-[0_20px_50px_rgba(15,23,42,0.16)]">
                    <div className="px-2 pb-3 pt-1 text-left">
                      <div className="text-xl font-semibold tracking-[-0.04em] text-slate-700">
                        {profileUser?.fullName || profileUser?.name || "User"}
                      </div>
                      <div className="mt-1 text-base font-normal text-slate-500">
                        {profileUser?.contactNumber || profileUser?.email || "Active member"}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      {[
                        "Dashboard",
                        "My Bookings",
                        "Buy Services",
                        "Transactions",
                        "Account Settings",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setProfileMenuOpen(false);
                            if (item === "Buy Services") {
                              navigate("/services");
                              return;
                            }
                            navigate("/services");
                          }}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                        >
                          <UserRound size={18} />
                          <span>{item}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 border-t border-slate-200 pt-3">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-base font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-violet-200 hover:text-violet-600 md:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`h-0.5 w-5 rounded-full bg-current transition ${isOpen ? "-translate-y-2 -rotate-45" : ""}`} />
            </span>
          </button>
        </nav>

        {isOpen && (
          <div className="border-t border-slate-200 bg-white md:hidden">
            <div className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                >
                  {item.label}
                </a>
              ))}

              {!isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer mt-3 inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-violet-700 via-indigo-600 to-fuchsia-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(109,40,217,0.25)]"
                >
                  Login
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="cursor-pointer mt-3 inline-flex w-full items-center justify-center rounded-full border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </>
  );
};

export default Navbar;

