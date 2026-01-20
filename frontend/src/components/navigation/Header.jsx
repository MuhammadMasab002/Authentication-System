import React, { useContext, useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MenuIcon from "@mui/icons-material/Menu";
import { AppContext } from "../../services/contextApi/AppContext";
import axios from "axios";

// import Sidebar from "../layout/Sidebar";

import Sidebar from "./Sidebar";

const NAV_ITEMS = [
  { label: "Home", path: "/" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about" },
  { label: "Sign Up", path: "/signup" },
];

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const { userData, backendUrl, setIsLoggedIn, setUserData } =
    useContext(AppContext);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleVerifyEmail = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/auth/send-verify-otp`,
        {},
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        setIsDropdownOpen(false);
        navigate("/verify-email");
        alert("Verification email sent! Please check your inbox.");
      } else {
        alert("Failed to send verification email. Please try again.");
      }
    } catch (error) {
      alert("Failed to send verification email. Please try again.");
      console.error("Verification email error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${backendUrl}/auth/logout`,
        {},
        {
          withCredentials: true,
        },
      );
      if (response.data.success) {
        setIsLoggedIn(false);
        setUserData(null);
        navigate("/signin");
        alert("Logged out successfully!");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Left: Menu + Logo */}
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 rounded-full hover:bg-gray-100 transition"
              >
                <MenuIcon />
              </button>

              {/* Logo */}
              <Link
                to="/"
                className="text-xl font-bold text-gray-900 hover:text-yellow-500 transition"
              >
                auth<span className="text-yellow-500">.</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `text-sm font-medium transition
                    ${
                      isActive
                        ? "text-yellow-500"
                        : "text-gray-700 hover:text-yellow-500"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Actions */}
            {userData ? (
              <div className="flex items-center gap-4">
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-10 h-10 flex justify-center items-center rounded-full bg-gray-100 hover:bg-yellow-500/20 transition cursor-pointer"
                    title="Profile Menu"
                  >
                    <div className="text-lg font-semibold text-yellow-500">
                      {userData?.username[0].toUpperCase()}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-12 right-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 animate-in fade-in duration-200">
                      <div className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600 wrap-break-word">
                        {userData?.email}
                      </div>
                      {!userData?.isAccountVerified && (
                        <button
                          onClick={handleVerifyEmail}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm text-gray-700 font-medium"
                        >
                          Verify Email
                        </button>
                      )}

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-red-50 transition text-sm text-red-600 font-medium"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <NavLink
                to={"/signin"}
                end
                className="text-sm font-medium transition text-gray-700 hover:text-yellow-500"
              >
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};

export default Header;
