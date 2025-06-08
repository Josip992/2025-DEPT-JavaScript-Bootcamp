import React, { useState } from "react";
import { registerUser } from "../api/authService";
import { useAuthContext } from "../contexts/AuthContext";

export default function RegisterModal({ onClose, onSwitchToLogin }) {
  const { register } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser(email, password);
      register(email);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to register. Please try again."
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
            Sign up for free
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
            {loading ? "Creating account..." : "Create a free account"}
          </button>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-purple-700 active:scale-105 hover:saturate-150"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
