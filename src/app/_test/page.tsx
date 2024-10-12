// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { BsChevronDown, BsChevronUp, BsSortDown, BsFilter } from "react-icons/bs";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";

// const ProductPage: React.FC = () => {
//   const [isSizeOpen, setIsSizeOpen] = useState(false);
//   const [isColorOpen, setIsColorOpen] = useState(false);
//   const [isBrandOpen, setIsBrandOpen] = useState(false);
//   const [isMaterialOpen, setIsMaterialOpen] = useState(false);
//   const [sortModalOpen, setSortModalOpen] = useState(false);
//   const [filterModalOpen, setFilterModalOpen] = useState(false);
//   const [isPriceOpen, setIsPriceOpen] = useState(false);
//   const sortModalRef = useRef<HTMLDivElement>(null);
//   const filterModalRef = useRef<HTMLDivElement>(null);
//   const [minValue, setMinValue] = useState(0);
//   const [maxValue, setMaxValue] = useState(40000);
 
//   const [selectedFilters, setSelectedFilters] = useState({
//     size: [] as string[],
//     color: [] as string[],
//     brand: [] as string[],
//     material: [] as string[],
//   });

//   const toggleFilter = (filterSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
//     filterSetter((prev) => !prev);
//   };
//   const toggleSortModal = () => setSortModalOpen(!sortModalOpen);
//   const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);

//   const handleCheckboxChange = (category: keyof typeof selectedFilters, value: string) => {
//     setSelectedFilters((prev) => {
//       const isSelected = prev[category].includes(value);
//       if (isSelected) {
//         return {
//           ...prev,
//           [category]: prev[category].filter((item) => item !== value),
//         };
//       } else {
//         return {
//           ...prev,
//           [category]: [...prev[category], value],
//         };
//       }
//     });
//   };

//   const clearAllFilters = () => {
//     setSelectedFilters({
//       size: [],
//       color: [],
//       brand: [],
//       material: [],
//     });
//     setMinValue(0)
//     setMaxValue(40000)
//   };

//   useEffect(() => {
//     console.log("Checked elements:", selectedFilters);
//   }, [selectedFilters]);

//   const handleClickOutside = (event: MouseEvent) => {
//     if (sortModalRef.current && !sortModalRef.current.contains(event.target as Node)) {
//       setSortModalOpen(false);
//     }
//     if (filterModalRef.current && !filterModalRef.current.contains(event.target as Node)) {
//       setFilterModalOpen(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="container w-[100vw]  p-2 mt-[124px] dark:bg-slate-900 dark:text-white lg:mx-auto">
//       {/* Breadcrumb */}
//       <div className="mb-4">
//         <nav aria-label="breadcrumb">
//           <ol className="flex space-x-2 text-sm">
//             <li>
//               <a href="#" className="text-gray-600 dark:text-gray-300">
//                 Home
//               </a>
//             </li>
//             <li>/</li>
//             <li>
//               <a href="#" className="text-gray-600 dark:text-gray-300">
//                 Category
//               </a>
//             </li>
//             <li>/</li>
//             <li className="text-gray-900 dark:text-gray-100">Product List</li>
//           </ol>
//         </nav>
//       </div>

//       {/* Main Section */}
//       <div className="flex flex-col lg:flex-row-reverse space-y-4 lg:space-y-0 ">
//         {/* Right Column - Products and Sort */}
//         <div className="w-full lg:w-3/4">
//           {/* Title and Product Count */}
//           <div className="mb-4">
//             <h2 className="text-2xl font-bold">
//               Products <span className="font-serif px-10 text-sm">50 Products</span>
//             </h2>
//           </div>

//           {/* Sort and Filter Buttons for Small Screens */}
//           <div className="flex flex-row justify-between space-x-2 mb-4 lg:hidden">
//             <button onClick={toggleSortModal} className="py-2 px-4 w-1/3 bg-gray-200 justify-center place-items-center dark:bg-gray-600 rounded flex items-center space-x-2">
//               <BsSortDown className="text-gray-700 dark:text-gray-300" />
//               <span>Sort</span>
//             </button>
//             <button onClick={toggleFilterModal} className="py-2 px-4 w-1/3 justify-center place-items-center text-center bg-gray-200 dark:bg-gray-600 rounded flex items-center space-x-2">
//               <BsFilter className="text-gray-700 dark:text-gray-300" />
//               <span>Filter</span>
//             </button>
//           </div>

//           {/* Sort Modal */}
//           {sortModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//               <div ref={sortModalRef} className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
//                 <h3 className="text-lg font-bold mb-4">Sort by</h3>
//                 <div className="flex flex-col space-y-2">
//                   <label>
//                     <input type="radio" name="sort" value="price-asc" defaultChecked /> Price: Low to High
//                   </label>
//                   <label>
//                     <input type="radio" name="sort" value="price-desc" /> Price: High to Low
//                   </label>
//                   <label>
//                     <input type="radio" name="sort" value="newest" /> Newest
//                   </label>
//                   <label>
//                     <input type="radio" name="sort" value="popularity" /> Popularity
//                   </label>
//                 </div>
//                 <button onClick={toggleSortModal} className="mt-4 py-2 px-4 bg-blue-600 text-white dark:bg-blue-500 rounded">
//                   Close
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Filter Modal for Small Screens */}
//           {filterModalOpen && (
//             <div className="fixed inset-0 lg:hidden bg-black bg-opacity-50 flex justify-center items-center z-50 h-auto">
//               <div ref={filterModalRef} className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-y-auto scrollbar-hidden">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-xl font-bold">Filter by</h3>
//                   <button onClick={clearAllFilters} className="text-sm text-red-600">
//                     Clear All
//                   </button>
//                 </div>

//                 {/* Filter Types */}
//                 {[
//                   { label: "Size", state: isSizeOpen, setter: setIsSizeOpen, options: ["6.5 L", "40 cm", "1.8 L", "3.5 L", "60 L", "22 L", "21 L", "9 L", "1.7 L", "3.2 لتر"], category: "size" },
//                   { label: "Color", state: isColorOpen, setter: setIsColorOpen, options: ["Black", "Silver", "Grey", "White", "Dark grey", "Beige", "Pink", "Light Grey", "Green", "Brown"], category: "color" },
//                   { label: "Brand", state: isBrandOpen, setter: setIsBrandOpen, options: ["Brand A", "Brand B", "Brand C"], category: "brand" },
//                   { label: "Material", state: isMaterialOpen, setter: setIsMaterialOpen, options: ["Cotton", "Wool", "Polyester"], category: "material" },
//                 ].map((filter, index) => (
//                   <div key={index} className="mb-4">
//                     <button onClick={() => toggleFilter(filter.setter)} className="flex justify-between items-center w-full text-left">
//                       <span className="text-lg font-medium">{filter.label}</span>
//                       {filter.state ? <BsChevronUp /> : <BsChevronDown />}
//                     </button>
//                     {filter.state && (
//                       <div className="mt-2">
//                         <ul className="space-y-2">
//                           {filter.options.map((option, idx) => (
//                             <li key={idx} className={`flex items-center justify-center mx-12  space-x-2 hover:bg-slate-500 cursor-pointer ${selectedFilters[filter.category].includes(option) ? "text-blue-600 font-semibold bg-slate-600" : "text-gray-700 dark:text-gray-300"}`} onClick={() => handleCheckboxChange(filter.category, option)}>
//                               <span>{option}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     )}
//                     <hr className="mx-11" />
//                   </div>
//                 ))}
//                 {/* Price Filter */}
//                 <div className="mb-4">
//                   <button onClick={() => toggleFilter(setIsPriceOpen)} className="flex justify-between items-center w-full text-left">
//                     <span className="text-lg font-medium">Price</span>
//                     {isPriceOpen ? <BsChevronUp /> : <BsChevronDown />}
//                   </button>
//                   {isPriceOpen && (
//                     <div className="mt-2 ">
//                       <MultiRangeSlider
//                         min={0}
//                         max={40000}
//                         step={1000}
//                         minValue={minValue}
//                         maxValue={maxValue}
//                         onInput={(e) => {
//                           setMinValue(e.minValue);
//                           setMaxValue(e.maxValue);
//                         }}
//                       />
//                       <div className="flex justify-between mt-2">
//                         <span>Min: {minValue}</span>
//                         <span>Max: {maxValue}</span>
//                       </div>
//                     </div>
//                   )}
//                   <hr className="mx-11" />
//                 </div>
//                 <button onClick={toggleFilterModal} className="mt-4 w-full py-2 bg-green-600 text-white dark:bg-green-500 rounded">
//                   Show Results
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Product Cards */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-3">
//             {/* Example product cards */}
//             {Array.from({ length: 20 }).map((_, index) => (
//               <motion.div key={index} className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg dark:shadow-gray-700 overflow-hidden" whileHover={{ y: -10, transition: { duration: 0.3 } }}>
//                 <Link href="/SA_en/edison-electric-bakery-controller-disc-40-cm-brown-2200-w-2-slots.html">
//                   <div className="block relative p-2 sm:p-3 md:p-4">
//                     <p className="absolute top-0 right-0 bg-green-500 text-white text-xs sm:text-sm font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">
//                       50% <br /> OFF
//                     </p>
//                     <div className="w-full flex justify-center items-center bg-transparent">
//                       <motion.div whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}>
//                         <Image id="CAT17-001181" src="/side cards/side Best Categories/BC01.png" alt="Edison Electric Bakery, Controller Disc 40 cm Brown 2200 W, 2-Slots product image" width={150} height={100} loading="eager" fetchPriority="high" className="w-full h-auto object-contain rounded-xl" />
//                       </motion.div>
//                     </div>
//                     <h2 className="font-semibold mt-1 text-center text-gray-900 text-xs sm:text-sm dark:text-gray-100">Edison Electric Bakery, Controller Disc 40 cm Brown 2200 W, 2-Slots</h2>
//                     <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">Edison</p>
//                     <div className="mt-1 text-center">
//                       <p className="text-sm sm:text-base font-bold text-red-500">244 SAR</p>
//                       <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">488 SAR</p>
//                       <p className="text-xs text-green-500">SAVE 244 SAR</p>
//                     </div>
//                     <motion.button whileTap={{ scale: 0.95 }} className="mt-2 w-full bg-green-500 dark:bg-green-700 text-white font-bold text-xs sm:text-sm py-1 sm:py-2 rounded-xl">
//                       Add to Cart
//                     </motion.button>
//                   </div>
//                 </Link>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Left Column - Filter */}
//         <div className="p-3 w-1/3 max-w-lg mx-auto my-8 hidden lg:block">
//           <div className="bg-white rounded shadow-lg p-5 dark:bg-gray-700">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Filter by</h3>
//               <button onClick={clearAllFilters} className="text-sm text-red-600">
//                 Clear All
//               </button>
//             </div>

//             {/* Filter Types */}
//             {[
//               { label: "Size", state: isSizeOpen, setter: setIsSizeOpen, options: ["6.5 L", "40 cm", "1.8 L", "3.5 L", "60 L", "22 L", "21 L", "9 L", "1.7 L", "3.2 لتر"], category: "size" },
//               { label: "Color", state: isColorOpen, setter: setIsColorOpen, options: ["Black", "Silver", "Grey", "White", "Dark grey", "Beige", "Pink", "Light Grey", "Green", "Brown"], category: "color" },
//               { label: "Brand", state: isBrandOpen, setter: setIsBrandOpen, options: ["Brand A", "Brand B", "Brand C"], category: "brand" },
//               { label: "Material", state: isMaterialOpen, setter: setIsMaterialOpen, options: ["Cotton", "Wool", "Polyester"], category: "material" },
//             ].map((filter, index) => (
//               <div key={index} className="mb-4">
//                 <button onClick={() => toggleFilter(filter.setter)} className="flex justify-between items-center w-full text-left">
//                   <span className="text-lg font-medium">{filter.label}</span>
//                   {filter.state ? <BsChevronUp /> : <BsChevronDown />}
//                 </button>
//                 {filter.state && (
//                   <div className="mt-2">
//                     <ul className="space-y-2">
//                       {filter.options.map((option, idx) => (
//                         <li key={idx} className={`flex items-center justify-center mx-12 space-x-2 hover:bg-slate-300 dark:hover:bg-slate-500 cursor-pointer ${selectedFilters[filter.category].includes(option) ? "text-blue-600 font-semibold bg-slate-200 dark:bg-slate-600" : "text-gray-700 dark:text-gray-300"}`} onClick={() => handleCheckboxChange(filter.category, option)}>
//                           <span>{option}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <hr className="mx-11" />
//               </div>
//             ))}

//             {/* Price Filter */}
//             <div className="mb-4">
//               <button onClick={() => toggleFilter(setIsPriceOpen)} className="flex justify-between items-center w-full text-left">
//                 <span className="text-lg font-medium">Price</span>
//                 {isPriceOpen ? <BsChevronUp /> : <BsChevronDown />}
//               </button>
//               {isPriceOpen && (
//                 <div className="mt-2 ">
//                   <MultiRangeSlider
//                     min={0}
//                     max={40000}
//                     step={1000}
//                     minValue={minValue}
//                     maxValue={maxValue}
//                     onInput={(e) => {
//                       setMinValue(e.minValue);
//                       setMaxValue(e.maxValue);
//                     }}
//                   />
//                   <div className="flex justify-between mt-2">
//                     <span>Min: {minValue}</span>
//                     <span>Max: {maxValue}</span>
//                   </div>
//                 </div>
//               )}
//               <hr className="mx-11" />
//             </div>

//             <button onClick={toggleFilterModal} className="mt-4 w-full py-2 bg-green-600 text-white dark:bg-green-500 rounded">
//               Show Results
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductPage;












// // "use client";
// // import React, { useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { RootState, AppDispatch } from '@/redux/store';
// // import { fetchParentCategories, fetchSubCategories } from '@/redux/slices/categorySlice';

// // const Categories = () => {
// //   const dispatch = useDispatch<AppDispatch>();
// //   const { parentCategories, subCategories, loading, error } = useSelector((state: RootState) => state.categories);

// //   useEffect(() => {
// //     dispatch(fetchParentCategories());
// //   }, [dispatch]);

// //   const handleParentCategoryClick = (parentId: string) => {
// //     dispatch(fetchSubCategories(parentId));
// //     console.log("parent id:" + parentId )
// //   };

// //   return (
// //     <div className='container w-[100vw] p-2 mt-[124px] dark:bg-slate-900 dark:text-white lg:mx-auto'>
// //       <h1>Categories</h1>

// //       {loading && <p>Loading...</p>}
// //       {error && <p className='text-red-500'>{error}</p>}

// //       <div>
// //         <h2>Parent Categories:</h2>
// //         {parentCategories.length > 0 ? (
// //           <ul>
// //             {parentCategories.map((category: any) => (
// //               <li
// //                 key={category._id}
// //                 onClick={() => handleParentCategoryClick(category._id)}
// //                 className='cursor-pointer text-blue-500 hover:underline'
// //               >
// //                 {category.categoryName}
// //               </li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>No parent categories available.</p>
// //         )}
// //       </div>

// //       <div className='mt-4'>
// //         <h2>Subcategories:</h2>
// //         {subCategories.length > 0 ? (
// //           <ul>
// //             {subCategories.map((subCategory: any) => (
// //               <li key={subCategory._id}>{subCategory.categoryName}</li>
// //             ))}
// //           </ul>
// //         ) : (
// //           <p>No subcategories available for this parent category.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Categories;







// // // "use client"; // Make sure this is a Client Component
// // // import React, { useEffect } from 'react';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { fetchParentCategories, fetchSubCategories } from '@/redux/slices/categorySlice';
// // // import { RootState } from '@/redux/store'; // Adjust the path to your store

// // // export default function CategoryComponent() {
// // //   const dispatch = useDispatch();
// // //   const { parentCategories, subCategories, loading, error } = useSelector((state: RootState) => state.categories);

// // //   useEffect(() => {
// // //     // Fetch the parent categories when the component mounts
// // //     dispatch(fetchParentCategories());
// // //   }, [dispatch]);

// // //   // Function to handle fetching subcategories when a parent category is clicked
// // //   const handleParentClick = (parentId: string) => {
// // //     dispatch(fetchSubCategories(parentId));
// // //   };

// // //   if (loading) return <p>Loading...</p>;
// // //   if (error) return <p>{error}</p>;

// // //   return (
// // //     <div className="mt-[124px] h-screen">
// // //       <h2>Parent Categories</h2>
// // //       <ul>
// // //         {parentCategories.map((parent) => (
// // //           <li key={parent._id}>
// // //             <button onClick={() => handleParentClick(parent._id)}>{parent.name}</button>
// // //           </li>
// // //         ))}
// // //       </ul>

// // //       <h3>Subcategories</h3>
// // //       <ul>
// // //         {subCategories.length > 0 ? (
// // //           subCategories.map((subCategory) => (
// // //             <li key={subCategory._id}>{subCategory.name}</li>
// // //           ))
// // //         ) : (
// // //           <p>No subcategories found for this parent category.</p>
// // //         )}
// // //       </ul>
// // //     </div>
// // //   );
// // // }
