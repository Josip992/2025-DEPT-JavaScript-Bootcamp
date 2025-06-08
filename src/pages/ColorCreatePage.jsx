import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useColorsContext } from "../contexts/ColorsContext";

export default function ColorCreatePage() {
  const [color, setColor] = useState("#c781cd");
  const { setFavoriteColor, saveColorToPalette } = useColorsContext();

  const handleSetFavorite = () => {
    setFavoriteColor(color);
    alert("Set a new favorite color!");
  };

  const handleAddToPalette = () => {
    saveColorToPalette(color);
    alert(color + " added to your color palette");
  };

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700 flex flex-col items-center justify-center px-6 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none z-[-1]"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "brightness(0.9) blur(4px)",
        }}
      />

      <div className="flex flex-col items-center px-4 py-10 min-h-screen text-center">
        <div className="w-full max-w-2xl p-6 rounded-xl bg-white/30 backdrop-blur-sm border border-gray-300 shadow-xl">
          <h1 className="text-6xl font-extrabold tracking-widest mb-4 drop-shadow-lg text-purple-600">
            COLOR CREATE
          </h1>

          <div className="flex flex-col items-center gap-6 mb-8 w-full">
            <p className="mt-4 mb-2 text-2xl drop-shadow-md text-gray-700">
              Create a unique color.
            </p>

            <HexColorPicker color={color} onChange={setColor} />

            <div className="mt-2 w-full flex flex-col items-center">
              <div
                className="w-23 h-23 rounded-2xl border border-gray-400 shadow-lg"
                style={{ backgroundColor: color }}
              />
              <p className="mt-1 text-xl font-semibold text-gray-600">
                {color}
              </p>
            </div>

            <div className="flex gap-4 mt-1">
              <button
                onClick={handleSetFavorite}
                className="bg-yellow-500 text-white font-semibold px-4 py-2 rounded-lg shadow transition transform active:scale-105 hover:saturate-150"
              >
                Set as Favorite Color
              </button>
              <button
                onClick={handleAddToPalette}
                className="bg-purple-600 hover:bg-purple-800 text-white font-semibold px-4 py-2 rounded-lg shadow transition"
              >
                Add to Color Palette
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
