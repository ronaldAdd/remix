// src/pages/AdminDashboard.tsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar'; // Import Sidebar

interface UserData {
  username: string;
}

export default function AdminDashboard() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalSales: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Menyimpan status sidebar

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login'; // Arahkan pengguna kembali ke login jika tidak ada token
      return;
    }

    // Menggunakan token untuk mengakses data yang terlindungi
    axios
      .get('http://localhost:3000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {
        window.location.href = '/login'; // Arahkan ke login jika token tidak valid
      });

    // Mengambil data statistik admin
    axios
      .get('http://localhost:3000/admin/stats', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setStats(response.data);
      })
      .catch(() => {
        console.error('Error fetching stats');
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

      {/* Main content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            {/* Hamburger menu untuk sidebar */}
            <button
              className="md:hidden text-blue-600 focus:outline-none"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h2 className="text-3xl font-semibold text-blue-600 ml-4">Dashboard</h2>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login'; // Redirect ke login saat logout
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
        </div>

        {/* Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
            <p className="text-3xl font-bold text-blue-500">
              <a href="/users" className="hover:text-blue-700">
                {stats.totalUsers}
              </a>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Sales</h3>
            <p className="text-3xl font-bold text-green-500">
              <a href="/orders" className="hover:text-green-700">
                {stats.totalSales}
              </a>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Orders</h3>
            <p className="text-3xl font-bold text-orange-500">
              <a href="/orders" className="hover:text-orange-700">
                {stats.totalOrders}
              </a>
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
            <p className="text-3xl font-bold text-purple-500">
              <a href="/orders" className="hover:text-purple-700">
                ${stats.totalRevenue}
              </a>
            </p>
          </div>
        </div>

        {/* Welcome message */}
        <div className="mt-6 p-6 bg-white rounded-lg shadow-lg">
          {userData ? (
            <p className="text-xl text-gray-700">Welcome back, {userData.username}!</p>
          ) : (
            <p className="text-gray-500">Loading user data...</p>
          )}
        </div>
      </div>
    </div>
  );
}
