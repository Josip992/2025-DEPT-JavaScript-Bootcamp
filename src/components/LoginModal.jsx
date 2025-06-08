import { useAuthContext } from "../contexts/AuthContext";
import { loginUser } from "../api/authService";
import React, { useState } from "react";

export default function LoginModal({ onClose, onSwitchToRegister }) {
  const { login } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const MAX_ATTEMPTS = 8;
  const LOCKOUT_TIME = 5 * 60 * 1000; 

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  const storedData = JSON.parse(localStorage.getItem("loginAttempts") || "{}");
  const { attempts = 0, lastAttempt = 0 } = storedData;
  const now = Date.now();

  if (attempts >= MAX_ATTEMPTS && now - lastAttempt < LOCKOUT_TIME) {
    const minutesLeft = Math.ceil((LOCKOUT_TIME - (now - lastAttempt)) / 60000);
    setError(`Too many failed attempts. Try again in ${minutesLeft} minute(s).`);
    setLoading(false);
    return;
  }

  try {
    const response = await loginUser(email, password);
    const jwt = response.data.token;
    login(jwt, email);
    onClose();
    localStorage.removeItem("loginAttempts"); 
  } catch (err) {
    const newAttempts = now - lastAttempt > LOCKOUT_TIME ? 1 : attempts + 1;
    localStorage.setItem(
      "loginAttempts",
      JSON.stringify({ attempts: newAttempts, lastAttempt: now })
    );
    setError(
      err.response?.data?.message || "Failed to log in. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative transition-all duration-300 transform translate-y-0 border-2 border-gray-300">
        <div className="flex items-center justify-between border-b border-gray-300 pb-4 mb-4">
          <h3 className="text-xl font-semibold text-gray-900">
            Sign in with your account
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 transition-all duration-150 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center active:scale-105 hover:saturate-150"
          >
            ✕<span className="sr-only">Close modal</span>
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-4 w-full px-5 py-2.5 rounded-lg focus:ring-4 focus:ring-purple-300 ${
              loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-700 active:scale-105 hover:saturate-150"
            } text-white`}
          >
            {loading ? "Logging in..." : "Login to your account"}
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Not registered?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-purple-700 active:scale-105 hover:saturate-150"
            >
              Create account
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
