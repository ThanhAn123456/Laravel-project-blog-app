import {
  IconCirclePlus,
  IconHome,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import React from "react";
import { NavLink } from "react-router-dom";

const SideBar: React.FC = () => {
  return (
    <aside className="fixed top-0 left-0 h-full bg-white shadow-lg w-60 lg:w-60 z-50">
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="bg-[#316BFF] text-white p-4">
          <h1 className="text-lg font-bold text-center">BLOG APP</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex-grow px-4 py-6">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-blue-600 font-semibold bg-gray-100 rounded-lg gap-2"
                    : "flex items-center p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg gap-2"
                }
              >
                <IconHome></IconHome>
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-blue-600 font-semibold bg-gray-100 rounded-lg gap-2"
                    : "flex items-center p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg gap-2"
                }
              >
                <IconCirclePlus></IconCirclePlus>
                Create
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-blue-600 font-semibold bg-gray-100 rounded-lg gap-2"
                    : "flex items-center p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg gap-2"
                }
              >
                <IconUserCircle></IconUserCircle>
                Profile
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="w-full text-left text-gray-700 hover:text-red-600  flex gap-2">
            <IconLogout></IconLogout>
            <p>Logout</p>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
