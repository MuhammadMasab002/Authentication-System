import React from "react";
import { Link } from "react-router-dom";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import XIcon from "@mui/icons-material/X";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-10 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-center text-gray-500 mt-10 pt-5 border-t border-gray-700 text-sm">
            © {new Date().getFullYear()}
            <span className="font-medium">
              <Link to="/"> auth. </Link>
            </span>
            All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
