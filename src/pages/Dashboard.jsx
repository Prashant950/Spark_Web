// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // Small pill button used to jump straight into a specific onboarding
// // step from the dashboard, e.g. /dashboard/onboarding?step=interests
// const EditButton = ({ step, label = "Edit" }) => {
//   const navigate = useNavigate();

//   return (
//     <button
//       type="button"
//       onClick={() => navigate(`/dashboard/onboarding?step=${step}`)}
//       className="inline-flex shrink-0 items-center gap-1 rounded-full border border-rose-100 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-600 transition hover:bg-rose-100"
//     >
//       ✏️ {label}
//     </button>
//   );
// };

// const SectionCard = ({ icon, title, step, children }) => (
//   <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-md">
//     <div className="flex items-start justify-between gap-3">
//       <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
//         <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-base">
//           {icon}
//         </span>
//         {title}
//       </p>

//       <EditButton step={step} />
//     </div>

//     <div className="mt-4">{children}</div>
//   </div>
// );

// const EmptyValue = () => (
//   <span className="text-sm italic text-slate-400">Not added yet</span>
// );

// const Dashboard = () => {
//   const navigate = useNavigate();

//   const storedUser = localStorage.getItem("user");

//   let user = null;

//   try {
//     user = storedUser ? JSON.parse(storedUser) : null;
//   } catch (error) {
//     console.error("Failed to read stored user:", error);
//   }

//   const [profile, setProfile] = useState(null);
//   const [loadingProfile, setLoadingProfile] = useState(true);

//   useEffect(() => {
//     const loadProfile = async () => {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         setLoadingProfile(false);
//         return;
//       }

//       try {
//         const response = await fetch(`${API_URL}/api/profile/me`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (response.ok) {
//           const result = await response.json();
//           const fetchedProfile = result.profile || result.data || result;

//           if (
//             fetchedProfile &&
//             typeof fetchedProfile === "object" &&
//             Object.keys(fetchedProfile).length > 0
//           ) {
//             setProfile(fetchedProfile);
//           }
//         }
//       } catch (error) {
//         console.error("Failed to load profile:", error);
//       } finally {
//         setLoadingProfile(false);
//       }
//     };

//     loadProfile();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/admin-login");
//   };

//   const hasProfile =
//     !!profile &&
//     ((profile.photos && profile.photos.length > 0) ||
//       !!profile.bio ||
//       !!profile.gender);

//   const photos = profile?.photos || [];
//   const interests = profile?.interests || [];
//   const lookingFor = profile?.lookingFor || [];
//   const lifestyle = profile?.lifestyle || {};
//   const location = profile?.location || {};
//   const ageRange = profile?.ageRange || {};

//   const cards = [
//     {
//       label: "Profile",
//       icon: "💗",
//       value: hasProfile ? "Completed" : "Incomplete",
//       footer: hasProfile ? "✓ Profile is complete" : "Finish setting up",
//       footerClass: hasProfile ? "text-green-600" : "text-amber-500",
//     },
//     {
//       label: "Discover",
//       icon: "🔥",
//       value: "Find Matches",
//       isAction: true,
//     },
//     {
//       label: "Likes",
//       icon: "❤️",
//       value: "0",
//       footer: "No likes yet",
//       footerClass: "text-slate-400",
//     },
//     {
//       label: "Messages",
//       icon: "💬",
//       value: "0",
//       footer: "No conversations yet",
//       footerClass: "text-slate-400",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-[#faf8fb]">
//       {/* Header */}
//       <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/90 backdrop-blur">
//         <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
//           <div>
//             <h1 className="flex items-center gap-1.5 text-xl font-bold text-slate-900">
//               Sathi Meet <span className="text-lg">💘</span>
//             </h1>

//             <p className="text-xs text-slate-500">
//               Your Dating Dashboard
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleLogout}
//             className="rounded-xl bg-red-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-4"
//           >
//             Logout
//           </button>
//         </div>
//       </header>

//       {/* Main */}
//       <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
//         <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 p-6 text-white shadow-xl sm:p-8">
//           <span className="pointer-events-none absolute -right-4 -top-4 text-7xl opacity-20 sm:text-8xl">
//             💕
//           </span>

//           <p className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80">
//             <span>👋</span> Welcome back
//           </p>

//           <h2 className="relative mt-2 text-2xl font-extrabold sm:text-3xl">
//             {user?.fullName || "User"} 💖
//           </h2>

//           <p className="relative mt-2 max-w-xl text-sm text-white/80">
//             {hasProfile
//               ? "Your profile is complete. Start discovering people and find meaningful connections."
//               : "Finish building your profile so people can start discovering you."}
//           </p>

//           {!loadingProfile && !hasProfile && (
//             <button
//               type="button"
//               onClick={() => navigate("/dashboard/onboarding")}
//               className="relative mt-4 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-rose-600 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
//             >
//               Complete your profile →
//             </button>
//           )}
//         </div>

//         {/* Dashboard Cards */}
//         <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
//           {cards.map((card) => (
//             <div
//               key={card.label}
//               className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-0.5 hover:shadow-md"
//             >
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-slate-500">{card.label}</p>
//                 <span className="text-lg">{card.icon}</span>
//               </div>

//               <p className="mt-2 text-xl font-bold text-slate-900">
//                 {card.value}
//               </p>

//               {card.isAction ? (
//                 <button
//                   type="button"
//                   className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-rose-600 transition group-hover:gap-1.5 hover:text-rose-700"
//                 >
//                   Start discovering →
//                 </button>
//               ) : (
//                 <p className={`mt-1 text-xs ${card.footerClass}`}>
//                   {card.footer}
//                 </p>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Profile Overview */}
//         <div className="mt-10">
//           <div className="flex flex-wrap items-center justify-between gap-3">
//             <div>
//               <h3 className="flex items-center gap-2 text-xl font-bold text-slate-900">
//                 <span>📋</span> Your Profile
//               </h3>
//               <p className="mt-1 text-sm text-slate-500">
//                 Everything you shared during onboarding — tap edit on any
//                 card to update it
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={() => navigate("/dashboard/onboarding")}
//               className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
//             >
//               ✏️ Edit Full Profile
//             </button>
//           </div>

//           {loadingProfile ? (
//             <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white px-6 py-8 shadow-sm ring-1 ring-slate-100">
//               <span className="animate-pulse text-2xl">💗</span>
//               <p className="text-sm text-slate-500">Loading your profile...</p>
//             </div>
//           ) : !hasProfile ? (
//             <div className="mt-5 rounded-2xl border-2 border-dashed border-rose-200 bg-rose-50/50 px-6 py-10 text-center">
//               <p className="text-3xl">💌</p>
//               <p className="mt-2 text-sm font-semibold text-slate-700">
//                 You haven&apos;t completed your profile yet
//               </p>
//               <p className="mt-1 text-xs text-slate-500">
//                 Finish onboarding so we can start finding your matches
//               </p>
//               <button
//                 type="button"
//                 onClick={() => navigate("/dashboard/onboarding")}
//                 className="mt-4 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-pink-600 to-fuchsia-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-500/20 transition hover:-translate-y-0.5 hover:shadow-xl"
//               >
//                 Start onboarding →
//               </button>
//             </div>
//           ) : (
//             <div className="mt-5 grid gap-5 lg:grid-cols-2">
//               {/* Basic Info */}
//               <SectionCard icon="💘" title="Basic Information" step="basic">
//                 <div className="flex flex-wrap gap-4">
//                   <div>
//                     <p className="text-xs text-slate-400">Age</p>
//                     <p className="text-sm font-semibold text-slate-800">
//                       {profile.age || <EmptyValue />}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Gender</p>
//                     <p className="text-sm font-semibold text-slate-800">
//                       {profile.gender || <EmptyValue />}
//                     </p>
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* Interests */}
//               <SectionCard icon="💞" title="Interests" step="interests">
//                 {interests.length > 0 ? (
//                   <div className="flex flex-wrap gap-2">
//                     {interests.map((interest) => (
//                       <span
//                         key={interest}
//                         className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600"
//                       >
//                         {interest}
//                       </span>
//                     ))}
//                   </div>
//                 ) : (
//                   <EmptyValue />
//                 )}
//               </SectionCard>

//               {/* Physical & Preferences */}
//               <SectionCard
//                 icon="💫"
//                 title="Physical & Preferences"
//                 step="physical"
//               >
//                 <div className="flex flex-wrap gap-4">
//                   <div>
//                     <p className="text-xs text-slate-400">Height</p>
//                     <p className="text-sm font-semibold text-slate-800">
//                       {profile.height || <EmptyValue />}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Weight</p>
//                     <p className="text-sm font-semibold text-slate-800">
//                       {profile.weight || <EmptyValue />}
//                     </p>
//                   </div>
//                   <div>
//                     <p className="text-xs text-slate-400">Age range</p>
//                     <p className="text-sm font-semibold text-slate-800">
//                       {ageRange.min ?? 18} - {ageRange.max ?? 99}
//                     </p>
//                   </div>
//                 </div>

//                 {lookingFor.length > 0 && (
//                   <div className="mt-3 flex flex-wrap gap-2">
//                     {lookingFor.map((item) => (
//                       <span
//                         key={item}
//                         className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600"
//                       >
//                         {item}
//                       </span>
//                     ))}
//                   </div>
//                 )}
//               </SectionCard>

//               {/* Lifestyle */}
//               <SectionCard icon="🥂" title="Lifestyle" step="lifestyle">
//                 <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
//                   {[
//                     ["drinking", "🍷", "Drinking"],
//                     ["smoking", "🚬", "Smoking"],
//                     ["workout", "🏋️", "Workout"],
//                     ["diet", "🥗", "Diet"],
//                     ["pets", "🐾", "Pets"],
//                   ].map(([key, icon, label]) => (
//                     <div key={key}>
//                       <p className="text-xs text-slate-400">
//                         {icon} {label}
//                       </p>
//                       <p className="text-sm font-semibold text-slate-800">
//                         {lifestyle[key] || <EmptyValue />}
//                       </p>
//                     </div>
//                   ))}
//                 </div>
//               </SectionCard>

//               {/* Location */}
//               <SectionCard icon="📍" title="Location" step="location">
//                 <p className="text-sm font-semibold text-slate-800">
//                   {[location.city, location.state, location.country]
//                     .filter(Boolean)
//                     .join(", ") || <EmptyValue />}
//                 </p>
//                 {location.address && (
//                   <p className="mt-1 text-xs text-slate-500">
//                     {location.address}
//                   </p>
//                 )}
//               </SectionCard>

//               {/* Career & About */}
//               <SectionCard icon="💼" title="Career & About" step="career">
//                 <div className="space-y-2">
//                   <div className="flex flex-wrap gap-4">
//                     <div>
//                       <p className="text-xs text-slate-400">Job title</p>
//                       <p className="text-sm font-semibold text-slate-800">
//                         {profile.jobTitle || <EmptyValue />}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-400">Company</p>
//                       <p className="text-sm font-semibold text-slate-800">
//                         {profile.company || <EmptyValue />}
//                       </p>
//                     </div>
//                     <div>
//                       <p className="text-xs text-slate-400">Education</p>
//                       <p className="text-sm font-semibold text-slate-800">
//                         {profile.educationLevel || <EmptyValue />}
//                       </p>
//                     </div>
//                   </div>

//                   <div>
//                     <p className="text-xs text-slate-400">Bio</p>
//                     <p className="text-sm text-slate-700">
//                       {profile.bio || <EmptyValue />}
//                     </p>
//                   </div>
//                 </div>
//               </SectionCard>

//               {/* Photos */}
//               <SectionCard icon="📸" title="Photos" step="photos">
//                 {photos.length > 0 ? (
//                   <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
//                     {photos.map((photo, index) => (
//                       <div
//                         key={`${photo}-${index}`}
//                         className="relative aspect-square overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200"
//                       >
//                         <img
//                           src={photo}
//                           alt={`Profile ${index + 1}`}
//                           className="h-full w-full object-cover"
//                         />
//                         {index === 0 && (
//                           <span className="absolute bottom-1 left-1 rounded-full bg-gradient-to-r from-rose-500 to-fuchsia-500 px-1.5 py-0.5 text-[9px] font-semibold text-white shadow">
//                             ❤️
//                           </span>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <EmptyValue />
//                 )}
//               </SectionCard>
//             </div>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  X,
  Star,
  Heart,
  Zap,
  Flame,
  MessageSquare,
  User,
  LogOut,
  MapPin,
  Briefcase,
  Sparkles,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Dummy profiles for Discovery Cards
const INITIAL_PROFILES = [
  {
    id: 1,
    name: "Riya Sharma",
    age: 22,
    city: "Mumbai",
    job: "UI/UX Designer",
    bio: "Coffee lover ☕ | Foodie 🍕 | Let's explore the city together ✨",
    photos: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop",
    ],
    interests: ["Travel", "Photography", "Music", "Art"],
  },
  {
    id: 2,
    name: "Ananya Roy",
    age: 24,
    city: "Delhi",
    job: "Software Engineer",
    bio: "Dog lover 🐶 | Weekend trekker 🏔️ | Looking for genuine connection 💖",
    photos: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop",
    ],
    interests: ["Coding", "Hiking", "Reading"],
  },
  {
    id: 3,
    name: "Kavya Patel",
    age: 21,
    city: "Bangalore",
    job: "Content Creator",
    bio: "Dance is life 💃 | Sunshine in human form ☀️",
    photos: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop",
    ],
    interests: ["Dancing", "Fitness", "Fashion"],
  },
];

// Tinder Swipeable Card Component
const SwipeCard = ({ profile, onSwipe, isTop }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Swipe Stamp Overlays
  const likeOpacity = useTransform(x, [10, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-10, -100], [0, 1]);
  const superLikeOpacity = useTransform(y, [-10, -100], [0, 1]);

  const [photoIndex, setPhotoIndex] = useState(0);

  const handleDragEnd = (_, info) => {
    if (info.offset.x > 120) {
      onSwipe("right", profile.id);
    } else if (info.offset.x < -120) {
      onSwipe("left", profile.id);
    } else if (info.offset.y < -120) {
      onSwipe("up", profile.id);
    }
  };

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        y: isTop ? y : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
      }}
      drag={isTop ? true : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ scale: isTop ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-3xl bg-slate-900 shadow-2xl"
    >
      {/* Photo */}
      <img
        src={profile.photos[photoIndex] || profile.photos[0]}
        alt={profile.name}
        className="h-full w-full object-cover pointer-events-none"
      />

      {/* Photo Indicators */}
      {profile.photos.length > 1 && (
        <div className="absolute top-3 left-3 right-3 flex gap-1 z-20">
          {profile.photos.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i === photoIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Photo Navigation Click Overlay */}
      {profile.photos.length > 1 && (
        <div className="absolute top-0 inset-x-0 h-2/3 flex z-10">
          <div
            className="w-1/2 h-full"
            onClick={() => setPhotoIndex((prev) => Math.max(0, prev - 1))}
          />
          <div
            className="w-1/2 h-full"
            onClick={() =>
              setPhotoIndex((prev) =>
                Math.min(profile.photos.length - 1, prev + 1)
              )
            }
          />
        </div>
      )}

      {/* Swipe Stamps Indicator */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 z-30 -rotate-12 rounded-xl border-4 border-green-500 px-4 py-1 text-2xl font-black uppercase text-green-500"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 z-30 rotate-12 rounded-xl border-4 border-red-500 px-4 py-1 text-2xl font-black uppercase text-red-500"
          >
            NOPE
          </motion.div>
          <motion.div
            style={{ opacity: superLikeOpacity }}
            className="absolute bottom-32 inset-x-0 mx-auto w-max z-30 rounded-xl border-4 border-blue-400 px-4 py-1 text-2xl font-black uppercase text-blue-400"
          >
            SUPER LIKE
          </motion.div>
        </>
      )}

      {/* Bottom Profile Details Gradient Box */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 text-white pointer-events-none">
        <div className="flex items-baseline gap-2">
          <h2 className="text-3xl font-extrabold">{profile.name}</h2>
          <span className="text-2xl font-normal text-white/80">
            {profile.age}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-3 text-sm text-white/80">
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {profile.city}
          </span>
          {profile.job && (
            <span className="flex items-center gap-1">
              <Briefcase size={14} /> {profile.job}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm line-clamp-2 text-white/90">{profile.bio}</p>

        {/* Interests Badges */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {profile.interests?.map((interest) => (
            <span
              key={interest}
              className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-medium text-white backdrop-blur-md"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("discover");
  const [profiles, setProfiles] = useState(INITIAL_PROFILES);
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  const storedUser = localStorage.getItem("user");
  let user = null;
  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to read user:", error);
  }

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoadingProfile(false);
        return;
      }
      try {
        const response = await fetch(`${API_URL}/api/profile/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const result = await response.json();
          const fetchedProfile = result.profile || result.data || result;
          if (fetchedProfile && typeof fetchedProfile === "object") {
            setProfile(fetchedProfile);
          }
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };
    loadProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin-login");
  };

  // Button Action Handlers
  const handleSwipe = (direction, id) => {
    const currentCard = profiles.find((p) => p.id === id);
    if (currentCard) {
      setHistory((prev) => [...prev, currentCard]);
      setProfiles((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleRewind = () => {
    if (history.length === 0) return;
    const lastProfile = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setProfiles((prev) => [lastProfile, ...prev]);
  };

  const currentProfile = profiles[0];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Left Navigation Sidebar */}
      <aside className="w-80 flex-col border-r border-slate-800 bg-slate-900/80 backdrop-blur-md hidden md:flex">
        {/* User Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full ring-2 ring-rose-500 bg-slate-800">
              <img
                src={
                  profile?.photos?.[0] ||
                  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white leading-tight">
                {user?.fullName || "My Profile"}
              </h3>
              <p className="text-xs text-rose-500 font-medium">Verified Partner</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Logout"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-800 hover:text-red-400 transition"
          >
            <LogOut size={18} />
          </button>
        </div>

        {/* Sidebar Nav Tabs */}
        <div className="flex border-b border-slate-800 p-2 gap-1 bg-slate-950/40">
          {[
            { id: "discover", label: "Matches", icon: Flame },
            { id: "likes", label: "Likes", icon: Heart },
            { id: "messages", label: "Chats", icon: MessageSquare },
            { id: "profile", label: "Profile", icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex flex-col items-center py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === tab.id
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30"
                    : "text-slate-400 hover:bg-slate-800/60 hover:text-slate-200"
                }`}
              >
                <Icon size={18} className="mb-1" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Sidebar Main Content Dynamic Container */}
        <div className="flex-1 overflow-y-auto p-4">
          {activeTab === "discover" && (
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Discovery Settings
              </h4>
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Location</span>
                  <span className="font-semibold text-rose-500">
                    {profile?.location?.city || "Nearby"}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Distance</span>
                  <span className="font-semibold text-white">50 km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Age Preference</span>
                  <span className="font-semibold text-white">18 - 30</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "likes" && (
            <div className="text-center py-12">
              <Heart size={40} className="mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">No Likes Yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Keep swiping! When someone likes you back, they will appear here.
              </p>
            </div>
          )}

          {activeTab === "messages" && (
            <div className="text-center py-12">
              <MessageSquare size={40} className="mx-auto text-slate-600 mb-2" />
              <p className="text-sm font-semibold text-slate-300">
                No Conversations
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Matches will appear here to start chatting.
              </p>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4 text-center">
                <h4 className="font-bold text-white">{user?.fullName}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  {profile?.bio || "No bio added"}
                </p>
                <button
                  onClick={() => navigate("/dashboard/onboarding")}
                  className="mt-4 w-full rounded-xl bg-rose-600 py-2 text-xs font-semibold text-white hover:bg-rose-700 transition"
                >
                  ✏️ Edit Full Profile
                </button>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Swipe Section (Center) */}
      <main className="flex-1 flex flex-col items-center justify-between p-4 md:p-6 relative bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Brand Header Mobile */}
        <header className="w-full max-w-sm flex items-center justify-between md:hidden pb-2">
          <h1 className="text-xl font-bold text-rose-500 flex items-center gap-1">
            <Flame className="fill-rose-500" /> Sathi Meet
          </h1>
          <button onClick={handleLogout} className="text-slate-400">
            <LogOut size={20} />
          </button>
        </header>

        {/* Swipe Card Deck Wrapper */}
        <div className="relative w-full max-w-sm aspect-[3/4] max-h-[580px] my-auto">
          <AnimatePresence>
            {profiles.length > 0 ? (
              profiles.map((p, index) => {
                const isTop = index === 0;
                return (
                  <SwipeCard
                    key={p.id}
                    profile={p}
                    isTop={isTop}
                    onSwipe={handleSwipe}
                  />
                );
              })
            ) : (
              <div className="flex flex-col items-center justify-center h-full rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-8 text-center">
                <div className="h-16 w-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 animate-bounce">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-lg font-bold text-white">
                  No More Profiles!
                </h3>
                <p className="text-xs text-slate-400 mt-2 max-w-xs">
                  You have reviewed everyone nearby. Check back later or adjust your filters.
                </p>
                <button
                  onClick={() => setProfiles(INITIAL_PROFILES)}
                  className="mt-6 rounded-full bg-rose-600 px-6 py-2.5 text-xs font-semibold text-white shadow-lg shadow-rose-600/30 hover:bg-rose-700 transition"
                >
                  Reload Profiles
                </button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* 5 Real Partner Action Control Buttons */}
        <div className="w-full max-w-sm flex items-center justify-between px-2 pt-4 pb-2 z-20">
          {/* 1. Rewind Button */}
          <button
            onClick={handleRewind}
            disabled={history.length === 0}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/30 bg-slate-900 text-amber-400 shadow-lg transition hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <RotateCcw size={20} />
          </button>

          {/* 2. Reject / Nope Button */}
          <button
            onClick={() => currentProfile && handleSwipe("left", currentProfile.id)}
            disabled={!currentProfile}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30 bg-slate-900 text-red-500 shadow-xl transition hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <X size={28} strokeWidth={2.5} />
          </button>

          {/* 3. Super Like Button */}
          <button
            onClick={() => currentProfile && handleSwipe("up", currentProfile.id)}
            disabled={!currentProfile}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-400/30 bg-slate-900 text-blue-400 shadow-lg transition hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <Star size={20} className="fill-blue-400/20" />
          </button>

          {/* 4. Like / Heart Button */}
          <button
            onClick={() => currentProfile && handleSwipe("right", currentProfile.id)}
            disabled={!currentProfile}
            className="flex h-14 w-14 items-center justify-center rounded-full border border-green-500/30 bg-slate-900 text-green-400 shadow-xl transition hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <Heart size={28} className="fill-green-400/20" strokeWidth={2.5} />
          </button>

          {/* 5. Boost Button */}
          <button
            disabled={!currentProfile}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/30 bg-slate-900 text-purple-400 shadow-lg transition hover:scale-110 active:scale-95 disabled:opacity-30 disabled:hover:scale-100"
          >
            <Zap size={20} className="fill-purple-400/20" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;