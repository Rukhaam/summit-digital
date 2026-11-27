import React, { useState, useEffect, useCallback } from "react";

export const StarBackground = () => {
  const [stars, setStars] = useState([]);
  const [meteors, setMeteors] = useState([]);

  // Generate static twinkling stars based on screen size
  const generateStars = useCallback(() => {
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 5000); // Increased density
    const newStars = [];
    
    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 2 + 1, // Size 1px - 3px
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.3, // Random opacity
        animationDuration: Math.random() * 3 + 2, // Twinkle speed
        animationDelay: Math.random() * 2,
      });
    }
    setStars(newStars);
  }, []);

  // Generate shooting meteors
  const generateMeteors = useCallback(() => {
    const numberOfMeteors = 6; // Keep constant number active
    const newMeteors = [];
    
    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 1 + 0.5, // Thin trails
        x: Math.random() * 100, // Random Start X
        y: Math.random() * 50,  // Start mostly from top half
        delay: Math.random() * 10, // Stagger start times
        duration: Math.random() * 2 + 1, // Speed
      });
    }
    setMeteors(newMeteors);
  }, []);

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [generateStars, generateMeteors]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#080928]">
      
      {/* 1. Static Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-twinkle"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animationDuration: `${star.animationDuration}s`,
            animationDelay: `${star.animationDelay}s`,
          }}
        ></div>
      ))}

      {/* 2. Shooting Meteors */}
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute bg-gradient-to-r from-green-700 to-white rounded-full opacity-0 animate-meteor"
          style={{
            // Meteor Head
            width: "100px", 
            height: "1px",
            
            // Positioning
            left: `${meteor.x}%`,
            top: `${meteor.y}%`,
            
            // Animation
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
          }}
        ></div>
      ))}
      
      {/* Optional: Radial Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#080928]/50 to-[#080928]"></div>
    </div>
  );
};

export default StarBackground;