// client/src/pages/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function AdminDashboard() {
  const [leads, setLeads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const fetchLeads = async (search = "") => {
    try {
      const { data } = await API.get(`/leads?search=${search}`);
      setLeads(data);
    } catch (error) {
      if (error.response?.status === 401) handleLogout();
      console.error("Error fetching leads:", error);
    }
  };

  // Fetch leads on mount and when search term changes
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchLeads(searchTerm);
    }, 300); // 300ms debounce to prevent spamming the API while typing

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      // Optimistic UI update
      setLeads(
        leads.map((lead) =>
          lead._id === id ? { ...lead, status: newStatus } : lead,
        ),
      );
      await API.patch(`/leads/${id}`, { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
      fetchLeads(); // Revert on failure
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminProfile");
    navigate("/admin/login");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-900/50 text-blue-200 border-blue-800";
      case "Contacted":
        return "bg-yellow-900/50 text-yellow-200 border-yellow-800";
      case "Closed":
        return "bg-green-900/50 text-green-200 border-green-800";
      default:
        return "bg-gray-700 text-gray-300";
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Lead Management</h1>
        <button
          onClick={handleLogout}
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 border border-gray-600 rounded-lg transition-colors"
        >
          Logout
        </button>
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-900/50 text-gray-400 text-sm uppercase tracking-wider">
                <th className="p-4 font-medium border-b border-gray-700">
                  Client Details
                </th>
                <th className="p-4 font-medium border-b border-gray-700">
                  Budget
                </th>
                <th className="p-4 font-medium border-b border-gray-700">
                  Message
                </th>
                <th className="p-4 font-medium border-b border-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700 text-sm">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="hover:bg-gray-700/20 transition-colors"
                  >
                    <td className="p-4">
                      <div className="font-medium text-white">{lead.name}</div>
                      <div className="text-gray-400">{lead.email}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="p-4 text-gray-300">{lead.budgetRange}</td>
                    <td
                      className="p-4 text-gray-300 max-w-xs truncate"
                      title={lead.message}
                    >
                      {lead.message}
                    </td>
                    <td className="p-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          handleStatusChange(lead._id, e.target.value)
                        }
                        className={`text-xs font-semibold px-2 py-1 rounded border appearance-none cursor-pointer focus:outline-none ${getStatusColor(lead.status)}`}
                      >
                        <option value="New" className="bg-gray-800 text-white">
                          New
                        </option>
                        <option
                          value="Contacted"
                          className="bg-gray-800 text-white"
                        >
                          Contacted
                        </option>
                        <option
                          value="Closed"
                          className="bg-gray-800 text-white"
                        >
                          Closed
                        </option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
