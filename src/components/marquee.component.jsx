import React from "react";
import { FaReact, FaHtml5, FaCss3Alt } from "react-icons/fa";
import {
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiCanva,
  SiTailwindcss,
  SiJavascript,
  SiInstagram,
} from "react-icons/si";

const logos = [
  // Removed "hover:" prefix so colors are always visible
  {
    name: "After Effects",
    icon: SiAdobeaftereffects,
    color: "text-[#9999FF]",
  },
  {
    name: "Premiere Pro",
    icon: SiAdobepremierepro,
    color: "text-[#9999FF]",
  },
  { name: "Canva", icon: SiCanva, color: "text-[#00C4CC]" },
  { name: "React", icon: FaReact, color: "text-[#61DAFB]" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-[#06B6D4]" },
  { name: "HTML5", icon: FaHtml5, color: "text-[#E34F26]" },
  { name: "CSS3", icon: FaCss3Alt, color: "text-[#1572B6]" },
  { name: "JavaScript", icon: SiJavascript, color: "text-[#F7DF1E]" },
  { name: "Instagram", icon: SiInstagram, color: "text" },
 
];

const LogoMarquee = () => {
  return (
    <div className="w-full bg-transparent py-20  overflow-hidden relative marquee-container top-20 bottom-20">
      {/* Gradient Masks (Restored 'from-[var(--bg-main)]' to make fade work) */}
      <div className="absolute top-0 left-0 h-full w-24 bg-gradient-to-r from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-[var(--bg-main)] to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Container */}
      <div className="flex gap-16 animate-infinite-scroll w-max">
        {/* Render list twice for infinite loop */}
        {[...logos, ...logos].map((item, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 group cursor-pointer`}
          >
            {/* 1. Removed 'text-gray-500' 
                2. Applied item.color directly 
            */}
            <item.icon
              className={`text-4xl ${item.color} transition-transform duration-300 group-hover:scale-110`}
            />

            {/* Kept text gray, turns white on hover for contrast */}
            <span className="text-gray-400 font-bold text-lg group-hover:text-white transition-colors duration-300">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;