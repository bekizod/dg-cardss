"use client";

import { useState, useEffect } from "react";
import { FaHome, FaPlug, FaBlender, FaUtensils, FaHouseUser } from "react-icons/fa";
import ElectricalAppliance from "@/components/ui/Home UI/PageBuilder";
import HomeHero from "@/components/ui/Home UI/HomeHero";
import KitchenWare from "@/components/ui/Home UI/KitchenWare";
import Serveware from "@/components/ui/Home UI/Serveware";
import HomeAppliance from "@/components/ui/Home UI/HomeAppliance";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";
import Loader from "./loading";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [currentLocale, setCurrentLocale] = useState<string | null>(null); // Set as null initially
  const [translations, setTranslations] = useState(enTranslations);

  useEffect(() => {
    // Check locale from localStorage or set to 'en' by default
    const storedLocale = localStorage.getItem("locale") || "en";
    setCurrentLocale(storedLocale);
    setTranslations(storedLocale === "ar" ? arTranslations : enTranslations);
  }, []);

  // Update translations whenever currentLocale changes
  useEffect(() => {
    if (currentLocale) {
      setTranslations(currentLocale === "ar" ? arTranslations : enTranslations);
    }
  }, [currentLocale]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top
  };

  const handleLanguageChange = (newLocale: string) => {
    localStorage.setItem("locale", newLocale);
    window.location.reload(); // Refresh the page after setting the locale
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

  // Don't render the page until the currentLocale is set to avoid flicker
  if (!currentLocale) {
    <Loader /> // or a loading spinner can be shown
  }

  return (
    <main className={`md:pt-[124px] pt-[62px] ${currentLocale === "ar" ? "rtl" : ""}`}>
      <nav className="fixed w-full bg-gray-100 px-2 dark:bg-slate-800 shadow-md z-30">
        {/* Language Switch */}
        
        {/* Desktop View */}
        <ul className={`hidden md:flex justify-center gap-8 p-1 ${currentLocale === "ar" ? "text-right" : "text-left"}`}>
          {Object.keys(translations.tabs).map((tab) => (
            <li
              key={tab}
              className={`cursor-pointer py-1 px-2 rounded-xl ${activeTab === tab ? "bg-green-500 text-white" : "bg-zinc-200 text-black"}`}
              onClick={() => handleTabClick(tab)}
            >
              {translations.tabs[tab as keyof typeof translations.tabs]} {/* Type assertion fixes the TS error */}
            </li>
          ))}
        </ul>

        {/* Mobile View */}
        <ul className="md:hidden flex justify-around p-2">
          <li className={`cursor-pointer ${activeTab === "All" ? "text-green-500" : "text-black dark:text-white"}`} onClick={() => handleTabClick("All")}>
            <FaHome />
          </li>
          <li className={`cursor-pointer ${activeTab === "ElectricalAppliance" ? "text-green-500" : "text-black dark:text-white"}`} onClick={() => handleTabClick("ElectricalAppliance")}>
            <FaPlug />
          </li>
          <li className={`cursor-pointer ${activeTab === "Kitchenware" ? "text-green-500" : "text-black dark:text-white"}`} onClick={() => handleTabClick("Kitchenware")}>
            <FaBlender />
          </li>
          <li className={`cursor-pointer ${activeTab === "Serveware" ? "text-green-500" : "text-black dark:text-white"}`} onClick={() => handleTabClick("Serveware")}>
            <FaUtensils />
          </li>
          <li className={`cursor-pointer ${activeTab === "HomeAppliance" ? "text-green-500" : "text-black dark:text-white"}`} onClick={() => handleTabClick("HomeAppliance")}>
            <FaHouseUser />
          </li>
        </ul>
      </nav>

      <div className="container mx-auto md:mt-10 mt-9 px-4">{renderContent()}</div>
    </main>
  );
}
