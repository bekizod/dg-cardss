"use client";
import React, { useState } from "react";
import { FaHome, FaUser, FaComments, FaCamera, FaCog } from "react-icons/fa";
import "./testStyle.css";

const Navigation: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="navigation text-black dark:text-white bg-black dark:bg-gray-100 fixed bottom-0 left-0 right-0">
      <ul>
        <li
          className={`list ${activeIndex === 0 ? "active" : ""}`}
          onClick={() => handleClick(0)}
        >
          <a href="#">
            <span className="icon">
              <FaHome />
            </span>
            <span className="text">Home</span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 1 ? "active" : ""}`}
          onClick={() => handleClick(1)}
        >
          <a href="#">
            <span className="icon">
              <FaUser />
            </span>
            <span className="text">Profile</span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 2 ? "active" : ""}`}
          onClick={() => handleClick(2)}
        >
          <a href="#">
            <span className="icon">
              <FaComments />
            </span>
            <span className="text">Messages</span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 3 ? "active" : ""}`}
          onClick={() => handleClick(3)}
        >
          <a href="#">
            <span className="icon">
              <FaCamera />
            </span>
            <span className="text">Photos</span>
          </a>
        </li>
        <li
          className={`list ${activeIndex === 4 ? "active" : ""}`}
          onClick={() => handleClick(4)}
        >
          <a href="#">
            <span className="icon">
              <FaCog />
            </span>
            <span className="text">Settings</span>
          </a>
        </li>
        <div className="indicator"></div>
      </ul>
    </div>
  );
};

export default Navigation;
