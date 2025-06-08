import React, { useState } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { useColorsContext } from "../contexts/ColorsContext";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import { useNavigate, Link } from "react-router";

export default function NavBar() {
  const { user, isAuthenticated, logout } = useAuthContext();
  const { favoriteColor } = useColorsContext();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const username = user?.email?.split("@")[0] || "";
  const firstLetter = username.charAt(0).toUpperCase();

  const buttonEffects =
    "active:scale-105 transition transform hover:saturate-150";

  return (
    <nav className="bg-white border-b border-gray-300 relative">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4 relative">
        <div
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 rtl:space-x-reverse z-10 cursor-pointer"
        >
          <img src="/logo.svg" className="h-8 mr-4" alt="Colors Logo" />
          <span className="text-4xl font-extrabold text-purple-700 self-center whitespace-nowrap font-crazy-text drop-shadow-[2px_2px_0_black] tracking-widest">
            COLORS
          </span>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 z-0">
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="text-gray-900 px-2 py-1 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/color-palette-generator"
                className="text-gray-900 px-2 py-1 rounded"
              >
                Palette Generator
              </Link>
            </li>
            <li>
              <Link
                to="/color-create"
                className="text-gray-900 px-2 py-1 rounded"
              >
                Color Create
              </Link>
            </li>
          </ul>
        </div>

        <div className="relative z-10">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className={`w-10 h-10 rounded-full text-white flex items-center justify-center font-bold text-lg focus:outline-none border ${buttonEffects}`}
                style={{
                  backgroundColor: favoriteColor || "#7e22ce",
                  borderColor: "#d1d5db",
                  borderWidth: "1px",
                }}
              >
                <span
                  style={{
                    textShadow:
                      "1px 1px 0 #374151, -1px -1px 0 #374151, 1px -1px 0 #374151, -1px 1px 0 #374151",
                  }}
                >
                  {firstLetter}
                </span>
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg p-3 z-20">
                  <p className="mb-2 text-gray-800">Hello, {username}!</p>
                  <hr className="border-gray-300 mb-2" />
                  <Link
                    to="/my-color-palette"
                    className="block mb-2 text-purple-700"
                    onClick={() => setShowMenu(false)}
                  >
                    My Color Palette
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowMenu(false);
                      navigate("/");
                    }}
                    className={`w-full text-left text-red-600 ${buttonEffects}`}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-3 rtl:space-x-reverse">
              <button
                type="button"
                onClick={() => setIsRegisterOpen(true)}
                className={`mr-1 text-purple-700 border border-purple-700 font-medium rounded-lg text-sm px-4 py-2 text-center ${buttonEffects}`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => setIsLoginOpen(true)}
                className={`text-white bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 text-center ${buttonEffects}`}
              >
                Sign In
              </button>
            </div>
          )}

          {isLoginOpen && (
            <LoginModal
              onClose={() => setIsLoginOpen(false)}
              onSwitchToRegister={() => {
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }}
            />
          )}
          {isRegisterOpen && (
            <RegisterModal
              onClose={() => setIsRegisterOpen(false)}
              onSwitchToLogin={() => {
                setIsRegisterOpen(false);
                setIsLoginOpen(true);
              }}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
