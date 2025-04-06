// src/components/Sidebar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <div
      className={`${
        isSidebarOpen ? 'block' : 'hidden'
      } md:block w-64 bg-blue-600 text-white p-5 transition-transform duration-300 ease-in-out transform`}
    >
      <h2 className="text-2xl font-semibold">Admin Dashboard</h2>
      <ul className="mt-6 space-y-4">
        <li>
          <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </li>
        <li>
          <Link to="/users" className="hover:text-gray-300">Users</Link>
        </li>
        <li>
          <Link to="/orders" className="hover:text-gray-300">Orders</Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-300">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
