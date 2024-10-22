"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiAlignLeft } from "react-icons/tfi";
import { FaRegUser, FaSignOutAlt } from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { sideNav as tabs, cardData } from "../utils/data";
import { useAuth } from "@/context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchParentCategories, fetchSubCategories } from "@/redux/slices/categorySlice";
import { useRouter } from "next/navigation";

 
export default function TopNextNavbar({ logoUrl }: { logoUrl: string }) {
  const router = useRouter();
  const [parentName, setParentName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const [filteredCards, setFilteredCards] = useState(cardData);
  const { user, logout } = useAuth(); // Get user and logout function from context
  const dispatch = useDispatch<AppDispatch>();
  const { parentCategories, subCategories, loading, error } = useSelector((state: RootState) => state.categories as { parentCategories: any[]; subCategories: any[]; loading: boolean; error: string });
  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const filterCards = (tabId: number) => {
    const category = tabs.find((tab) => tab.id === tabId)?.label || "";
    setFilteredCards(cardData.filter((card) => card.category === category));
  };

  const handleLogout = () => {
    logout(); // Call logout function from the context
  };

  useEffect(() => {
    if (isModalOpen) {
      // Fetch parent categories when the modal opens
      dispatch(fetchParentCategories());
    }
  }, [isModalOpen, dispatch]);

  useEffect(() => {
    // Automatically fetch subcategories of the first parent category when parentCategories are loaded
    if (parentCategories.length > 0 && !activeTab) {
      const firstParentId = parentCategories[0]._id;
      setParentName(parentCategories[0].categoryName);
      setActiveTab(firstParentId);
      dispatch(fetchSubCategories(firstParentId));
    }
  }, [parentCategories, activeTab, dispatch]);

  const handleTabClick = (parentId: string, parentName: string) => {
    setActiveTab(parentId);
    setParentName(parentName);
    dispatch(fetchSubCategories(parentId));
  };

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleModalToggle();
    }
  };
  return (
    <div className="flex flex-row justify-between items-center px-6 py-3 md:px-12 md:py-3 bg-white dark:bg-slate-950">
      {/* For Large Devices: Logo, Search, User/Cart */}
      <div className="hidden lg:flex gap-24 items-center w-full">
        {/* Logo Section */}
        <div className="flex gap-4 items-center">
          <div className="text-3xl p-2 rounded bg-[var(--color-secondary)] cursor-pointer" onClick={handleModalToggle}>
            <TfiAlignLeft className="text-[var(--color-primary)]" />
          </div>
          <Link href="/">
            <Image src={logoUrl} width={120} height={20} alt="logo" className="h-16 w-auto" />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 mx-4">
          <div className="relative flex items-center">
            <AiOutlineSearch className="text-[var(--color-primary)] absolute left-3" />
            <input type="text" placeholder="What are you looking for?" className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[var(--color-secondary)]   dark:bg-slate-800" />
          </div>
        </div>

        {/* User and Cart Section */}
        <div className="flex items-center gap-6">
          {user ? (
            // Show user name and logout option if token exists
            <>
              <div className="flex items-center gap-2 text-sm cursor-pointer">
                <Link href="/account" className="flex items-center flex-row gap-2">
                  <FaRegUser className="text-[var(--color-primary)]" />
                  <span className=" ">{user.firstName} </span>
                </Link>
              </div>
              <div className="hidden md:block">|</div>
              <button onClick={handleLogout} className="flex items-center gap-2 text-sm cursor-pointer">
                <FaSignOutAlt className="text-red-500" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            // If no user, show login link
            <Link href="/login" className="flex items-center gap-2 text-sm cursor-pointer">
              <FaRegUser className="text-[var(--color-primary)]" />
              <span className="hidden md:inline">Account/Login</span>
            </Link>
          )}
          <div className="hidden md:block">|</div>
          <Link href="/cart" className="flex items-center gap-2 text-sm cursor-pointer">
            <MdOutlineShoppingCart className="text-[var(--color-primary)]" />
            <span className="hidden md:inline">Cart</span>
          </Link>
        </div>
      </div>

      {/* For Small/Medium Devices: Logo, Search, Favorite */}
      <div className="lg:hidden flex w-full justify-between items-center -mt-2">
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
          <MdFavoriteBorder className="text-[var(--color-primary)] text-2xl cursor-pointer" />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={handleBackgroundClick}>
            <motion.div className="flex w-full h-[90vh] max-w-screen-lg bg-white dark:bg-slate-900 rounded-lg overflow-hidden relative" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} transition={{ duration: 0.3 }}>
              {/* Close Button */}
              <button className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-300" onClick={handleModalToggle}>
                &times;
              </button>

              {/* Modal Content */}
              <div className="flex w-full h-full">
                {/* Tabs Section (Parent Categories) */}
                <div className="w-1/4 bg-gray-100 dark:bg-slate-800 flex flex-col border-r justify-evenly border-gray-300 dark:border-slate-600">
                  <>
                    {parentCategories.map((category) => (
                      <button key={category._id} onClick={() => handleTabClick(category._id, category.categoryName)} className={`flex items-center gap-2 px-4 py-2 text-left ${activeTab === category._id ? "bg-gray-300 dark:bg-slate-700 text-[var(--color-primary)]" : "hover:bg-gray-200 dark:hover:bg-slate-600"}`}>
                        <Image src={category.categoryLogo?.data} alt={category.categoryName} width={30} height={30} className="text-green-500" />
                        {category.categoryName}
                      </button>
                    ))}
                  </>

                  {error && <p className="text-red-500">{error}</p>}
                </div>

                {/* Cards Section (Subcategories) */}
                <div className="w-3/4 p-6 overflow-y-auto h-full">
                  {loading ? (
                    <div role="status" className="space-y-8 py-3  animate-pulse   rtl:space-x-reverse flex   flex-col px-6 ">
                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center  w-full    h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center  w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>
                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center  w-full    h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center  w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>

                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center  w-full    h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center  w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
                          <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                          </svg>
                        </div>
                      </div>

                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : subCategories?.length > 0 ? (
                    <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      {subCategories.map((subCategory) => (
                        <Link onClick={() => setIsModalOpen(false)} href={`${parentName}/${subCategory.parentCategory}/${subCategory.categoryName}/${subCategory._id}`} key={subCategory._id} className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl dark:hover:shadow-slate-950">
                          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.3 }}>
                            <Image src={subCategory.categoryLogo?.data} alt={subCategory.categoryName} width={150} height={150} className="w-full object-contain mb-4 rounded-md" />
                            <p className="hover:text-[var(--color-primary)]">{subCategory.categoryName}</p>
                          </motion.div>
                        </Link>
                      ))}
                    </motion.div>
                  ) : (
                    <p>No subcategories available for this category.</p>
                  )}

                  {/* {!loading && subCategories?.length === 0 && <p>No subcategories available for this category.</p>} */}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
