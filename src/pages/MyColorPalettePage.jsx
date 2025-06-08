import React from "react";
import { useColorsContext } from "../contexts/ColorsContext";

export default function MyColorPalettePage() {
  const { savedPalette, removeColorFromPalette } = useColorsContext();

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

      <div className="flex flex-col items-center px-4 py-10 min-h-screen text-center w-full">
        <div className="w-full max-w p-8 rounded-xl bg-white/30 backdrop-blur-sm border border-gray-300 shadow-xl">
          <h1 className="text-5xl font-extrabold tracking-widest mb-6 drop-shadow-lg text-purple-600 whitespace-nowrap">
            MY COLOR PALETTE
          </h1>

          {savedPalette.length === 0 ? (
            <p className="text-lg mt-4 text-gray-700">
              Your color palette is empty.
            </p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4 mt-4 min-h-[10rem] items-center">
              {savedPalette.map((color, index) => (
                <div
                  key={index}
                  className="relative w-50 h-50 rounded-2xl flex items-center justify-center text-white font-semibold shadow-lg border border-gray-400"
                  style={{
                    backgroundColor: color,
                    textShadow:
                      "0.5px 0.5px 1px black, -0.5px 0.5px 1px black, 0.5px -0.5px 1px black, -0.5px -0.5px 1px black",
                  }}
                  title={color}
                >
                  {color}

                  <button
                    onClick={() => removeColorFromPalette(color)}
                    className="absolute top-1 right-1 p-1 bg-white/20 rounded-full transition transform active:scale-105 hover:saturate-150"
                    title="Remove from palette"
                  >
                    <img
                      src="/palette.svg"
                      alt="Remove"
                      className="w-5 h-5 drop-shadow"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
