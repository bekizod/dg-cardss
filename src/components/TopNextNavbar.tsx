"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiAlignLeft } from "react-icons/tfi";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { sideNav as tabs, cardData } from "../utils/data";
import { useAuth } from "@/context/UserContext";

export default function TopNextNavbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [filteredCards, setFilteredCards] = useState(cardData);
  const { user, logout } = useAuth(); // Get user and logout function from context

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleTabClick = (id: number) => {
    setActiveTab(id);
    filterCards(id);
  };

  const filterCards = (tabId: number) => {
    const category = tabs.find((tab) => tab.id === tabId)?.label || "";
    setFilteredCards(cardData.filter((card) => card.category === category));
  };

  const handleLogout = () => {
    logout(); // Call logout function from the context
  };

  return (
    <div className="flex flex-row justify-between items-center px-6 py-3 md:px-12 md:py-3 bg-white dark:bg-slate-950">
      {/* For Large Devices: Logo, Search, User/Cart */}
      <div className="hidden lg:flex gap-24 items-center w-full">
        {/* Logo Section */}
        <div className="flex gap-4 items-center">
          <div className="text-3xl cursor-pointer" onClick={handleModalToggle}>
            <TfiAlignLeft className="text-green-500" />
          </div>
          <Link href="/">
            <Image
              src="/logo_landscape (1).svg"
              width={120}
              height={20}
              alt="logo"
              className="h-16 w-auto"
            />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 mx-4">
          <div className="relative flex items-center">
            <AiOutlineSearch className="text-green-500 absolute left-3" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[#F5F5F5] md:bg-[#E9FFF1] dark:bg-slate-800"
            />
          </div>
        </div>

        {/* User and Cart Section */}
        <div className="flex items-center gap-6">
          {user ? (
            // Show user name and logout option if token exists
            <>
              <div className="flex items-center gap-2 text-sm cursor-pointer">
                <FaRegUser className="text-green-500" />
                <span className="hidden md:inline">{user.name}</span>
              </div>
              <div className="hidden md:block">|</div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <FaSignOutAlt className="text-red-500" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            // If no user, show login link
            <Link href="/login" className="flex items-center gap-2 text-sm cursor-pointer">
              <FaRegUser className="text-green-500" />
              <span className="hidden md:inline">Account/Login</span>
            </Link>
          )}
          <div className="hidden md:block">|</div>
          <Link href="/cart" className="flex items-center gap-2 text-sm cursor-pointer">
            <MdOutlineShoppingCart className="text-green-500" />
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* For Small/Medium Devices: Logo, Search, Favorite */}
      <div className="lg:hidden flex w-full justify-between items-center -mt-2">
        {/* Logo Section */}
        <div className="relative w-10 h-12">
          <Image
            src="/logo_landscape-cropped.svg"
            layout="fill"
            objectFit="contain"
            alt="logo"
            className="object-contain"
          />
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 mx-3">
          <div className="relative flex items-center">
            <AiOutlineSearch className="absolute left-3 text-gray-500" />
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[#F5F5F5] md:bg-[#E9FFF1] dark:bg-slate-800"
            />
          </div>
        </div>

        {/* Favorite Icon Section */}
        <div className="flex items-center">
          <MdFavoriteBorder className="text-green-500 text-2xl cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
