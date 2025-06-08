import { useState } from "react";
import { useColorsContext } from "../contexts/ColorsContext";
import { fetchColorsFromAPI } from "../api/colorService";

export default function ColorPaletteGeneratorPage() {
  const { colors, setColors, limit, setLimit, saveColorToPalette } = useColorsContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFetchColors = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("accessToken");
    if (!token) {
      setError("Please log in to access this feature.");
      setLoading(false);
      return;
    }

    try {
      const fetchedColors = await fetchColorsFromAPI(token, limit);
      setColors(fetchedColors);
      localStorage.setItem("cachedColors", JSON.stringify(fetchedColors));
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
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

      <div className="flex flex-col items-center px-4 py-10 min-h-screen text-center w-full">
        <div className="w-full max-w p-8 rounded-xl bg-white/30 backdrop-blur-sm border border-gray-300 shadow-xl">
          <h1 className="text-6xl font-extrabold tracking-widest mb-6 drop-shadow-lg text-purple-600 whitespace-nowrap">
            COLOR PALETTE GENERATOR
          </h1>

          <div className="flex flex-col items-center gap-4 mb-8 w-full">
            <p className="mt-2 text-2xl drop-shadow-md text-gray-700">
              Generate up to 10 random colors.
            </p>

            <div className="flex items-center justify-center w-full flex-wrap gap-4 mt-2">
              <button
                onClick={() => setLimit((prev) => Math.max(1, prev - 1))}
                className="bg-purple-500 text-white px-5 py-3 rounded-lg shadow transition transform active:scale-105 hover:saturate-150"
                title="Decrease number of colors fetched"
              >
                −
              </button>

              <button
                onClick={handleFetchColors}
                className="bg-yellow-500 font-bold text-white px-6 py-3 rounded-lg shadow transition transform active:scale-105 hover:saturate-150"
              >
                Generate {limit} Random Color{limit > 1 ? "s" : ""}
              </button>

              <button
                onClick={() => setLimit((prev) => Math.min(10, prev + 1))}
                className="bg-purple-500 text-white px-5 py-3 rounded-lg shadow transition transform active:scale-105 hover:saturate-150"
                title="Increase number of colors fetched"
              >
                +
              </button>
            </div>

            {error && <p className="text-red-500 mt-2">{error}</p>}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4 min-h-[10rem] items-center">
            {loading ? (
              <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="relative w-30 h-30 rounded-2xl flex items-center justify-center text-white font-semibold shadow-lg transition-all duration-500 border border-gray-400"
                    style={{
                      backgroundColor: color,
                      textShadow:
                        "0.5px 0.5px 1px black, -0.5px 0.5px 1px black, 0.5px -0.5px 1px black, -0.5px -0.5px 1px black",
                    }}
                  >
                    {color}

                    <div
                      className="absolute top-1 right-1 p-1 bg-white/20 rounded-full transition cursor-pointer"
                      title="Save to palette"
                      onClick={() => {
                        saveColorToPalette(color);
                        alert(color + " added to color palette");
                      }}
                    >
                      <img
                        src="/palette.svg"
                        alt="Save"
                        className="w-5 h-5 drop-shadow pointer-events-none"
                      />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
