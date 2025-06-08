import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";

const ColorsContext = createContext();

export const ColorsProvider = ({ children }) => {
  const [colors, setColors] = useState([]);
  const [limit, setLimit] = useState(10);
  const [savedPalette, setSavedPalette] = useState([]);
  const [favoriteColor, setFavoriteColorState] = useState(null);

  const { accessToken, user } = useAuthContext();
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return;

    const cached = localStorage.getItem("cachedColors");
    const saved = localStorage.getItem("palette_" + userEmail);
    const favorite = localStorage.getItem("favoriteColor_" + userEmail);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setColors(parsed);
      } catch {}
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setSavedPalette(parsed);
      } catch {}
    }

    if (favorite) {
      try {
        setFavoriteColorState(favorite);
      } catch {}
    }
  }, [userEmail]);

  const saveColorToPalette = (color) => {
    if (!accessToken || !userEmail) return;

    setSavedPalette((prev) => {
      if (prev.includes(color)) return prev;
      const updated = [...prev, color];
      localStorage.setItem(`palette_${userEmail}`, JSON.stringify(updated));
      return updated;
    });
  };

  const removeColorFromPalette = (colorToRemove) => {
    if (!accessToken || !userEmail) return;

    setSavedPalette((prev) => {
      const updated = prev.filter((c) => c !== colorToRemove);
      localStorage.setItem(`palette_${userEmail}`, JSON.stringify(updated));
      return updated;
    });
  };

  const setFavoriteColor = (color) => {
    if (!accessToken || !userEmail) return;

    setFavoriteColorState(color);
    localStorage.setItem(`favoriteColor_${userEmail}`, color);
  };

  const value = {
    colors,
    setColors,
    limit,
    setLimit,
    savedPalette,
    saveColorToPalette,
    removeColorFromPalette,
    favoriteColor,
    setFavoriteColor,
  };

  return (
    <ColorsContext.Provider value={value}>{children}</ColorsContext.Provider>
  );
};

export const useColorsContext = () => useContext(ColorsContext);
