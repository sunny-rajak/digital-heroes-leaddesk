// client/src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { data } = await API.post("/admin/login", credentials);
      // Save the token and user info, which our api.js interceptor will use
      localStorage.setItem("adminProfile", JSON.stringify(data));
      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Access
        </h2>

        {error && (
          <div className="bg-red-900/50 text-red-200 p-3 rounded mb-4 text-sm border border-red-800">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors mt-2"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
