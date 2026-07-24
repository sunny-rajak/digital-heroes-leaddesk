import { useState } from "react";
import API from "../services/api";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budgetRange: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.budgetRange ||
      !formData.message
    ) {
      setStatus({ type: "error", message: "All fields are required." });
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await API.post("/leads", formData);
      setStatus({
        type: "success",
        message: "Thank you! Your request has been submitted.",
      });
      setFormData({ name: "", email: "", budgetRange: "", message: "" }); // Reset form
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-700">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">LeadDesk Mini</h1>
          <p className="text-gray-400">Let's build something great together.</p>
        </div>

        {status.message && (
          <div
            className={`p-4 mb-6 rounded text-sm ${status.type === "error" ? "bg-red-900/50 text-red-200 border border-red-800" : "bg-green-900/50 text-green-200 border border-green-800"}`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="jane@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Budget Range
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a budget...</option>
              <option value="< $5,000">Less than $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Project Details
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Tell us about your requirements..."
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
