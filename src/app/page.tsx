"use client";
import { useState } from "react";
import { FaHome, FaPlug, FaBlender, FaUtensils, FaHouseUser } from "react-icons/fa";
import Carousel from "@/components/ui/Test";
import ElectricalAppliance from "@/components/ui/Test1";
import HomeHero from "@/components/ui/HomeHero";
import KitchenWare from "@/components/ui/Test2";
import Serveware from "@/components/ui/Test3";
import HomeAppliance from "@/components/ui/Test4";

import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top
  };

  const renderContent = () => {
    switch (activeTab) {
      case "All":
        return <HomeHero />;
      case "ElectricalAppliance":
        return <ElectricalAppliance />;
      case "Kitchenware":
        return <KitchenWare />;
      case "Serveware":
        return <Serveware />;
      case "HomeAppliance":
        return <HomeAppliance />;
      default:
        return <HomeHero />;
    }
  };

  return (
    <main className="pt-[124px]">
      <nav className="fixed w-full bg-gray-100 dark:bg-slate-800 shadow-md z-30">
        <ul className="hidden md:flex justify-center space-x-8 p-1">
          {["All", "ElectricalAppliance", "Kitchenware", "Serveware", "HomeAppliance"].map((tab) => (
            <li key={tab} className={`cursor-pointer py-1 px-2 rounded-xl ${activeTab === tab ? "bg-green-500 text-white" : "bg-zinc-200 text-black"}`} onClick={() => handleTabClick(tab)}>
              {tab}
            </li>
          ))}
        </ul>
        <ul className="md:hidden flex justify-around p-2">
          <li className={`cursor-pointer ${activeTab === "All" ? "text-green-500" : "text-black"}`} onClick={() => handleTabClick("All")}>
            <FaHome />
          </li>
          <li className={`cursor-pointer ${activeTab === "ElectricalAppliance" ? "text-green-500" : "text-black"}`} onClick={() => handleTabClick("ElectricalAppliance")}>
            <FaPlug />
          </li>
          <li className={`cursor-pointer ${activeTab === "Kitchenware" ? "text-green-500" : "text-black"}`} onClick={() => handleTabClick("Kitchenware")}>
            <FaBlender />
          </li>
          <li className={`cursor-pointer ${activeTab === "Serveware" ? "text-green-500" : "text-black"}`} onClick={() => handleTabClick("Serveware")}>
            <FaUtensils />
          </li>
          <li className={`cursor-pointer ${activeTab === "HomeAppliance" ? "text-green-500" : "text-black"}`} onClick={() => handleTabClick("HomeAppliance")}>
            <FaHouseUser />
          </li>
        </ul>
      </nav>
      <div className="container mx-auto mt-10 px-4">{renderContent()}</div>
    </main>
  );
}
