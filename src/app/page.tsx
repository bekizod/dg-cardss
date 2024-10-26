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











  



"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
 
import { AppDispatch, RootState } from "@/redux/store";
import PageBuilder from "../components/ui/Home UI/PageBuilder";
import HomeHero from "@/components/ui/Home UI/HomeHero";
import { fetchFirstFourParentCategories } from "@/redux/slices/parentCategoriesSlice";
export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, isLoading, error } = useSelector((state: RootState) => state.parentCategoriesSlice as any);

  useEffect(() => {
    dispatch(fetchFirstFourParentCategories());
  }, [dispatch]);

  const [activeTab, setActiveTab] = useState<string>("All");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleTabClick = (tab: string, categoryId: string | null = null) => {
    setActiveTab(tab);
    setSelectedCategoryId(categoryId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderContent = () => {
    if (activeTab === "All") {
      return <HomeHero />;;
    }
    return <PageBuilder parentId={selectedCategoryId} />;
  };

  return (
    <main className="md:pt-[124px] pt-[62px]">
      <nav className="fixed w-full bg-gray-100 dark:bg-slate-800 shadow-md z-30">
        <ul className="hidden md:flex justify-center space-x-8 p-1">
          <li className={`cursor-pointer py-1 px-2 rounded-xl ${activeTab === "All" ? "bg-[var(--color-primary)] dark:text-white text-white" : "dark:bg-slate-900 bg-[var(--color-secondary)] dark:text-white text-black"}`} onClick={() => handleTabClick("All")}>
            All
          </li>
          {categories.map((category: any) => (
            <li key={category._id} className={`cursor-pointer py-1 px-2 rounded-xl ${activeTab === category.categoryName ? "bg-[var(--color-primary)] dark:text-white text-white" : "dark:bg-slate-900 bg-[var(--color-secondary)] dark:text-white text-black"}`} onClick={() => handleTabClick(category.categoryName, category._id)}>
              {category.categoryName}
            </li>
          ))}
        </ul>
      </nav>
      <div className="container mx-auto md:mt-10 mt-9 px-4">{isLoading ? "Loading..." : renderContent()}</div>
      {error && <p className="text-red-500">{error}</p>}
    </main>
  );
}
