// import React, { useEffect, useRef, useState } from "react";

// const CustomCursor = () => {
//   const cursorRef = useRef(null);
//   const [isHovering, setIsHovering] = useState(false);
//   const mousePosition = useRef({ x: 0, y: 0 });

//   useEffect(() => {
//     const onMouseMove = (e) => {
//       // 1. Update our tracker with the REAL mouse coordinates
//       mousePosition.current = { x: e.clientX, y: e.clientY };

//       // 2. Hover logic (same as before)
//       const target = e.target;
//       const isClickable =
//         target.tagName === "A" ||
//         target.tagName === "BUTTON" ||
//         target.closest("a") ||
//         target.closest("button") ||
//         window.getComputedStyle(target).cursor === "pointer";

//       setIsHovering((prev) => (prev !== isClickable ? isClickable : prev));
//     };

//     const updateCursor = () => {
//       if (!cursorRef.current) return;

//       // 3. Move the cursor to the tracked mouse coordinates
//       const { x, y } = mousePosition.current;
      
//       // Using translate3d is better for GPU performance
//       cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;

//       requestAnimationFrame(updateCursor);
//     };

//     window.addEventListener("mousemove", onMouseMove);
//     const animationFrameId = requestAnimationFrame(updateCursor);

//     return () => {
//       window.removeEventListener("mousemove", onMouseMove);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <div
//       ref={cursorRef}
//       // Combine your CSS class with the conditional "big" class
//       className={`customCursor ${isHovering ? "big" : ""}`}
//       style={{
//         // We only keep styles here that need to be dynamic or override defaults safely
//         // REMOVED: backgroundColor: 'transparent' (this was making it invisible!)
//         backgroundColor: isHovering ? 'red' : 'white' 
//       }}
//     />
//   );
// };

// export default CustomCursor;