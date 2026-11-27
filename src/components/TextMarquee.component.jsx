import React from "react";
import Marquee from "react-fast-marquee";
import { BsCursorFill } from "react-icons/bs";

const TextMarquee = () => {
  return (
    <div className="w-full bg-transparent py-20 overflow-hidden no-scrollbar">
      <div className="w-full bg-transparent py-16 md:py-24 relative overflow-hidden flex flex-col justify-center">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"></div>

        {/* --- ROW 1: Scrolling RIGHT --- */}
        <div className="mb-8 md:mb-12 relative z-10 overflow-hidden">
          <Marquee
            direction="right"
            speed={50}
            gradient={false}
            autoFill
            className="overflow-hidden"
          >
            <div className="flex items-center gap-10 md:gap-20 px-5 overflow-hidden">
              <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                ORGANIC
              </span>

              <ContentBadge />

              <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                GROWTH
              </span>

              <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tighter">
                VIRAL
              </span>
            </div>
          </Marquee>
        </div>

        {/* --- ROW 2: Scrolling LEFT --- */}
        <div className="relative z-10 overflow-hidden">
          <Marquee
            direction="left"
            speed={60}
            gradient={false}
            autoFill
            className="overflow-hidden"
          >
            <div className="flex items-center gap-10 md:gap-20 px-5 overflow-hidden">
              <span className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter">
                CROSS
              </span>

              <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                PROMOTION
              </span>

              <ContentBadge color="blue" />

              <span className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                MARKETING
              </span>

              <span className="text-5xl md:text-7xl font-black text-[#5b58e6] tracking-tighter">
                STRATEGY
              </span>
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

// --- Badge Component ---
const ContentBadge = ({ color = "purple" }) => {
  const bgClass = color === "blue" ? "bg-blue-600" : "bg-purple-600";
  const rotateClass = color === "blue" ? "rotate-12" : "-rotate-12";

  return (
    <div
      className={`relative px-4 py-1 ${bgClass} rounded-full flex items-center gap-2 transform ${rotateClass} shadow-lg border border-white/20`}
    >
      <span className="text-[10px] md:text-xs font-bold text-white uppercase tracking-widest">
        content
      </span>
      <BsCursorFill className="absolute -bottom-3 -right-3 text-white text-lg drop-shadow-md" />
    </div>
  );
};

export default TextMarquee;
