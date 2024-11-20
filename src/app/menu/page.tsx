"use client";
import { sideNav as tabs, cardData } from "../../utils/data";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  fetchParentCategories,
  fetchSubCategories,
} from "@/redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import Link from "next/link";
import Loader from "../loading";

const Page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [parentName, setParentName] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("");

  const { parentCategories, subCategories, loading, error } = useSelector(
    (state: RootState) =>
      state.categories as {
        parentCategories: any[];
        subCategories: any[];
        loading: boolean;
        error: string;
      }
  );

  useEffect(() => {
    // Fetch parent categories
    dispatch(fetchParentCategories());
  }, [dispatch]);

  const handleTabClick = (parentId: string, parentName: string) => {
    setActiveTab(parentId);
    setParentName(parentName);
    dispatch(fetchSubCategories(parentId));
  };

  useEffect(() => {
    if (parentCategories.length > 0 && !activeTab) {
      const firstParentId = parentCategories[0]._id;
      setParentName(parentCategories[0].categoryName);
      setActiveTab(firstParentId);
      dispatch(fetchSubCategories(firstParentId));
    }
  }, [parentCategories, activeTab, dispatch]);

  return (
    <div className="flex overflow-hidden h-screen mt-[64px] bg-gray-100 dark:bg-slate-900">
      {/* Parent Categories Section */}
      <div className="w-1/4 h-full border-r border-gray-300 dark:border-slate-600 relative overflow-y-auto scrollbar-hidden">
        <div className="grid gap-2">
          {loading && !parentCategories.length ? (
            <div className="flex justify-center items-center py-4">
              Loading parent categories...
            </div>
          ) : error && !parentCategories.length ? (
            <div className="flex justify-center items-center py-4 text-red-500">
              Error fetching parent categories
            </div>
          ) : (
            parentCategories.map((tab) => (
              <button
                key={tab._id}
                onClick={() => handleTabClick(tab._id, tab.categoryName)}
                className={`flex items-center gap-2 py-2 justify-center ${
                  activeTab === tab._id
                    ? "bg-[var(--color-primary)] text-white"
                    : " dark:bg-slate-900"
                } rounded-md transition-colors`}
              >
                <div className="grid gap-2 place-items-center text-center  ">
                  <Image
                    src={tab?.categoryLogo?.data}
                    alt={tab.categoryName}
                    width={20}
                    height={20}
                    className="text-green-500"
                  />
                  <span className="text-xs text-center">
                    {tab.categoryName}
                  </span>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Subcategories Section */}
      <div className="w-3/4 p-1 md:p-6 h-full overflow-y-auto scrollbar-hidden bg-white dark:bg-slate-900">
        {loading && !subCategories?.length ? (
          <Loader />
        ) : error && !subCategories?.length ? (
          <div className="flex justify-center items-center py-4 text-red-500">
            Error fetching subcategories
          </div>
        ) : subCategories && subCategories?.length > 0 ? (
          // <motion.div
          //   className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          //   initial={{ opacity: 0 }}
          //   animate={{ opacity: 1 }}
          //   transition={{ duration: 0.3 }}
          // >
          //   {subCategories.map((card) => (
          // <Link
          //   href={`/${parentName}/${card.parentCategory}/${card.categoryName}/${card._id}`}
          //   key={card._id}
          // >
          //       <motion.div
          //         key={card._id}
          // className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl dark:hover:shadow-slate-950 ${
          //   activeTab === card.id ? "ring-2 ring-green-500" : ""
          // }`}
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: 20 }}
          // transition={{ duration: 0.3 }}
          //       >
          //         <Image
          //           src={card.categoryLogo?.data}
          //           alt={card.categoryName}
          //           width={1000}
          //           height={1000}
          //           className="w-full object-contain mb-4 h-28 rounded-md"
          //         />
          //         <p className="text-sm">{card.categoryName}</p>
          //       </motion.div>
          //     </Link>
          //   ))}
          // </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4    lg:gap-6 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {subCategories.map((card) => (
              <motion.div
                key={card.id}
                className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl dark:hover:shadow-slate-950 ${
                  activeTab === card.id ? "ring-2 ring-green-500" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/${parentName}/${card.parentCategory}/${card.categoryName}/${card._id}`}
                  key={card._id}
                >
                  <Image
                    src={card.categoryLogo?.data}
                    alt={card.categoryName}
                    width={1000}
                    height={1000}
                    layout="responsive"
                    className="w-36 object-contain mb-4 rounded-md"
                  />
                  <div className="text-xs sm:text-sm flex justify-center items-center  ">
                    {card.categoryName}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            No subcategories found
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
