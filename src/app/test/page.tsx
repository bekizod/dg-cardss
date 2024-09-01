"use client";
import React, { useState, useEffect } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const ProductPage: React.FC = () => {
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({
    size: [] as string[],
    color: [] as string[],
    brand: [] as string[],
    material: [] as string[],
  });

  const toggleFilter = (filterSetter: React.Dispatch<React.SetStateAction<boolean>>) => {
    filterSetter((prev) => !prev);
  };

  const toggleSortModal = () => setSortModalOpen(!sortModalOpen);

  const handleCheckboxChange = (category: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => {
      const isSelected = prev[category].includes(value);
      if (isSelected) {
        return {
          ...prev,
          [category]: prev[category].filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [category]: [...prev[category], value],
        };
      }
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({
      size: [],
      color: [],
      brand: [],
      material: [],
    });
  };

  useEffect(() => {
    console.log("Checked elements:", selectedFilters);
  }, [selectedFilters]);

  return (
    <div className="container mx-auto p-4 mt-[124px] dark:bg-gray-800 dark:text-white">
      {/* Breadcrumb */}
      <div className="mb-4">
        <nav aria-label="breadcrumb">
          <ol className="flex space-x-2 text-sm">
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300">
                Home
              </a>
            </li>
            <li>/</li>
            <li>
              <a href="#" className="text-gray-600 dark:text-gray-300">
                Category
              </a>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100">Product List</li>
          </ol>
        </nav>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
        {/* Left Column - Filter Menu */}
        <div className="w-full lg:w-1/4 p-4 bg-white dark:bg-gray-700 rounded shadow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Filter by</h3>
            <button onClick={clearAllFilters} className="text-sm text-red-600">
              Clear All
            </button>
          </div>

          {/* Filter Types */}
          {[
            { label: "Size", state: isSizeOpen, setter: setIsSizeOpen, options: ["S", "M", "L", "XL"], category: "size" },
            { label: "Color", state: isColorOpen, setter: setIsColorOpen, options: ["Red", "Blue", "Green", "Black"], category: "color" },
            { label: "Brand", state: isBrandOpen, setter: setIsBrandOpen, options: ["Brand A", "Brand B", "Brand C"], category: "brand" },
            { label: "Material", state: isMaterialOpen, setter: setIsMaterialOpen, options: ["Cotton", "Wool", "Polyester"], category: "material" },
          ].map((filter, index) => (
            <div key={index} className="mb-4">
              <button onClick={() => toggleFilter(filter.setter)} className="flex justify-between items-center w-full text-left">
                <span className="text-lg font-medium">{filter.label}</span>
                {filter.state ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              {filter.state && (
                <div className="mt-2">
                  <ul className="space-y-2">
                    {filter.options.map((option, idx) => (
                      <li
                        key={idx}
                        className={`flex items-center space-x-2 cursor-pointer ${
                          selectedFilters[filter.category].includes(option) ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-300"
                        }`}
                        onClick={() => handleCheckboxChange(filter.category, option)}
                      >
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <hr className="mx-11" />
            </div>
          ))}

          <button className="mt-4 w-full py-2 bg-blue-600 text-white dark:bg-blue-500 rounded">Show Results</button>
        </div>

        {/* Right Column - Products and Sort */}
        <div className="w-full lg:w-3/4">
          {/* Title and Product Count */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Products (50)</h2>
          </div>

          {/* Sort Button */}
          <div className="mb-6">
            <button onClick={toggleSortModal} className="py-2 px-4 bg-gray-200 dark:bg-gray-600 rounded">
              Sort
            </button>
            {sortModalOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg">
                  <h3 className="text-lg font-bold mb-4">Sort by</h3>
                  <div className="flex flex-col space-y-2">
                    <label>
                      <input type="radio" name="sort" value="price-asc" defaultChecked /> Price: Low to High
                    </label>
                    <label>
                      <input type="radio" name="sort" value="price-desc" /> Price: High to Low
                    </label>
                    <label>
                      <input type="radio" name="sort" value="newest" /> Newest
                    </label>
                    <label>
                      <input type="radio" name="sort" value="popularity" /> Popularity
                    </label>
                  </div>
                  <button onClick={toggleSortModal} className="mt-4 py-2 px-4 bg-blue-600 text-white dark:bg-blue-500 rounded">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Example product cards */}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-700 p-4 rounded shadow">
                <img src="/path/to/image.jpg" alt="Product" className="mb-2" />
                <h4 className="text-lg font-bold">Product Name {index + 1}</h4>
                <p className="text-gray-600 dark:text-gray-300">$19.99</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;













// "use client";
// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { BsChevronDown, BsChevronUp, BsFilter, BsSortDown } from "react-icons/bs";

// const ProductPage: React.FC = () => {
//   const [isSizeOpen, setIsSizeOpen] = useState(false);
//   const [isColorOpen, setIsColorOpen] = useState(false);
//   const [isBrandOpen, setIsBrandOpen] = useState(false);
//   const [isMaterialOpen, setIsMaterialOpen] = useState(false);
//   const [sortModalOpen, setSortModalOpen] = useState(false);
//   const [filterModalOpen, setFilterModalOpen] = useState(false);

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
//   };

//   useEffect(() => {
//     console.log("Checked elements:", selectedFilters);
//   }, [selectedFilters]);

//   return (
//     <div className="container mx-auto p-4 mt-[124px] dark:bg-gray-800 dark:text-white">
//       {/* Mobile and Tablet Layout */}
//       <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
//         <div className="flex flex-col lg:hidden mb-4">
//           {/* Title */}
//           <div className="mb-4">
//             <h2 className="text-2xl font-bold">Products (50)</h2>
//           </div>

//           {/* Buttons */}
//           <div className="flex flex-row space-x-2 mb-4">
//             <button onClick={toggleSortModal} className="py-2 px-4 bg-gray-200 dark:bg-gray-600 rounded flex items-center space-x-2">
//               <BsSortDown className="text-gray-700 dark:text-gray-300" />
//               <span>Sort</span>
//             </button>
//             <button onClick={toggleFilterModal} className="py-2 px-4 bg-gray-200 dark:bg-gray-600 rounded flex items-center space-x-2">
//               <BsFilter className="text-gray-700 dark:text-gray-300" />
//               <span>Filter</span>
//             </button>
//           </div>

//           {/* Breadcrumb */}
//           <div className="mb-4">
//             <nav aria-label="breadcrumb">
//               <ol className="flex space-x-2 text-sm">
//                 <li>
//                   <a href="#" className="text-gray-600 dark:text-gray-300">
//                     Home
//                   </a>
//                 </li>
//                 <li>/</li>
//                 <li>
//                   <a href="#" className="text-gray-600 dark:text-gray-300">
//                     Category
//                   </a>
//                 </li>
//                 <li>/</li>
//                 <li className="text-gray-900 dark:text-gray-100">Product List</li>
//               </ol>
//             </nav>
//           </div>

//           {/* Product Cards */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
//             {Array.from({ length: 5 }).map((_, index) => (
//               <motion.div key={index} className="bg-white dark:bg-gray-700 p-4 rounded shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                 <img src="/path/to/image.jpg" alt="Product" className="mb-2" />
//                 <h4 className="text-lg font-bold">Product Name {index + 1}</h4>
//                 <p className="text-gray-600 dark:text-gray-300">$19.99</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* Desktop Layout */}
//         <div className="flex lg:flex-row lg:space-x-4">
//           {/* Left Column - Filter Menu */}
//           <div className="w-full lg:w-1/4 p-4 bg-white dark:bg-gray-700 rounded shadow">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold">Filter by</h3>
//               <button onClick={clearAllFilters} className="text-sm text-red-600">
//                 Clear All
//               </button>
//             </div>

//             {/* Filter Types */}
//             {[
//               { label: "Size", state: isSizeOpen, setter: setIsSizeOpen, options: ["S", "M", "L", "XL"], category: "size" },
//               { label: "Color", state: isColorOpen, setter: setIsColorOpen, options: ["Red", "Blue", "Green", "Black"], category: "color" },
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
//                         <li key={idx} className={`flex items-center space-x-2 cursor-pointer ${selectedFilters[filter.category].includes(option) ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-300"}`} onClick={() => handleCheckboxChange(filter.category, option)}>
//                           <span>{option}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//                 <hr className="mx-11" />
//               </div>
//             ))}

//             <button className="mt-4 w-full py-2 bg-blue-600 text-white dark:bg-blue-500 rounded">Show Results</button>
//           </div>

//           {/* Right Column - Products and Sort */}
//           <div className="flex-1 flex flex-col">
//             {/* Title and Product Count */}
//             <div className="mb-4">
//               <h2 className="text-2xl font-bold">Products (50)</h2>
//             </div>

//             {/* Sort Button */}
//             <div className="mb-6 lg:hidden flex flex-row space-x-2">
//               <button onClick={toggleSortModal} className="py-2 px-4 bg-gray-200 dark:bg-gray-600 rounded flex items-center space-x-2">
//                 <BsSortDown className="text-gray-700 dark:text-gray-300" />
//                 <span>Sort</span>
//               </button>
//               <button onClick={toggleFilterModal} className="py-2 px-4 bg-gray-200 dark:bg-gray-600 rounded flex items-center space-x-2">
//                 <BsFilter className="text-gray-700 dark:text-gray-300" />
//                 <span>Filter</span>
//               </button>
//             </div>

//             {/* Product Cards */}
//             <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {Array.from({ length: 20 }).map((_, index) => (
//                 <motion.div key={index} className="bg-white dark:bg-gray-700 p-4 rounded shadow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
//                   <img src="/path/to/image.jpg" alt="Product" className="mb-2" />
//                   <h4 className="text-lg font-bold">Product Name {index + 1}</h4>
//                   <p className="text-gray-600 dark:text-gray-300">$19.99</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Filter Modal */}
//       <AnimatePresence>
//         {filterModalOpen && (
//           <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 max-w-sm w-full">
//               <h3 className="text-xl font-bold mb-4">Filter Options</h3>
//               {/* Duplicate filter menu code for modal view */}
//               {[
//                 { label: "Size", options: ["S", "M", "L", "XL"], category: "size" },
//                 { label: "Color", options: ["Red", "Blue", "Green", "Black"], category: "color" },
//                 { label: "Brand", options: ["Brand A", "Brand B", "Brand C"], category: "brand" },
//                 { label: "Material", options: ["Cotton", "Wool", "Polyester"], category: "material" },
//               ].map((filter, index) => (
//                 <div key={index} className="mb-4">
//                   <h4 className="text-lg font-semibold mb-2">{filter.label}</h4>
//                   <ul className="space-y-2">
//                     {filter.options.map((option, idx) => (
//                       <li key={idx} className={`cursor-pointer ${selectedFilters[filter.category].includes(option) ? "text-blue-600 font-semibold" : "text-gray-700 dark:text-gray-300"}`} onClick={() => handleCheckboxChange(filter.category, option)}>
//                         {option}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//               <button onClick={clearAllFilters} className="mt-4 w-full py-2 bg-red-600 text-white dark:bg-red-500 rounded">
//                 Clear All Filters
//               </button>
//               <button onClick={toggleFilterModal} className="absolute top-4 right-4 text-gray-600 dark:text-gray-300">
//                 ×
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Sort Modal */}
//       <AnimatePresence>
//         {sortModalOpen && (
//           <motion.div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//             <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 max-w-sm w-full">
//               <h3 className="text-xl font-bold mb-4">Sort Options</h3>
//               {/* Add sort options here */}
//               {/* Example sort options */}
//               <div className="flex flex-col space-y-4">
//                 <button className="w-full py-2 bg-gray-200 dark:bg-gray-600 rounded">Price: Low to High</button>
//                 <button className="w-full py-2 bg-gray-200 dark:bg-gray-600 rounded">Price: High to Low</button>
//                 <button className="w-full py-2 bg-gray-200 dark:bg-gray-600 rounded">Newest First</button>
//                 <button className="w-full py-2 bg-gray-200 dark:bg-gray-600 rounded">Best Selling</button>
//               </div>
//               <button onClick={toggleSortModal} className="absolute top-4 right-4 text-gray-600 dark:text-gray-300">
//                 ×
//               </button>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ProductPage;
