import { Heart } from "lucide-react";

const Logo = ({ light = false }) => {
  return (
    <div className="group flex items-center gap-3 cursor-pointer select-none">
      {/* Modern Logo Icon with gradient aura */}
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-700 via-indigo-600 to-fuchsia-500 shadow-md shadow-violet-500/25 transition-all duration-300 group-hover:scale-105 group-hover:shadow-violet-500/40">
        <span className="text-xl font-black text-white tracking-tighter">
          SM
        </span>

        {/* Floating Heart Accent */}
        <div className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 ring-2 ring-white">
          <Heart className="h-2.5 w-2.5 fill-white text-white" />
        </div>
      </div>

      {/* Brand Name */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className={`text-2xl font-black tracking-tight ${light ? "text-white" : "text-slate-900"}`}>
            Sathi
          </span>
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-2xl font-black tracking-tight text-transparent">
            Meet
          </span>
        </div>
        <span className="text-[10px] font-semibold tracking-widest uppercase text-violet-600/90 -mt-1">
          Support & Companion
        </span>
      </div>
    </div>
  );
};

export default Logo;