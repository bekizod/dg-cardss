// "use client";
// import { useState } from "react";
// import { FaHome, FaPlug, FaBlender, FaUtensils, FaHouseUser } from "react-icons/fa";
// import ElectricalAppliance from "@/components/ui/Home UI/PageBuilder";
// import HomeHero from "@/components/ui/Home UI/HomeHero";
// import KitchenWare from "@/components/ui/Home UI/KitchenWare";
// import Serveware from "@/components/ui/Home UI/Serveware";
// import HomeAppliance from "@/components/ui/Home UI/HomeAppliance";

// import Image from "next/image";
// import Navigation from "@/components/Test";

// export default function Home() {
//   const [activeTab, setActiveTab] = useState("All");

//   const handleTabClick = (tab: string) => {
//     setActiveTab(tab);
//     window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top
//   };

//   const renderContent = () => {
//     switch (activeTab) {
//       case "All":
//         return <HomeHero />;
//       case "ElectricalAppliance":
//         return <ElectricalAppliance />;
//       case "Kitchenware":
//         return <KitchenWare />;
//       case "Serveware":
//         return <Serveware />;
//       case "HomeAppliance":
//         return <HomeAppliance />;
//       default:
//         return <HomeHero />;
//     }
//   };

//   return (
//     <main className="md:pt-[124px] pt-[62px]">
//       <nav className="fixed w-full bg-gray-100 dark:bg-slate-800 shadow-md z-30">
//         <ul className="hidden md:flex justify-center space-x-8 p-1">
//           {["All", "ElectricalAppliance", "Kitchenware", "Serveware", "HomeAppliance"].map((tab) => (
//             <li key={tab} className={`cursor-pointer py-1 px-2 rounded-xl ${activeTab === tab ? "bg-[var(--color-primary)] dark:text-white text-white " : "dark:bg-slate-900  bg-[var(--color-secondary)]  dark:text-white text-black"}`} onClick={() => handleTabClick(tab)}>
//               {tab}
//             </li>
//           ))}
//         </ul>
//         <ul className="md:hidden flex justify-around p-2">
//           <li className={`cursor-pointer  ${activeTab === "All" ? "text-[var(--color-primary)]" : "text-black; dark:text-white"}`} onClick={() => handleTabClick("All")}>
//             <FaHome />
//           </li>
//           <li className={`cursor-pointer ${activeTab === "ElectricalAppliance" ? "text-[var(--color-primary)]" : "text-black; dark:text-white"}`} onClick={() => handleTabClick("ElectricalAppliance")}>
//             <FaPlug />
//           </li>
//           <li className={`cursor-pointer ${activeTab === "Kitchenware" ? "text-[var(--color-primary)]" : "text-black; dark:text-white"}`} onClick={() => handleTabClick("Kitchenware")}>
//             <FaBlender />
//           </li>
//           <li className={`cursor-pointer ${activeTab === "Serveware" ? "text-[var(--color-primary)]" : "text-black; dark:text-white"}`} onClick={() => handleTabClick("Serveware")}>
//             <FaUtensils />
//           </li>
//           <li className={`cursor-pointer ${activeTab === "HomeAppliance" ? "text-[var(--color-primary)]" : "text-black; dark:text-white"}`} onClick={() => handleTabClick("HomeAppliance")}>
//             <FaHouseUser />
//           </li>
//         </ul>
//       </nav>
//       <div className="container mx-auto md:mt-10 mt-9 px-4">{renderContent()}</div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FiGrid, FiChevronRight } from "react-icons/fi";
import { AppDispatch, RootState } from "@/redux/store";
import PageBuilder from "../components/ui/Home UI/PageBuilder";
import HomeHero from "@/components/ui/Home UI/HomeHero";

import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";
import Loader from "./loading";
import { fetchFirstFourParentCategories } from "@/redux/slices/parentCategoriesSlice";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector(
    (state: RootState) => state.parentCategoriesSlice as any
  );

  useEffect(() => {
    dispatch(fetchFirstFourParentCategories());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState<string>("All");
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
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );

  const handleTabClick = (tab: string, categoryId: string | null = null) => {
    setActiveTab(tab);
    setSelectedCategoryId(categoryId);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scrolls to the top
  };

  const handleLanguageChange = (newLocale: string) => {
    localStorage.setItem("locale", newLocale);
    window.location.reload(); // Refresh the page after setting the locale
  };

  const renderContent = () => {
    if (activeTab === "All") {
      return <HomeHero />;
    }
    return <PageBuilder parentId={selectedCategoryId} />;
  };

  // Don't render the page until the currentLocale is set to avoid flicker
  if (!currentLocale) {
    <Loader />; // or a loading spinner can be shown
  }
  const renderValue = (
    defaultValue: string,
    translatedValue: string | undefined
  ) => {
    return currentLocale === "ar" && translatedValue
      ? translatedValue
      : defaultValue;
  };
  return (
    <main className="    ">
      <nav className="fixed w-full  bg-gray-100 dark:bg-slate-800 shadow-md z-30">
        <ul className="hidden lg:flex justify-center gap-8 p-1">
          {/* All Tab */}
          <motion.li
            className="relative cursor-pointer py-1 px-2 group "
            onClick={() => handleTabClick("All")}
            whileHover={{ scale: 1.05 }}
            initial={false}
          >
            <div className="flex items-center gap-2">
              <motion.span
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "linear",
                }}
              >
                <FiGrid className="text-lg" />
              </motion.span>
              <span className={`${activeTab === "All" ? "font-medium" : ""}`}>
                All
              </span>
            </div>

            {/* Underline for active & hover */}
            {activeTab === "All" && (
              <motion.div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-[var(--color-primary)] dark:bg-slate-200 "
                layoutId="underline"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.li>

          {/* Category Tabs */}
          {categories.map((category: any) => (
            <motion.li
              key={category._id}
              className="relative cursor-pointer py-1 px-2 group"
              onClick={() =>
                handleTabClick(category.categoryName, category._id)
              }
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              initial={false}
            >
              <div className="flex items-center gap-1">
                <motion.span
                  className={`${
                    activeTab === category.categoryName ? "font-medium" : ""
                  }`}
                >
                  {renderValue(
                    category.categoryName,
                    category.translatedCategoryName
                  )}
                </motion.span>
                {/* <motion.span
                  animate={{
                    x: activeTab === category.categoryName ? 5 : 0,
                    opacity: activeTab === category.categoryName ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <FiChevronRight size={14} />
                </motion.span> */}
              </div>

              {/* Underline for active & hover */}
              {activeTab === category.categoryName ? (
                <motion.div
                  className="absolute bottom-0 left-0 w-full h-[2px] dark:bg-slate-200 bg-[var(--color-primary)]"
                  layoutId="underline"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.5,
                  }}
                />
              ) : (
                <motion.div className="absolute bottom-0 left-0 w-full h-[2px] dark:bg-slate-200 bg-[var(--color-primary)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              )}
            </motion.li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto   ">
        {isLoading ? <Loader /> : renderContent()}
      </div>
      {error && (
        <p className="text-red-500 py-6 font-bold flex justify-center items-center text-xl">
          {error}!!!
        </p>
      )}
    </main>
  );
}
