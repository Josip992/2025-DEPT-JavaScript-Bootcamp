import HomePage from "./pages/HomePage";
import ColorCreatePage from "./pages/ColorCreatePage";
import ColorPaletteGeneratorPage from "./pages/ColorPaletteGeneratorPage";
import MyColorPalettePage from "./pages/MyColorPalettePage";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./contexts/AuthContext";
import { ColorsProvider } from "./contexts/ColorsContext";
import { BrowserRouter as Router, Routes, Route } from "react-router";

export default function App() {
  return (
    <AuthProvider>
      <ColorsProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/color-palette-generator" element={<ColorPaletteGeneratorPage />}/>
            <Route path="/my-color-palette" element={<MyColorPalettePage />} />
            <Route path="/color-create" element={<ColorCreatePage />} />
          </Routes>
        </Router>
      </ColorsProvider>
    </AuthProvider>
  );
}
