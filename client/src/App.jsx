// client/src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

// Quick guard to check for token
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("adminProfile");
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        {/* Mandatory live build requirement */}
        <footer className="w-full text-center p-4 border-t border-gray-800 text-sm text-gray-500">
          Built for Digital Heroes Training Task.{" "}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            className="text-blue-400 hover:underline"
          >
            digitalheroesco.com
          </a>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
