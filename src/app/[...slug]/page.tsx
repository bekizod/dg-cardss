/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { fetchProductsByCategory } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import React, { useState, useEffect, useRef } from "react";
import { BiChevronUp, BiChevronDown } from "react-icons/bi";
import {
  BsChevronDown,
  BsChevronUp,
  BsSortDown,
  BsFilter,
} from "react-icons/bs";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import MultiRangeSlider from "multi-range-slider-react";
import { useDispatch, useSelector } from "react-redux";
import Custom404 from "../not-found";
import { addFavorite, removeFavorite } from "@/redux/slices/favoriteSlice";
import { notification, Rate } from "antd";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { useAuth } from "@/context/UserContext";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/slices/cartSlice";
import {
  addFavoriteLocally,
  fetchFavoriteProducts,
  removeFavoriteProduct,
  saveFavoriteProduct,
} from "@/redux/slices/favoriteProductsSlice";
import { FaRegComment, FaShoppingCart, FaStar } from "react-icons/fa";
import Loader from "../loading";
export default function ProductsAccordion({
  params,
}: {
  params: { slug: string[] };
}) {
  const { user, token } = useAuth();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [isSizeOpen, setIsSizeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [sortModalOpen, setSortModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const sortModalRef = useRef<HTMLDivElement>(null);
  const filterModalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    favorites,
    loading: favoritesLoading,
    error: favoritesError,
  } = useSelector((state: RootState) => state.favorites);
  const { favoriteProducts, loading, error } = useSelector(
    (state: RootState) => state.favoriteProducts as any
  );
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector(
    (state: RootState) =>
      state.categories as { products: any; loading: boolean; error: string }
  );
  const [thisCategoryId, setThisCategoryId] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);

  const buyerId = user?._id || "guest";

  const [filterOptions, setFilterOptions] = useState({
    sizes: [] as string[],
    colors: [] as string[],
    brands: [] as string[],
    materials: [] as string[],
    prices: [] as number[],
  });

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(40000);

  const [selectedFilters, setSelectedFilters] = useState({
    size: [] as string[],
    color: [] as string[],
    brand: [] as string[],
    material: [] as string[],
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  const slugLength = params.slug.length;

  let parentName = "";
  let parentId = "";
  let subCategoryName = "";
  let subcategoryId = "";

  if (slugLength === 2) {
    parentName = decodeURIComponent(params.slug[0]);
    parentId = decodeURIComponent(params.slug[1]);
  } else if (slugLength === 4) {
    parentName = decodeURIComponent(params.slug[0]);
    parentId = decodeURIComponent(params.slug[1]);
    subCategoryName = decodeURIComponent(params.slug[2]);
    subcategoryId = decodeURIComponent(params.slug[3]);
  } else {
    return (<Custom404 />) as any;
  }

  useEffect(() => {
    if (slugLength === 2 && parentId) {
      dispatch(fetchProductsByCategory(parentId) as any);
      setThisCategoryId(parentId);
    } else if (slugLength === 4 && subcategoryId) {
      dispatch(fetchProductsByCategory(subcategoryId) as any);
      setThisCategoryId(subcategoryId);
    }
  }, [slugLength, parentId, subcategoryId, dispatch]);
  useEffect(() => {
    if (thisCategoryId && user?.favoriteCategories) {
      setIsFavorited(user.favoriteCategories.includes(thisCategoryId));
    }
  }, [thisCategoryId, user?.favoriteCategories]);
  useEffect(() => {
    if (products && products.length > 0) {
      const sizesSet = new Set<string>();
      const colorsSet = new Set<string>();
      const brandsSet = new Set<string>();
      const materialsSet = new Set<string>();
      const pricesSet = new Set<number>();

      products.forEach((product: any) => {
        if (product.additionalInformation?.size) {
          sizesSet.add(product.additionalInformation.size);
        }
        if (product.additionalInformation?.color) {
          colorsSet.add(product.additionalInformation.color);
        }
        if (product.additionalInformation?.brand) {
          brandsSet.add(product.additionalInformation.brand);
        }
        if (product.additionalInformation?.material) {
          materialsSet.add(product.additionalInformation.material);
        }
        if (product.price) {
          pricesSet.add(product.price);
        }
      });

      setFilterOptions({
        sizes: Array.from(sizesSet),
        colors: Array.from(colorsSet),
        brands: Array.from(brandsSet),
        materials: Array.from(materialsSet),
        prices: Array.from(pricesSet),
      });

      // Initialize price range
      const minPrice = Math.min(...pricesSet);
      const maxPrice = Math.max(...pricesSet);
      setMinValue(minPrice);
      setMaxValue(maxPrice);

      // Initialize filtered products
      setFilteredProducts(products);
    }
  }, [products]);

  const toggleFilter = (
    filterSetter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    filterSetter((prev) => !prev);
  };
  const toggleSortModal = () => setSortModalOpen(!sortModalOpen);
  const toggleFilterModal = () => setFilterModalOpen(!filterModalOpen);

  const handleCheckboxChange = (
    category: keyof typeof selectedFilters,
    value: string
  ) => {
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

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  const handleFavoriteToggle = async (productId: string) => {
    const isFavorite = favoriteProducts?.some(
      (product: any) => product._id === productId
    );

    try {
      if (isFavorite) {
        await dispatch(removeFavoriteProduct(productId)).unwrap();
        notification.success({
          message: "Success",
          description: "Product removed from favorites!",
        });
      } else {
        await dispatch(saveFavoriteProduct(productId)).unwrap();
        dispatch(
          addFavoriteLocally({
            _id: productId,
            name: "",
            description: "",
            price: "",
            signedUrls: [],
          })
        );
        notification.success({
          message: "Success",
          description: "Product added to favorites!",
        });
      }
    } catch (error: any) {
      let errorMessage = "Failed to save favorite product.";

      // Check if the error message contains "jwt malformed"
      if (error == "jwt malformed") {
        errorMessage =
          "Authentication error: Please log in to save favorite products.";
      } else {
        errorMessage = "Failed,No internet connection.";
      }

      notification.error({
        message: "Error",
        description: errorMessage,
      });
    }
  };

  const handleAddFavorite = () => {
    // Logic to add or remove favorite
    if (isFavorited) {
      // Logic to remove favorite
      dispatch(removeFavorite(thisCategoryId) as any)
        .unwrap()
        .then(() => {
          notification.success({
            message: "Category removed from favorites",
          });
          setIsFavorited(false);
        })
        .catch((error: any) => {
          notification.error({
            message: error?.message || "Error removing category from favorites",
          });
        });

      // Call API or dispatch action to update favorites
    } else {
      // Logic to add favorite
      dispatch(addFavorite(thisCategoryId) as any)
        .unwrap() // Ensures we handle success or error
        .then(() => {
          notification.success({
            message: "Favorite Added",
          });
          setIsFavorited(true);
        })
        .catch((error: any) => {
          notification.error({
            message:
              "Ooops!!, Make sure about your connection or make sure you have logged in",
          });
        });

      // Call API or dispatch action to update favorites
    }
  };
  // const handleAddFavorite = () => {
  //   if (slugLength === 2 && parentId) {
  //     dispatch(addFavorite(parentId) as any)
  //     .unwrap() // Ensures we handle success or error
  //       .then(() => {
  //         notification.success({
  //           message: "Favorite Added",
  //         });
  //         setIsFavorited(true)
  //       })
  //       .catch(() => {
  //         notification.error({
  //           message: "Error",
  //         });
  //       });
  //   } else if (slugLength === 4 && subcategoryId) {
  //     dispatch(addFavorite(subcategoryId) as any)
  //       .unwrap() // Ensures we handle success or error
  //       .then(() => {
  //         notification.success({
  //           message: "Favorite Added",
  //         });
  //         setIsFavorited(true);
  //       })
  //       .catch(() => {
  //         notification.error({
  //           message: "Error",
  //         });
  //       });
  //   } else {
  //     return (<Custom404 />) as any;
  //   }
  // };

  const clearAllFilters = () => {
    setSelectedFilters({
      size: [],
      color: [],
      brand: [],
      material: [],
    });
    if (filterOptions.prices.length > 0) {
      const minPrice = Math.min(...filterOptions.prices);
      const maxPrice = Math.max(...filterOptions.prices);
      setMinValue(minPrice);
      setMaxValue(maxPrice);
    }
    // Reset filtered products
    setFilteredProducts(products);
  };

  const applyFilters = () => {
    let filtered = products;

    if (selectedFilters.size.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedFilters.size.includes(product.additionalInformation?.size)
      );
    }

    if (selectedFilters.color.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedFilters.color.includes(product.additionalInformation?.color)
      );
    }

    if (selectedFilters.brand.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedFilters.brand.includes(product.additionalInformation?.brand)
      );
    }

    if (selectedFilters.material.length > 0) {
      filtered = filtered.filter((product: any) =>
        selectedFilters.material.includes(
          product.additionalInformation?.material
        )
      );
    }

    // Filter by price range
    filtered = filtered.filter(
      (product: any) => product.price >= minValue && product.price <= maxValue
    );

    setFilteredProducts(filtered);
  };

  // You can re-enable the click outside handler if needed
  // const handleClickOutside = (event: MouseEvent) => {
  //   if (sortModalRef.current && !sortModalRef.current.contains(event.target as Node)) {
  //     setSortModalOpen(false);
  //   }
  //   if (filterModalRef.current && !filterModalRef.current.contains(event.target as Node)) {
  //     setFilterModalOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  if (productsLoading)
    return (
      <div
        role="status"
        className="space-y-8 py-3 px-5 mt-[124px] animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex flex  justify-center"
      >
        <div className="flex items-center justify-center w-full h-72 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
          <svg
            className="w-10 h-10 text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        <div className="  w-1/2 flex flex-col gap-3">
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <div className="flex gap-3">
            <div className="flex items-center justify-center w-1/4 h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="flex items-center justify-center w-1/4  h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="flex items-center justify-center w-1/4  h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
            <div className="flex items-center justify-center w-1/4  h-32 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
              <svg
                className="w-10 h-10 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  if (productsError)
    return (
      <p className="mt-[124px] text-3xl">Product Error: {productsError}</p>
    );

  if (favoritesLoading) return <Loader />;
  if (favoritesError) return <p>Favorite Error: {favoritesError}</p>;

  const handleAddToCart = (product: any) => {
    // Implement the logic to dispatch addToCart action with the product details
    dispatch(
      addToCart({
        id: product._id,
        buyerId: user?._id || "guest",
        image: product.imageIds[0],
        color: product.additionalInformation?.color,
        name: product.name,
        quantity: 1,
        stockQuantity: product.stockQuantity,
        price: product.price,
        unitPrice: product.discount ? product.discount : product.price, // Pass unit price based on discount
        discount: product.discountPercentage || 0,
        link: `/singleProduct/${parentName}/${parentId}/${subCategoryName}/${subcategoryId}/${product.name}/${product._id}`,
        averageRating: product.ratings.averageRating,
        numberOfRating: product.ratings.numberOfRatings,
        brand: product.additionalInformation.brand,
        adjective: product.adjective,
      })
    );
  };
  return (
    <div className=" md:px-20 lg:px-10   p-2 max-lg:mt-[64px] lg:mt-[124px] dark:bg-slate-900 dark:text-white lg:mx-auto">
      {/* Breadcrumb */}
      <div className="flex flex-row justify-between">
        {slugLength === 2 && (
          <div className="mb-4">
            <nav aria-label="breadcrumb">
              <ol className="flex space-x-2 text-sm">
                <li>
                  <Link href={`/`} className="text-gray-600 dark:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href={`/${parentName}/${parentId}`}
                    className="text-blue-500 underline"
                  >
                    {parentName}
                  </Link>
                </li>
              </ol>
            </nav>
          </div>
        )}

        {slugLength === 4 && (
          <div className="mb-4">
            <nav aria-label="breadcrumb">
              <ol className="flex space-x-2 text-sm">
                <li>
                  <Link href={`/`} className="text-gray-600 dark:text-gray-300">
                    Home
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link
                    href={`/${parentName}/${parentId}`}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {parentName}
                  </Link>
                </li>
                <li>/</li>
                <li className="text-gray-900 dark:text-gray-100">
                  {" "}
                  {subCategoryName}
                </li>
              </ol>
            </nav>
          </div>
        )}

        {/* <div className="flex items-center space-x-2 text-lg font-medium text-green-600 dark:text-green-400 cursor-pointer hover:text-green-900 transition-colors duration-200" onClick={handleAddFavorite}>
          {isFavorited ? <GoHeartFill className="text-green-600" /> : <GoHeart />}
          <span>{isFavorited ? "Favorited" : "Favorite this category"}</span>
        </div> */}

        <div
          className="flex items-center space-x-2 text-lg font-medium text-[var(--color-primary)] dark:text-slate-400 cursor-pointer hover:text-slate-500 transition-colors duration-200"
          onClick={() => handleAddFavorite()}
        >
          {isFavorited ? (
            <GoHeartFill className="text-[var(--color-primary)]" />
          ) : (
            <GoHeart />
          )}
          <span>{isFavorited ? "Favorited" : "Favorite this category"}</span>
        </div>
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row-reverse space-y-4 lg:space-y-0">
        {/* Right Column - Products and Sort */}
        <div className="w-full lg:w-3/4">
          {/* Title and Product Count */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold">
              Products{" "}
              <span className="font-serif px-10 text-sm">
                {filteredProducts.length} Products
              </span>
            </h2>
          </div>

          {/* Sort and Filter Buttons for Small Screens */}
          {/* ... (Sort and filter modal code remains the same) */}
          {/* Sort and Filter Buttons for Small Screens */}

          <div className="flex flex-row justify-between space-x-2 mb-4 lg:hidden">
            <button
              onClick={() => toggleSortModal()}
              className="py-2 px-4 w-1/3 bg-gray-200 justify-center place-items-center dark:bg-gray-600 rounded flex items-center space-x-2"
            >
              <BsSortDown className="text-gray-700 dark:text-gray-300" />
              <span>Sort</span>
            </button>
            <button
              onClick={() => toggleFilterModal()}
              className="py-2 px-4 w-1/3 justify-center place-items-center text-center bg-gray-200 dark:bg-gray-600 rounded flex items-center space-x-2"
            >
              <BsFilter className="text-gray-700 dark:text-gray-300" />
              <span>Filter</span>
            </button>
          </div>

          {/* Sort Modal */}
          {sortModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div
                ref={sortModalRef}
                className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg"
              >
                <h3 className="text-lg font-bold mb-4">Sort by</h3>
                <div className="flex flex-col space-y-2">
                  <label>
                    <input
                      type="radio"
                      name="sort"
                      value="price-asc"
                      defaultChecked
                    />{" "}
                    Price: Low to High
                  </label>
                  <label>
                    <input type="radio" name="sort" value="price-desc" /> Price:
                    High to Low
                  </label>
                  <label>
                    <input type="radio" name="sort" value="newest" /> Newest
                  </label>
                  <label>
                    <input type="radio" name="sort" value="popularity" />{" "}
                    Popularity
                  </label>
                </div>
                <button
                  onClick={() => toggleSortModal()}
                  className="mt-4 py-2 px-4 bg-blue-600 text-white dark:bg-blue-500 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Filter Modal for Small Screens */}
          {filterModalOpen && (
            <div className="fixed inset-0 lg:hidden bg-black bg-opacity-50 flex justify-center items-center z-50 h-auto">
              <div
                ref={filterModalRef}
                className="bg-white dark:bg-gray-700 p-6 rounded shadow-lg w-full max-w-lg max-h-full overflow-y-auto scrollbar-hidden"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Filter by</h3>
                  <button
                    onClick={() => clearAllFilters()}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Clear All
                  </button>
                </div>

                {/* Filter Types */}
                {[
                  {
                    label: "Size",
                    state: isSizeOpen,
                    setter: setIsSizeOpen,
                    options: filterOptions.sizes,
                    category: "size",
                  },
                  {
                    label: "Color",
                    state: isColorOpen,
                    setter: setIsColorOpen,
                    options: filterOptions.colors,
                    category: "color",
                  },
                  {
                    label: "Brand",
                    state: isBrandOpen,
                    setter: setIsBrandOpen,
                    options: filterOptions.brands,
                    category: "brand",
                  },
                  {
                    label: "Material",
                    state: isMaterialOpen,
                    setter: setIsMaterialOpen,
                    options: filterOptions.materials,
                    category: "material",
                  },
                ].map((filter, index) => (
                  <div key={index} className="mb-4">
                    <button
                      onClick={() => toggleFilter(filter.setter)}
                      className="flex justify-between items-center w-full text-left"
                    >
                      <span className="text-lg font-medium">
                        {filter.label}
                      </span>
                      {filter.state ? <BsChevronUp /> : <BsChevronDown />}
                    </button>
                    {filter.state && (
                      <div className="mt-2">
                        <ul className="space-y-2">
                          {filter.options.map((option, idx) => (
                            <li
                              key={idx}
                              className={`flex items-center justify-center mx-12 space-x-2 hover:bg-slate-300 dark:hover:bg-slate-500 cursor-pointer ${
                                selectedFilters[
                                  filter.category as keyof typeof selectedFilters
                                ].includes(option)
                                  ? "text-[var(--color-primary)] font-semibold bg-transparent"
                                  : "text-gray-700 dark:text-gray-300"
                              }`}
                              onClick={() =>
                                handleCheckboxChange(
                                  filter.category as
                                    | "size"
                                    | "color"
                                    | "brand"
                                    | "material",
                                  option
                                )
                              }
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
                {/* Price Filter */}
                <div className="mb-4">
                  <button
                    onClick={() => toggleFilter(setIsPriceOpen)}
                    className="flex justify-between items-center w-full text-left"
                  >
                    <span className="text-lg font-medium">Price</span>
                    {isPriceOpen ? <BsChevronUp /> : <BsChevronDown />}
                  </button>
                  {isPriceOpen && (
                    <div className="mt-2">
                      <MultiRangeSlider
                        min={Math.min(...filterOptions.prices)}
                        max={Math.max(...filterOptions.prices)}
                        step={10}
                        minValue={minValue}
                        maxValue={maxValue}
                        onInput={(e) => {
                          setMinValue(e.minValue);
                          setMaxValue(e.maxValue);
                        }}
                      />
                      <div className="flex justify-between mt-2">
                        <span>Min: {minValue}</span>
                        <span>Max: {maxValue}</span>
                      </div>
                    </div>
                  )}
                  <hr className="mx-11" />
                </div>

                <button
                  onClick={() => {
                    applyFilters();
                    toggleFilterModal(); // Close the modal if needed
                  }}
                  className="mt-4 w-full py-2  bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] rounded"
                >
                  Show Results
                </button>
              </div>
            </div>
          )}
          {/* Product Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filteredProducts && filteredProducts.length > 0 ? (
              filteredProducts.map((product: any) => {
                const productId = product?._id;
                const buyerId = user?._id || "guest";
                const productColor =
                  product?.additionalInformation?.color || "default";

                const existingItem = cartItems.find(
                  (item) =>
                    item.id === productId &&
                    item.buyerId === buyerId &&
                    item.color === productColor
                );
                const existingQuantity = existingItem
                  ? existingItem.quantity
                  : 0;
                const isFavorite = favoriteProducts?.some(
                  (favProduct: any) => favProduct._id === productId
                );

                return (
                  <div
                    key={productId}
                    className="flex flex-col max-w-60 bg-white dark:bg-slate-800 dark:text-white shadow-xl gap-1 border dark:border-slate-700 rounded-3xl p-3"
                  >
                    {/* Image and Favorite Button */}
                    <div className="relative">
                      <Link
                        href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}
                        className="block w-full"
                      >
                        <Image
                          src={product.imageIds[0]}
                          alt="product"
                          width={1000}
                          height={1000}
                          className="w-full h-44 rounded-md object-cover"
                        />
                      </Link>

                      {/* Favorite Icon */}
                      <motion.div
                        className="absolute top-2 right-2 rounded-full p-2 bg-slate-200 cursor-pointer dark:bg-slate-600"
                        whileHover={{ scale: 1.2 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        onClick={() => handleFavoriteToggle(productId)}
                      >
                        {isFavorite ? (
                          <GoHeartFill
                            className="text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
                            size={17}
                          />
                        ) : (
                          <GoHeart
                            className="text-[var(--color-primary)]"
                            size={17}
                          />
                        )}
                      </motion.div>
                    </div>

                    {/* Product Details */}
                    <div className="flex w-full flex-col">
                      <div className="text-start text-lg font-semibold flex justify-start">
                        {product.name}
                      </div>
                      <div className="test-sm text-start font-semibold">
                        {product.additionalInformation.brand}
                      </div>
                      <div className="flex flex-row gap-3">
                        <div>
                          <Rate
                            value={product.ratings.averageRating.toFixed(1)}
                            className="text-sm dark:text-yellow-400"
                            disabled
                          />
                        </div>
                        <div className="flex flex-row gap-1 items-center text-sm">
                          <FaRegComment />
                          <div>{product.ratings.numberOfRatings}</div>
                        </div>
                      </div>

                      {/* Pricing and Cart Buttons */}
                      <div className="flex flex-row justify-between items-center mt-4">
                        <div className="flex flex-col">
                          <div className="flex flex-row gap-1 items-center">
                            {product?.discount > 0 && (
                              <>
                                <div className="font-mono line-through">
                                  {product.price - product.discount}
                                </div>
                                <div className="bg-[var(--color-secondary)] dark:bg-blue-900 px-1 rounded font-bold text-xs">
                                  -{Math.round(product.discountPercentage)}%
                                </div>
                              </>
                            )}
                          </div>

                          <div className="font-bold text-2xl">
                            {product?.discount > 0
                              ? `${product.discount}`
                              : `${product.price}`}
                          </div>
                        </div>
                        <div className="rounded-lg">
                          {existingItem ? (
                            <div className="flex flex-row items-center justify-center gap-2">
                              {/* Decrement Button */}
                              <button
                                onClick={() =>
                                  dispatch(
                                    decrementQuantity({
                                      id: existingItem.id,
                                      buyerId: existingItem.buyerId,
                                    })
                                  )
                                }
                                aria-label="Decrease Quantity"
                              >
                                <BiChevronDown
                                  className="text-[var(--color-secondary)] font-bold"
                                  size={30}
                                />
                              </button>

                              {/* Quantity Display */}
                              <div className="dark:text-gray-200">
                                {existingQuantity}
                              </div>

                              {/* Increment Button */}
                              <button
                                onClick={() =>
                                  dispatch(
                                    incrementQuantity({
                                      id: existingItem.id,
                                      buyerId: existingItem.buyerId,
                                    })
                                  )
                                }
                                aria-label="Increase Quantity"
                              >
                                <BiChevronUp
                                  className="text-[var(--color-secondary)] font-bold"
                                  size={30}
                                />
                              </button>
                            </div>
                          ) : (
                            <motion.div
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleAddToCart(product)}
                              className="p-3 bg-[var(--color-primary)] dark:bg-blue-700 rounded-lg cursor-pointer hover:bg-[var(--color-secondary)] dark:hover:bg-blue-800"
                              aria-label="Add to Cart"
                            >
                              <FaShoppingCart color="white" />
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-4 text-lg font-medium text-gray-500 dark:text-gray-300">
                No products found.
              </div>
            )}
          </div>
        </div>

        {/* Left Column - Filter */}
        <div className="p-3 w-full lg:w-1/4 max-w-lg mx-auto my-8 hidden lg:block">
          <div className="bg-white rounded shadow-lg p-5 dark:bg-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Filter by</h3>
              <button
                onClick={() => clearAllFilters()}
                className="text-sm text-red-600 hover:underline"
              >
                Clear All
              </button>
            </div>

            {/* Filter Types */}
            {[
              {
                label: "Size",
                state: isSizeOpen,
                setter: setIsSizeOpen,
                options: filterOptions.sizes,
                category: "size",
              },
              {
                label: "Color",
                state: isColorOpen,
                setter: setIsColorOpen,
                options: filterOptions.colors,
                category: "color",
              },
              {
                label: "Brand",
                state: isBrandOpen,
                setter: setIsBrandOpen,
                options: filterOptions.brands,
                category: "brand",
              },
              {
                label: "Material",
                state: isMaterialOpen,
                setter: setIsMaterialOpen,
                options: filterOptions.materials,
                category: "material",
              },
            ].map((filter, index) => (
              <div key={index} className="mb-4">
                <button
                  onClick={() => toggleFilter(filter.setter)}
                  className="flex justify-between items-center w-full text-left"
                >
                  <span className="text-lg font-medium">{filter.label}</span>
                  {filter.state ? <BsChevronUp /> : <BsChevronDown />}
                </button>
                {filter.state && (
                  <div className="mt-2">
                    <ul className="space-y-2">
                      {filter.options.map((option, idx) => (
                        <li
                          key={idx}
                          className={`flex items-center justify-center mx-12 space-x-2 hover:bg-slate-300 dark:hover:bg-slate-500 cursor-pointer ${
                            selectedFilters[
                              filter.category as keyof typeof selectedFilters
                            ].includes(option)
                              ? "text-[var(--color-primary)] font-semibold bg-transparent"
                              : "text-gray-700 dark:text-gray-300"
                          }`}
                          onClick={() =>
                            handleCheckboxChange(
                              filter.category as
                                | "size"
                                | "color"
                                | "brand"
                                | "material",
                              option
                            )
                          }
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

            {/* Price Filter */}
            <div className="mb-4">
              <button
                onClick={() => toggleFilter(setIsPriceOpen)}
                className="flex justify-between items-center w-full text-left"
              >
                <span className="text-lg font-medium">Price</span>
                {isPriceOpen ? <BsChevronUp /> : <BsChevronDown />}
              </button>
              {isPriceOpen && (
                <div className="mt-2">
                  <MultiRangeSlider
                    min={Math.min(...filterOptions.prices)}
                    max={Math.max(...filterOptions.prices)}
                    step={10}
                    minValue={minValue}
                    maxValue={maxValue}
                    onInput={(e) => {
                      setMinValue(e.minValue);
                      setMaxValue(e.maxValue);
                    }}
                  />
                  <div className="flex justify-between mt-2">
                    <span>Min: {minValue}</span>
                    <span>Max: {maxValue}</span>
                  </div>
                </div>
              )}
              <hr className="mx-11" />
            </div>

            <button
              onClick={() => {
                applyFilters();
                toggleFilterModal(); // Close the modal if needed
              }}
              className="mt-4 w-full py-2  bg-[var(--color-primary)] text-white hover:bg-[var(--color-secondary)] rounded"
            >
              Show Results
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
