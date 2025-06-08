import React from "react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-indigo-700 flex flex-col items-center justify-center px-6 text-white overflow-hidden">
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/background.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          filter: "brightness(0.9) blur(4px)",
        }}
      />

      <div className="relative z-10 max-w-xl w-full text-center z-[0]">
        <header className="mb-28 relative overflow-hidden rounded-xl flex flex-col items-center justify-center text-center">
          <div className="absolute inset-0 bg-white/30 backdrop-blur-sm border rounded-xl border-gray-300 shadow-xl" />

          <h1 className="text-5xl font-extrabold tracking-widest mb-4 drop-shadow-lg mt-10">
            <span className="text-purple-600">COLOR PALETTE GENERATOR</span>
          </h1>
          <p className="mt-4 mb-10 text-lg drop-shadow-md text-gray-700">
            Quickly generate and add colors to your color palette!
          </p>

          <button
            type="button"
            className="bg-yellow-500 font-bold rounded-lg px-8 py-4 text-xl shadow-xl transition transform active:scale-105 hover:saturate-150 mb-10 z-1"
            onClick={() => {
              navigate("/color-palette-generator");
            }}
          >
            Create Your Own Color Palette
          </button>
        </header>
      </div>
    </main>
  );
}
