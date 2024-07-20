"use client";

import { roboto_flex } from "@/styles/fonts";
import React, { useState, useEffect, ReactNode } from "react";

interface NavItemProps {
  href: string;
  children: ReactNode;
}
const ColorPalette = () => {
  const [palettes, setPalettes] = useState<Array<string[]>>([]);
  const [hasMore, setHasMore] = useState(false);

  const generatePalettes = () => {
    const newPalettes: string[][] = [];
    for (let i = 0; i < 12; i++) {
      const palette: string[] = [];

      for (let j = 0; j < 5; j++) {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        const color = `#${randomR.toString(16).padStart(2, "0").toUpperCase()}${randomG.toString(16).padStart(2, "0").toUpperCase()}${randomB.toString(16).padStart(2, "0").toUpperCase()}`;
        palette.push(color);
      }
      newPalettes.push(palette); // Use spread operator to flatten the array
    }
    setPalettes((prevPalettes) => [...prevPalettes, ...newPalettes]);
  };
  useEffect(() => {
    generatePalettes();
    setHasMore(true); // Set hasMore to true after the first batch of palettes is generated
  }, []);

  const handleLoadMore = () => {
    generatePalettes();
  };

  const getContrastingColor = (color: string) => {
    const r = parseInt(color.substring(1, 3), 16);
    const g = parseInt(color.substring(3, 5), 16);
    const b = parseInt(color.substring(5, 7), 16);
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
    return brightness > 0.5 ? "#000000" : "#FFFFFF";
  };

  return (
    <div className={`${roboto_flex}`}>
      <h2 className="text-4xl text-center py-4  font-semibold text-[var(--primary-color)]">
        Trending color palettes
      </h2>

      <div className="grid grid-cols-3 gap-4 p-4 max-sm:grid-cols-1 place-items-center max-md:grid-cols-2 max-lg:grid-cols-2 max-xl:grid-cols-2">
        {palettes.map((palette, paletteIndex) => (
          <ul key={paletteIndex}>
            {palette.map((color, index) => (
              <li
                key={index}
                style={{
                  backgroundColor: color,
                  display: "inline-block",
                }}
                className={` ${index === 0 ? "rounded-l-lg" : ""} ${index === palette.length - 1 ? "rounded-r-lg" : ""} relative w-[80px] h-[160px] max-sm:w-[65px] max-md:w-[62.5px] max-lg:w-[70px]`}
              >
                <span
                  className=" absolute top-0 left-0 w-full h-full flex justify-center items-center text-sm opacity-0 hover:opacity-100 "
                  style={{ color: getContrastingColor(color) }}
                >
                  {color}
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center items-center p-2">
          <button
            className="bg-[var(--primary-color)]
         text-[var(--light)] px-4 py-2 rounded"
            onClick={handleLoadMore}
          >
            View More
          </button>
        </div>
      )}
    </div>
  );
};

export default ColorPalette;