"use client"
import { sideNav as tabs, cardData } from "../../utils/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { SetStateAction, useState } from "react";

const Page = () => {
  // Your state and handler functions here
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [filteredCards, setFilteredCards] = useState(cardData);

   const handleTabClick = (id: number) => {
     setActiveTab(id);
     filterCards(id);
   };

   const filterCards = (tabId: number) => {
     const category = tabs.find((tab) => tab.id === tabId)?.label || "";
     setFilteredCards(cardData.filter((card) => card.category === category));
   };
  return (
    <div className="flex  overflow-y-hidden lg:hidden h-screen mt-[64px] bg-gray-100 dark:bg-slate-900">
      {/* Tabs Section */}
      <div className="w-1/4 flex  flex-col border-r border-gray-300 dark:border-slate-600 relative">
        <div className="scrollbar-hidden">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => handleTabClick(tab.id)} className={`flex items-center gap-2 text-center  py-2 justify-center ${activeTab === tab.id ? "bg-gray-300 dark:bg-slate-700 text-green-500" : "hover:bg-gray-200 dark:hover:bg-slate-600"}`}>
              <div className="flex flex-col justify-center text-center items-center">
                <Image src={tab.icon} alt={tab.label} width={20} height={20} className="text-green-500" />
                <span className="text-xs text-center">{tab.label}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-3/4 p-6 overflow-y-auto bg-white dark:bg-slate-900">
        <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          {filteredCards.map((card) => (
            <motion.div key={card.id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl dark:hover:shadow-slate-950" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
              <Image src={card.image} alt={card.title} width={150} height={150} className="w-full object-contain mb-4 rounded-md" />
              <p className="text-sm">{card.title}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;
