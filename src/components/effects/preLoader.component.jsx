import React from "react";
import logo from "../../assets/logo.png";

const Preloader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#080928]">
      <div className="flex flex-col items-center animate-pulse">
        <img 
          src={logo} 
          alt="SummitDigital" 
          className="w-50 h-50  md:w-90 md:h-90 object-contain mb-4" 
        />
      </div>
    </div>
  );
};

export default Preloader;