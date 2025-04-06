// src/pages/User.tsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './components/Sidebar'; // Import Sidebar component

interface UserData {
  username: string;
}

export default function Users() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login'; // Redirect to login page if no token found
      return;
    }

    // Fetch the user data from the server using the token
    axios
      .get('http://localhost:3000/protected', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch(() => {
        window.location.href = '/login'; // Redirect to login if the token is invalid
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
            {/* Hamburger menu for mobile sidebar toggle */}
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

            <h2 className="text-3xl font-semibold text-blue-600 ml-4">User Dashboard</h2>
          </div>

          <button
            onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/login'; // Redirect to login when logging out
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
          >
            Logout
          </button>
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
