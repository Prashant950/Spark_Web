import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  ArrowLeft, 
  Bell, 
  BriefcaseBusiness, 
  CreditCard, 
  LayoutGrid, 
  LogOut, 
  Menu, 
  Settings, 
  UserRound, 
  X,
  Loader,
  CheckCircle,
  Calendar,
  DollarSign,
  Package
} from "lucide-react";
import BuyServicesModal from "../components/services/BuyServicesModal";
import { useGetMyProfileQuery, useGetMyPurchasedServicesQuery } from "../features/api/apiSlice";

const profileItems = [
  { label: "Dashboard", icon: LayoutGrid },
  { label: "My Bookings", icon: CreditCard },
  { label: "Buy Services", icon: BriefcaseBusiness },
  { label: "Transactions", icon: ArrowLeft },
  { label: "Account Settings", icon: Settings },
];

const Services = () => {
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/");
  };

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data: profile } = useGetMyProfileQuery(undefined, {
    skip: !isAuthenticated,
  });
  
  // Fetch purchased services
  const { data: servicesData, isLoading, error, refetch: refetchServices } = useGetMyPurchasedServicesQuery(undefined, {
    skip: !isAuthenticated,
  });

  const handlePaymentSuccess = () => {
    // Show success message
    setShowSuccessMessage(true);
    // Refetch the purchased services to show newly bought services
    refetchServices();
    // Hide success message after 4 seconds
    setTimeout(() => setShowSuccessMessage(false), 4000);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const profileUser = profile || user;
  const purchasedServices = servicesData?.data || [];
  const totalSpent = servicesData?.totalSpent || 0;

  return (
    <>
      <div className="min-h-screen bg-[#f3f1f5] text-slate-800">
        {/* Responsive Header */}
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            
            {/* Logo & Direct Home Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                type="button"
                onClick={handleGoBack}
                className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 active:scale-95"
                aria-label="Go back"
              >
                <ArrowLeft size={22} />
              </button>

              <div 
                onClick={() => navigate("/")}
                className="cursor-pointer flex items-center gap-2 sm:gap-3"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-pink-500 text-sm font-semibold text-white shadow-md shadow-violet-200 sm:h-11 sm:w-11 sm:text-base">
                  S
                </div>
                <h1 className="text-xl font-semibold tracking-[-0.05em] text-violet-700 sm:text-2xl lg:text-3xl">Spark</h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 text-base font-medium text-slate-700 lg:flex lg:gap-8">
              <a href="#services" className="transition hover:text-violet-600">Services</a>
              <a href="#why-us" className="transition hover:text-violet-600">Why Choose Us</a>
              <a href="#pricing" className="transition hover:text-violet-600">Pricing</a>
            </nav>

            {/* Right Action Icons & Profile Dropdown */}
            <div ref={profileMenuRef} className="relative flex items-center gap-1.5 sm:gap-3">
              <button 
                type="button" 
                className="cursor-pointer hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-violet-600 sm:flex" 
                aria-label="Notifications"
              >
                <Bell size={18} />
              </button>
              
              <button 
                type="button" 
                className="cursor-pointer hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-violet-600 sm:flex" 
                aria-label="Settings"
              >
                <Settings size={18} />
              </button>

              {/* Profile Avatar Button */}
              <button
                type="button"
                onClick={() => setShowProfileMenu((prev) => !prev)}
                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md shadow-violet-300 transition hover:opacity-95 sm:h-11 sm:w-11"
                aria-label="Profile menu"
              >
                <UserRound size={18} />
              </button>

              {/* Mobile Hamburger Toggle */}
              <button
                type="button"
                onClick={() => setMobileNavOpen((prev) => !prev)}
                className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
                aria-label="Toggle mobile menu"
              >
                {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[260px] sm:w-[280px] rounded-[20px] border border-slate-200 bg-white p-3 shadow-2xl">
                  <div className="px-3 pb-3 pt-2 text-left border-b border-slate-100">
                    <div className="text-base font-semibold text-slate-800 truncate">
                      {profileUser?.fullName || profileUser?.name || "User"}
                    </div>
                    <div className="text-xs font-normal text-slate-500 truncate mt-0.5">
                      {profileUser?.contactNumber || profileUser?.email || "Active member"}
                    </div>
                  </div>

                  <div className="mt-2 space-y-1">
                    {profileItems.map(({ label, icon: Icon }) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setShowProfileMenu(false)}
                        className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
                      >
                        <Icon size={18} />
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="mt-2 border-t border-slate-100 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowProfileMenu(false)}
                      className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Responsive Mobile Drawer Menu */}
          {mobileNavOpen && (
            <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
              <nav className="flex flex-col gap-3 font-medium text-slate-700">
                <a 
                  href="#services" 
                  onClick={() => setMobileNavOpen(false)}
                  className="py-1.5 transition hover:text-violet-600"
                >
                  Services
                </a>
                <a 
                  href="#why-us" 
                  onClick={() => setMobileNavOpen(false)}
                  className="py-1.5 transition hover:text-violet-600"
                >
                  Why Choose Us
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMobileNavOpen(false)}
                  className="py-1.5 transition hover:text-violet-600"
                >
                  Pricing
                </a>
              </nav>
            </div>
          )}
        </header>

        {/* Main Body Section */}
        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mb-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-800 sm:text-4xl lg:text-5xl">
                My Services
              </h2>
              <p className="mt-1 text-sm font-normal text-slate-500 sm:text-base lg:text-lg">
                Your purchased service credits for booking Spark partners
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:brightness-110 active:scale-95 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-base lg:text-lg"
            >
              <span className="mr-1.5 text-xl leading-none">+</span>
              Buy Services
            </button>
          </div>

          {/* Success Toast Notification */}
          {showSuccessMessage && (
            <div className="mb-6 animate-in fade-in slide-in-from-top-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-md sm:p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                  <CheckCircle className="h-6 w-6 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-emerald-900">Payment Successful! 🎉</p>
                  <p className="text-sm text-emerald-700 mt-1">Your services have been added. They will appear below.</p>
                </div>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[28px] sm:p-8 lg:p-12">
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="h-12 w-12 animate-spin text-violet-600 mb-4" />
                <p className="text-slate-600 font-medium">Loading your services...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 shadow-sm sm:rounded-[28px] sm:p-8">
              <p className="text-red-700 font-medium">Error loading services. Please try again.</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && purchasedServices.length === 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[28px] sm:p-8 lg:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300 sm:h-24 sm:w-24">
                <BriefcaseBusiness size={32} className="sm:h-[52px] sm:w-[52px]" />
              </div>

              <h3 className="mt-5 text-center text-xl font-semibold tracking-[-0.04em] text-slate-800 sm:mt-7 sm:text-3xl lg:text-4xl">
                No Service Credits
              </h3>

              <p className="mx-auto mt-2 max-w-xl text-center text-sm font-normal text-slate-500 sm:mt-3 sm:text-lg lg:text-xl">
                Purchase services to search and book Spark partners
              </p>

              <div className="mt-6 text-center sm:mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:brightness-110 active:scale-95 sm:rounded-2xl sm:px-10 sm:py-4 sm:text-lg lg:text-xl"
                >
                  Buy Services
                </button>
              </div>
            </div>
          )}

          {/* Services Grid */}
          {!isLoading && !error && purchasedServices.length > 0 && (
            <>
              {/* Summary Stats */}
              <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total Services Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Services</p>
                      <p className="mt-2 text-3xl font-bold text-violet-600">{purchasedServices.length}</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100">
                      <Package className="h-7 w-7 text-violet-600" />
                    </div>
                  </div>
                </div>

                {/* Total Spent Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Total Spent</p>
                      <p className="mt-2 text-3xl font-bold text-pink-600">₹{totalSpent.toLocaleString("en-IN")}</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-100">
                      <DollarSign className="h-7 w-7 text-pink-600" />
                    </div>
                  </div>
                </div>

                {/* Used Services Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Uses Booked</p>
                      <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {purchasedServices.reduce((sum, s) => sum + s.purchaseCount, 0)}
                      </p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                      <CheckCircle className="h-7 w-7 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Active Status Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-600">Account Status</p>
                      <p className="mt-2 text-3xl font-bold text-blue-600">Active</p>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                      <span className="h-3 w-3 rounded-full bg-blue-600 animate-pulse"></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Services List */}
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {purchasedServices.map((service, index) => (
                  <div
                    key={service.serviceId}
                    className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:border-violet-300"
                  >
                    {/* Service Header */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-sm font-bold text-violet-600">
                            {index + 1}
                          </span>
                          <h3 className="text-xl font-semibold text-slate-800 group-hover:text-violet-600">
                            {service.title}
                          </h3>
                        </div>
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
                        <CheckCircle className="h-5 w-5 text-emerald-600" />
                      </div>
                    </div>

                    {/* Service Details Grid */}
                    <div className="mt-4 grid grid-cols-2 gap-4">
                      {/* Price */}
                      <div className="rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-medium text-slate-600">Price per Use</p>
                        <p className="mt-1 text-lg font-bold text-slate-800">
                          ₹{service.price.toLocaleString("en-IN")}
                        </p>
                      </div>

                      {/* Usage Count */}
                      <div className="rounded-xl bg-violet-50 p-3">
                        <p className="text-xs font-medium text-violet-600">Times Booked</p>
                        <p className="mt-1 text-lg font-bold text-violet-600">
                          {service.purchaseCount}x
                        </p>
                      </div>
                    </div>

                    {/* Last Used */}
                    <div className="mt-4 rounded-xl bg-slate-50 p-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-slate-600" />
                        <div className="flex-1">
                          <p className="text-xs font-medium text-slate-600">Last Booked</p>
                          <p className="text-sm font-semibold text-slate-800">
                            {new Date(service.lastPurchasedAt).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        className="flex-1 rounded-lg bg-violet-600 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 active:scale-95"
                      >
                        Book Now
                      </button>
                      <button
                        type="button"
                        className="flex-1 rounded-lg border border-slate-200 bg-white py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                      >
                        View History
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Buy More Button */}
              <div className="mt-8 text-center">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-8 py-4 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:brightness-110 active:scale-95 sm:rounded-2xl sm:px-10 sm:py-4 sm:text-lg"
                >
                  <span className="mr-2 text-xl leading-none">+</span>
                  Buy More Services
                </button>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Buy Services Modal */}
      <BuyServicesModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default Services;

// const profileItems = [
//   { label: "Dashboard", icon: LayoutGrid },
//   { label: "My Bookings", icon: CreditCard },
//   { label: "Buy Services", icon: BriefcaseBusiness },
//   { label: "Transactions", icon: ArrowLeft },
//   { label: "Account Settings", icon: Settings },
// ];

// const Services = () => {
//   const navigate = useNavigate();
//   const profileMenuRef = useRef(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(false);
//   const [mobileNavOpen, setMobileNavOpen] = useState(false);

//   const handleGoBack = () => {
//     if (window.history.length > 1) {
//       navigate(-1);
//       return;
//     }

//     navigate("/");
//   };

//   const { isAuthenticated, user } = useSelector((state) => state.auth);
//   const { data: profile } = useGetMyProfileQuery(undefined, {
//     skip: !isAuthenticated,
//   });

//   useEffect(() => {
//     const handleOutsideClick = (event) => {
//       if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
//         setShowProfileMenu(false);
//       }
//     };

//     document.addEventListener("mousedown", handleOutsideClick);
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, []);

//   const profileUser = profile || user;

//   return (
//     <>
//       <div className="min-h-screen bg-[#f3f1f5] text-slate-800">
//         {/* Responsive Header */}
//         <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
//           <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
            
//             {/* Logo & Direct Home Navigation */}
//             <div className="flex items-center gap-2 sm:gap-4">
//               <button
//                 type="button"
//                 onClick={handleGoBack}
//                 className="cursor-pointer flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-700 transition hover:bg-slate-100 active:scale-95"
//                 aria-label="Go back"
//               >
//                 <ArrowLeft size={22} />
//               </button>

//               <div 
//                 onClick={() => navigate("/")}
//                 className="cursor-pointer flex items-center gap-2 sm:gap-3"
//               >
//                 <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-700 to-pink-500 text-sm font-semibold text-white shadow-md shadow-violet-200 sm:h-11 sm:w-11 sm:text-base">
//                   S
//                 </div>
//                 <h1 className="text-xl font-semibold tracking-[-0.05em] text-violet-700 sm:text-2xl lg:text-3xl">Spark</h1>
//               </div>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="hidden items-center gap-6 text-base font-medium text-slate-700 lg:flex lg:gap-8">
//               <a href="#services" className="transition hover:text-violet-600">Services</a>
//               <a href="#why-us" className="transition hover:text-violet-600">Why Choose Us</a>
//               <a href="#pricing" className="transition hover:text-violet-600">Pricing</a>
//             </nav>

//             {/* Right Action Icons & Profile Dropdown */}
//             <div ref={profileMenuRef} className="relative flex items-center gap-1.5 sm:gap-3">
//               <button 
//                 type="button" 
//                 className="cursor-pointer hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-violet-600 sm:flex" 
//                 aria-label="Notifications"
//               >
//                 <Bell size={18} />
//               </button>
              
//               <button 
//                 type="button" 
//                 className="cursor-pointer hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:text-violet-600 sm:flex" 
//                 aria-label="Settings"
//               >
//                 <Settings size={18} />
//               </button>

//               {/* Profile Avatar Button */}
//               <button
//                 type="button"
//                 onClick={() => setShowProfileMenu((prev) => !prev)}
//                 className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-violet-600 to-pink-500 text-white shadow-md shadow-violet-300 transition hover:opacity-95 sm:h-11 sm:w-11"
//                 aria-label="Profile menu"
//               >
//                 <UserRound size={18} />
//               </button>

//               {/* Mobile Hamburger Toggle */}
//               <button
//                 type="button"
//                 onClick={() => setMobileNavOpen((prev) => !prev)}
//                 className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 lg:hidden"
//                 aria-label="Toggle mobile menu"
//               >
//                 {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
//               </button>

//               {/* Correctly Formatted Profile Dropdown Menu */}
//               {showProfileMenu && (
//                 <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[260px] sm:w-[280px] rounded-[20px] border border-slate-200 bg-white p-3 shadow-2xl">
//                   <div className="px-3 pb-3 pt-2 text-left border-b border-slate-100">
//                     <div className="text-base font-semibold text-slate-800 truncate">
//                       {profileUser?.fullName || profileUser?.name || "User"}
//                     </div>
//                     <div className="text-xs font-normal text-slate-500 truncate mt-0.5">
//                       {profileUser?.contactNumber || profileUser?.email || "Active member"}
//                     </div>
//                   </div>

//                   <div className="mt-2 space-y-1">
//                     {profileItems.map(({ label, icon: Icon }) => (
//                       <button
//                         key={label}
//                         type="button"
//                         onClick={() => setShowProfileMenu(false)}
//                         className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-violet-50 hover:text-violet-700"
//                       >
//                         <Icon size={18} />
//                         <span>{label}</span>
//                       </button>
//                     ))}
//                   </div>

//                   <div className="mt-2 border-t border-slate-100 pt-2">
//                     <button
//                       type="button"
//                       onClick={() => setShowProfileMenu(false)}
//                       className="cursor-pointer flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
//                     >
//                       <LogOut size={18} />
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Responsive Mobile Drawer Menu */}
//           {mobileNavOpen && (
//             <div className="border-t border-slate-200 bg-white px-5 py-4 lg:hidden">
//               <nav className="flex flex-col gap-3 font-medium text-slate-700">
//                 <a 
//                   href="#services" 
//                   onClick={() => setMobileNavOpen(false)}
//                   className="py-1.5 transition hover:text-violet-600"
//                 >
//                   Services
//                 </a>
//                 <a 
//                   href="#why-us" 
//                   onClick={() => setMobileNavOpen(false)}
//                   className="py-1.5 transition hover:text-violet-600"
//                 >
//                   Why Choose Us
//                 </a>
//                 <a 
//                   href="#pricing" 
//                   onClick={() => setMobileNavOpen(false)}
//                   className="py-1.5 transition hover:text-violet-600"
//                 >
//                   Pricing
//                 </a>
//               </nav>
//             </div>
//           )}
//         </header>

//         {/* Main Body Section */}
//         <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
//           <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mb-8">
//             <div>
//               <h2 className="text-2xl font-semibold tracking-[-0.04em] text-slate-800 sm:text-4xl lg:text-5xl">
//                 My Services
//               </h2>
//               <p className="mt-1 text-sm font-normal text-slate-500 sm:text-base lg:text-lg">
//                 Purchased service credits for booking Spark partners
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => setIsModalOpen(true)}
//               className="cursor-pointer inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:brightness-110 active:scale-95 sm:rounded-2xl sm:px-6 sm:py-3.5 sm:text-base lg:text-lg"
//             >
//               <span className="mr-1.5 text-xl leading-none">+</span>
//               Buy Services
//             </button>
//           </div>

//           <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:rounded-[28px] sm:p-8 lg:p-12">
//             <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-300 sm:h-24 sm:w-24">
//               <BriefcaseBusiness size={32} className="sm:h-[52px] sm:w-[52px]" />
//             </div>

//             <h3 className="mt-5 text-center text-xl font-semibold tracking-[-0.04em] text-slate-800 sm:mt-7 sm:text-3xl lg:text-4xl">
//               No Service Credits
//             </h3>

//             <p className="mx-auto mt-2 max-w-xl text-center text-sm font-normal text-slate-500 sm:mt-3 sm:text-lg lg:text-xl">
//               Purchase services to search and book Spark partners
//             </p>

//             <div className="mt-6 text-center sm:mt-8">
//               <button
//                 type="button"
//                 onClick={() => setIsModalOpen(true)}
//                 className="cursor-pointer inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-6 py-3 text-sm font-semibold text-white shadow-md shadow-violet-200 transition hover:brightness-110 active:scale-95 sm:rounded-2xl sm:px-10 sm:py-4 sm:text-lg lg:text-xl"
//               >
//                 Buy Services
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Modal Integration */}
//       <BuyServicesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
//     </>
//   );
// };

// export default Services;