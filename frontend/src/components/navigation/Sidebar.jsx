import React from "react";
import { NavLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Sign Up", path: "/signup" },
];

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <h2 className="text-lg font-bold">
            auth<span className="text-yellow-500">.</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-2">
          {NAV_ITEMS?.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `px-4 py-3 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-yellow-500/10 text-yellow-500"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
