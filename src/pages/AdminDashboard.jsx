import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"))?.value;
      const res = await fetch(`${API_BASE}/listallusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-black via-slate-900 to-gray-800 text-white px-6 py-10">
      <h1 className="text-4xl font-extrabold text-green-400 mb-10 text-center">
        Admin Dashboard
      </h1>

      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        <button
          onClick={fetchUsers}
          className="px-8 py-3 bg-green-500 hover:bg-green-600 rounded-full font-semibold shadow-md transition-all duration-300"
        >
          List All Users
        </button>

        <button
          onClick={handleLogout}
          className="px-8 py-3 border-2 border-red-600 text-white rounded-full hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>

      {loading && (
        <div className="text-center text-lg font-medium text-yellow-300">
          Loading users...
        </div>
      )}

      <div className="mx-auto max-w-6xl w-full">
        <div className="grid gap-8 justify-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {users.map((user, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl shadow-xl p-6 backdrop-blur-md border border-gray-600 hover:scale-[1.02] transition-transform"
            >
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                {user.username}
              </h2>
              <p className="mb-1">
                <span className="font-semibold text-yellow-300">Email:</span>{" "}
                {user.email}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-yellow-300">Role:</span>{" "}
                {user.roles}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-yellow-300">
                  Finding Work:
                </span>{" "}
                {user.findingawork ? "Yes" : "No"}
              </p>
              <p className="mb-1">
                <span className="font-semibold text-yellow-300">Skills:</span>{" "}
                {user.skills?.join(", ") || "None"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
