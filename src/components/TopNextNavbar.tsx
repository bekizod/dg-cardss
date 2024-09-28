import { useRouter } from "next/router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiAlignLeft } from "react-icons/tfi";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { sideNav as tabs, cardData } from "../utils/data";
import { useTranslation } from "next-i18next";

interface TopNextNavbarProps {
  onLanguageToggle: () => void;
}

export default function TopNextNavbar({ onLanguageToggle }: TopNextNavbarProps) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<number>(1);
  const [filteredCards, setFilteredCards] = useState(cardData);

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

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center px-6 py-3 md:px-12 md:py-3 bg-white dark:bg-slate-950">
      {/* Language Toggle */}
      {/* <button onClick={onLanguageToggle} className="text-green-500">
        {t("toggle_language")}
      </button> */}

      {/* Rest of the Navbar */}
      {/* For Large Devices: Logo, Search, User/Cart */}
      <div className="hidden lg:flex gap-24 items-center w-full">
        <div className="flex gap-4 items-center">
          <div className="text-3xl cursor-pointer" onClick={handleModalToggle}>
            <TfiAlignLeft className="text-green-500" />
          </div>
          <Link href="/">
            <Image src="/logo_landscape (1).svg" width={120} height={20} alt="logo" className="h-16 w-auto" />
          </Link>
        </div>

        <div className="flex-1 mx-4">
          <div className="relative flex items-center">
            <AiOutlineSearch className="text-green-500 absolute left-3" />
            <input type="text" placeholder={t("search_placeholder")} className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[#F5F5F5] md:bg-[#E9FFF1] dark:bg-slate-800" />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/login" className="flex items-center gap-2 text-sm cursor-pointer">
            <FaRegUser className="text-green-500" />
            <span className="hidden md:inline">{t("account_login")}</span>
          </Link>
          <div className="hidden md:block">|</div>
          <Link href="/cart" className="flex items-center gap-2 text-sm cursor-pointer">
            <MdOutlineShoppingCart className="text-green-500" />
            <span className="hidden md:inline">{t("cart")}</span>
          </Link>
        </div>
      </div>

      {/* For Small/Medium Devices: Logo, Search, Favorite */}
      <div className="lg:hidden flex w-full justify-between items-center -mt-2">
        <div className="relative w-10 h-12">
          <Image src="/logo_landscape-cropped.svg" layout="fill" objectFit="contain" alt="logo" className="object-contain" />
        </div>

        <div className="flex-1 mx-3">
          <div className="relative flex items-center">
            <AiOutlineSearch className="absolute left-3 text-gray-500" />
            <input type="text" placeholder={t("search_placeholder")} className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[#F5F5F5] md:bg-[#E9FFF1] dark:bg-slate-800" />
          </div>
        </div>

        <div className="flex items-center">
          <MdFavoriteBorder className="text-green-500 text-2xl cursor-pointer" />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleBackgroundClick}>
            <motion.div className="flex w-full h-[90vh] max-w-screen-lg bg-white dark:bg-slate-900 rounded-lg overflow-hidden relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <div className="w-full flex flex-col md:flex-row h-full">
                {/* Modal Content */}
                <div className="flex-1 flex flex-col">
                  <button className="absolute top-4 right-4 text-2xl" onClick={handleModalToggle}>
                    ×
                  </button>
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                      {tabs.map((tab) => (
                        <button key={tab.id} className={`block w-full text-left px-4 py-2 text-lg ${activeTab === tab.id ? "bg-gray-200 dark:bg-gray-700" : ""}`} onClick={() => handleTabClick(tab.id)}>
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
