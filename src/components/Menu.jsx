import React, { useState } from "react";

const Menu = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const menuItems = ["ABOUT", "EXPERIENCE", "PROJECTS"];

  return (
    <div className="flex flex-col items-start gap-4 text-gray-400 text-lg">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2 group"
          onMouseEnter={() => setActiveIndex(index)}
          onMouseLeave={() => setActiveIndex(null)}
        >
          {/* Animated Line */}
          <div
            className={`h-1 bg-gray-400 transition-all duration-300 ${
              activeIndex === index ? "w-10" : "w-4"
            }`}
          ></div>

          {/* Menu Item */}
          <span
            className={`transition-all duration-300 ${
              activeIndex === index ? "text-white" : "text-gray-400"
            }`}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Menu;
