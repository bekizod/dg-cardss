"use client";
import { TfiAlignLeft } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";

export default function TopNextNavbar() {
  return (
    <div className="flex flex-row justify-between items-center px-6 py-4 md:px-12 md:py-5 dark:bg-slate-950">
      {/* For Large Devices: Logo, Search, User/Cart */}
      <div className="hidden lg:flex gap-24 items-center w-full">
        {/* Logo Section */}
        <div className="flex gap-4 items-center">
          <div className="text-3xl cursor-pointer">
            <TfiAlignLeft className="text-green-500" />
          </div>
          <Image src="/logo_landscape (1).svg" width={120} height={20} alt="logo" className="h-16 w-auto" />
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 mx-4">
          <div className="relative flex items-center">
            <AiOutlineSearch className="text-green-500 absolute left-3" />
            <input type="text" placeholder="What are you looking for?" className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[#F5F5F5] md:bg-[#E9FFF1] dark:bg-slate-800" />
          </div>
        </div>

        {/* User and Cart Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm cursor-pointer">
            <FaRegUser className="text-green-500" />
            <span className="hidden md:inline">Account/Login</span>
          </div>
          <div className="hidden md:block">|</div>
          <div className="flex items-center gap-2 text-sm cursor-pointer">
            <MdOutlineShoppingCart className="text-green-500" />
            <span className="hidden md:inline">Cart</span>
          </div>
        </div>
      </div>

      {/* For Small/Medium Devices: Logo, Search, Favorite */}
      <div className="lg:hidden flex w-full justify-between items-center -mt-2  ">
        {/* Logo Section */}
        <div className="relative w-10 h-12">
          <Image src="/logo_landscape-cropped.svg" layout="fill" objectFit="contain" alt="logo" className="object-contain" />
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 mx-3">
          <div className="relative flex items-center">
            <AiOutlineSearch className="absolute left-3 text-gray-500" />
            <input type="text" placeholder="What are you looking for?" className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[#F5F5F5] md:bg-[#E9FFF1] dark:bg-slate-800" />
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
