"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TfiAlignLeft } from "react-icons/tfi";
import {
  FaRegComment,
  FaRegUser,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdOutlineShoppingCart, MdFavoriteBorder } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchParentCategories,
  fetchSubCategories,
} from "@/redux/slices/categorySlice";
import { SearchProducts } from "@/redux/slices/searchSlice";
import { useRouter } from "next/navigation";
import { notification, Badge, Rate } from "antd";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/slices/cartSlice";
import Cookies from "js-cookie";
import {
  addFavoriteLocally,
  fetchFavoriteProducts,
  removeFavoriteProduct,
  saveFavoriteProduct,
} from "@/redux/slices/favoriteProductsSlice";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import enTranslations from "@/locales/en.json";
import arTranslations from "@/locales/ar.json";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import Spinner from "./Spinner";
import Loader from "@/app/loading";

export default function TopNextNavbar({
  logoUrl,
  onLanguageToggle,
}: {
  logoUrl: string;
  onLanguageToggle: any;
}) {
  const router = useRouter();
  const [parentName, setParentName] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("");
  const { user, logout } = useAuth(); // Get user and logout function from context

  const dispatch = useDispatch<AppDispatch>();
  const { parentCategories, subCategories, loading, error } = useSelector(
    (state: RootState) =>
      state.categories as {
        parentCategories: any[];
        subCategories: any[];
        loading: boolean;
        error: string;
      }
  );
  const { products, pages, total, status } = useSelector(
    (state: RootState) => state.searchProducts as any
  );
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { totalItems } = useSelector((state: RootState) => state.cart);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [issearchModalOpen, setSearchIsModalOpen] = useState(false);
  const token = Cookies.get("token");
  const [filteredCartItems, setFilteredCartItems] = useState<any>(null);
  const { favoriteProducts } = useSelector(
    (state: RootState) => state.favoriteProducts as any
  );

  useEffect(() => {
    // Filter cart items based on buyerId (either user._id or 'guest')
    if (token && user) {
      // If user is logged in, filter by user's ID
      const userCartItems = cartItems.filter(
        (item) => item.buyerId === user?._id
      );
      setFilteredCartItems(userCartItems);
    } else {
      // If guest, filter by 'guest' ID
      const guestCartItems = cartItems.filter(
        (item) => item.buyerId === "guest"
      );
      setFilteredCartItems(guestCartItems);
    }
  }, [cartItems, user, token]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (searchTerm) {
        const queryParams = [
          `page=`,
          `size=100`,
          searchTerm ? `q=${searchTerm}` : "q=", // Only add 'q' if searchTerm is not empty
          `color=`,
          `productSize=`,
          `brand=`,
          `material=`,
          `minPrice=`,
          `maxPrice=`,
          `category=`,
          `hasDiscount=`,
        ]
          .filter(Boolean)
          .join("&"); // Filter out any null values before joining

        try {
          // Dispatch the action
          await dispatch(SearchProducts(queryParams)).unwrap(); // Using unwrap() to handle resolved promise
        } catch (err: any) {
          // Error notification
          notification.error({
            message: "Search Failed",
            description:
              err?.message || "Failed to fetch products. Please try again.",
          });
        }
      }
    };

    fetchProducts(); // Call the async function inside the useEffect
  }, [dispatch, searchTerm]);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchIsModalOpen(true); // Open the modal when the search is submitted
  };

  const searchcloseModal = () => {
    setSearchIsModalOpen(false); // Close the modal when done
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
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

  const handleAddToCart = (product: any) => {
    // Implement the logic to dispatch addToCart action with the product details

    dispatch(
      addToCart({
        id: product._id,
        buyerId: user?._id || "guest",
        image: product.imageIds[0],
        color: product.additionalInformation?.color[0],
        name: product.name,
        quantity: 1,
        stockQuantity: product.stockQuantity,
        price: product.price,
        unitPrice: product.discount ? product.discount : product.price, // Pass unit price based on discount
        discount: product.discountPercentage || 0,
        link: `/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`,
        averageRating: product.ratings.averageRating,
        numberOfRating: product.ratings.numberOfRatings,
        brand: product.additionalInformation.brand,
        adjective: product.adjective,
        size: product.additionalInformation.size,
      })
    );
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
        errorMessage = (
          <span>
            You Are Not Logged: Please{" "}
            <Link
              href="/login"
              className="text-primary text-md hover:text-secondary underline font-semibold"
            >
              login
            </Link>{" "}
            to save favorite products.
          </span>
        ) as any;
      } else {
        errorMessage = "Failed,No internet connection.";
      }

      notification.error({
        message: "Error",
        description: errorMessage,
      });
    }
  };

  const renderValue = (
    defaultValue: string,
    translatedValue: string | undefined
  ) => {
    return currentLocale === "ar" && translatedValue
      ? translatedValue
      : defaultValue;
  };

  return (
    <div className="flex flex-row justify-between items-center px-6 py-3 md:px-12 md:py-3 bg-white dark:bg-slate-950">
      {/* Language Toggle */}
      {/* <button onClick={onLanguageToggle} className="text-green-500">
        {t("toggle_language")}
      </button> */}

      {/* Rest of the Navbar */}
      {/* For Large Devices: Logo, Search, User/Cart */}
      <div className="hidden lg:flex gap-16 items-center w-full">
        {/* Logo Section */}
        <div className="flex gap-4 items-center">
          <div
            className="text-3xl p-2 rounded bg-[var(--color-secondary)] cursor-pointer"
            onClick={handleModalToggle}
          >
            <TfiAlignLeft className="text-[var(--color-primary)]" />
          </div>
          <Link href="/">
            <Image
              src={logoUrl}
              width={1000}
              height={1000}
              alt="logo"
              loading="lazy"
              className="h-16 object-cover w-[11rem]"
            />
          </Link>
        </div>

        {/* Search Bar Section */}
        <div className="flex-1 mx-1">
          <div className="relative flex items-center">
            <AiOutlineSearch className="text-[var(--color-primary)] absolute left-3" />

            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // Prevent form submission and page reload
                  setSearchIsModalOpen(true); // Open the modal when "Enter" is pressed
                }
              }}
              type="text"
              placeholder={translations.tnn.what_are_you_looking_for}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[var(--color-secondary)]   dark:bg-slate-800"
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            // Show user name and logout option if token exists
            <>
              <div className="flex items-center gap-2 text-sm cursor-pointer">
                <Link
                  href="/account"
                  className="flex items-center flex-row gap-2"
                >
                  <FaRegUser className="text-[var(--color-primary)]" />
                  <span className=" ">{user.firstName} </span>
                </Link>
              </div>
              <div className="hidden md:block">|</div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm cursor-pointer"
              >
                <FaSignOutAlt className="text-red-500" />
                <span className="hidden md:inline">
                  {translations.tnn.logout}
                </span>
              </button>
            </>
          ) : (
            // If no user, show login link
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm cursor-pointer"
            >
              <FaRegUser className="text-[var(--color-primary)]" />
              <span className="hidden md:inline">
                {translations.tnn.account_login}
              </span>
            </Link>
          )}
          <div className="hidden md:block">|</div>
          <Link
            href="/cart"
            className="flex items-center gap-2 text-sm cursor-pointer"
          >
            <Badge count={filteredCartItems?.length} offset={[3, -7]}>
              <MdOutlineShoppingCart className="text-[var(--color-primary)]" />
            </Badge>
            <div className="hidden md:inline"> {translations.tnn.cart}</div>
          </Link>
        </div>
      </div>

      {/* For Small/Medium Devices: Logo, Search, Favorite */}
      <div className="lg:hidden flex w-full justify-between items-center -mt-2">
        {/* Logo Section */}
        <Link href={"/"} className="relative  ">
          <Image
            src={logoUrl}
            width={1000}
            height={1000}
            alt="logo"
            loading="lazy"
            className="h-11 object-cover w-[4rem]"
          />
        </Link>

        <div className="flex-1 mx-3">
          <div className="relative   w-full items-center">
            <AiOutlineSearch className="absolute top-4 left-3 text-gray-500" />
            <form
              onSubmit={(e) => {
                e.preventDefault(); // Prevent form submission
                setSearchIsModalOpen(true); // Open the modal when the form is submitted
              }}
            >
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder={translations.tnn.what_are_you_looking_for}
                className="w-full pl-10 pr-4 py-3 rounded-lg text-sm placeholder:text-black dark:placeholder:text-white bg-[var(--color-secondary)] dark:bg-slate-800"
              />
            </form>
          </div>
        </div>
        <div>
          <ThemeSwitcher />
        </div>
        {/* Favorite Icon Section */}
        <Link href={"/account/favorites"} className="flex items-center">
          <MdFavoriteBorder className="text-[var(--color-primary)] text-2xl cursor-pointer" />
        </Link>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackgroundClick}
          >
            <motion.div
              className="flex w-full h-[90vh] max-w-screen-lg bg-white dark:bg-slate-900 rounded-lg overflow-hidden relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                className={`absolute top-4  ${
                  currentLocale === "ar" ? "left-4" : "right-4"
                } text-2xl text-gray-600 dark:text-gray-300`}
                onClick={handleModalToggle}
              >
                &times;
              </button>

              {/* Modal Content */}
              <div className="flex w-full h-full">
                {/* Tabs Section (Parent Categories) */}
                <div className="w-1/4 bg-gray-100 dark:bg-slate-800 flex flex-col border-r  gap-10 py-3 border-gray-300 dark:border-slate-600">
                  <>
                    {parentCategories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() =>
                          handleTabClick(category._id, category.categoryName)
                        }
                        className={`flex items-center gap-2 px-4 py-2 text-left ${
                          activeTab === category._id
                            ? "bg-gray-300 dark:bg-slate-700 text-[var(--color-primary)]"
                            : "hover:bg-gray-200 dark:hover:bg-slate-600"
                        }`}
                      >
                        <Image
                          src={category.categoryLogo?.data}
                          alt={category.categoryName}
                          width={30}
                          height={30}
                          className="text-green-500"
                        />
                        {renderValue(
                          category.categoryName,
                          category.translatedCategoryName
                        )}
                      </button>
                    ))}
                  </>

                  {error && <p className="text-red-500">{error}</p>}
                </div>

                {/* Cards Section (Subcategories) */}
                <div className="w-3/4 p-6 overflow-y-auto h-full">
                  {loading ? (
                    <div
                      role="status"
                      className="space-y-8 py-3  animate-pulse   rtl:space-x-reverse flex   flex-col px-6 "
                    >
                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center  w-full    h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center  w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center  w-full    h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center  w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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

                      <div className="flex flex-row gap-5">
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center  w-full    h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center  w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                        <div className="flex items-center justify-center   w-full  h-44 bg-gray-300 rounded dark:bg-gray-700">
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
                  ) : subCategories?.length > 0 ? (
                    <motion.div
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {subCategories.map((subCategory) => (
                        <Link
                          onClick={() => setIsModalOpen(false)}
                          href={`/${parentName}/${subCategory.parentCategory}/${subCategory.categoryName}/${subCategory._id}`}
                          passHref
                          key={subCategory._id}
                          className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-xl dark:hover:shadow-slate-950"
                        >
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={subCategory.categoryLogo?.data}
                              alt={subCategory.categoryName}
                              width={150}
                              height={150}
                              className="w-full object-contain mb-4 rounded-md"
                            />
                            <p className="hover:text-[var(--color-primary)]">
                              {renderValue(
                                subCategory.categoryName,
                                subCategory.translatedCategoryName
                              )}
                            </p>
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

      <AnimatePresence>
        {issearchModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center z-[10000000000] "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gray-200 dark:bg-slate-900 md:p-6 p-1 rounded-lg shadow-lg  relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <button
                onClick={searchcloseModal}
                className={` absolute top-3   ${
                  currentLocale === "ar" ? "left-3" : "right-3"
                } text-red-500 hover:text-red-700`}
              >
                &#10005; {/* X icon to close */}
              </button>

              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                  {translations.tnn.search_results}
                </h2>

                {status === "succeeded" && (
                  <p className="text-lg text-gray-600">
                    {translations.tnn.total_products}:{" "}
                    <span className="font-medium">{total}</span>
                  </p>
                )}
              </div>

              {status === "loading" && (
                <div className="product-list max-h-96 overflow-y-auto flex items-center justify-center ">
                  <Loader />
                </div>
              )}
              {status === "failed" && <p>Error fetching products: {error}</p>}

              {status === "succeeded" && (
                <div className="product-list max-h-96 overflow-y-auto">
                  {" "}
                  {/* Set max height and enable scrolling */}
                  {products.length > 0 ? (
                    <div className="grid grid-cols-2 p-2  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-6 gap-1">
                      {/* {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                  >
                    {product.imageIds.length > 0 && (
                      <img
                        src={product.imageIds[0]} // Assuming the first image ID is used
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h4 className="font-bold text-lg">{product.name}</h4>
                      <p className="text-gray-500">{product.adjective}</p>
                      <p className="text-gray-700 dark:text-gray-300 font-semibold mt-2">
                        Price: {product.price}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        Brand: {product.additionalInformation.brand}
                      </p>
                    </div>
                  </div>
                ))} */}
                      {/* href={`/singleProduct/${product.category.parentCategory.categoryName}/${product.category.parentCategory._id}/${product.category.categoryName}/${product.category._id}/${product.name}/${product._id}`} */}
                      {products.map((product: any, index: any) => {
                        const productIdt = product?._id as any;
                        const buyerId = user?._id || "guest";
                        const productColor =
                          product?.additionalInformation?.color || "default";
                        // Check if the product is already in the cart
                        const existingItem = cartItems.find(
                          (item) =>
                            item.id === productIdt && item.buyerId === buyerId
                        );
                        const existingQuantity = existingItem
                          ? existingItem.quantity
                          : 0;
                        const BuyerId = existingItem
                          ? existingItem.buyerId
                          : "guest";
                        const ID = existingItem ? existingItem.id : "";
                        const isFavorite = favoriteProducts?.some(
                          (favProduct: any) => favProduct._id === productIdt
                        );
                        return (
                          <motion.div
                            key={productIdt}
                            className="flex flex-col transform -translate-x-2 duration-200 max-md:scale-75 max-md:-my-10 max-md:-mx-5 w-60 h-[350px] bg-white dark:bg-slate-800 dark:text-white shadow-xl gap-1 border dark:border-slate-700 rounded-3xl p-3"
                          >
                            {" "}
                            <Link
                              onClick={searchcloseModal}
                              href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}
                              className="block w-full"
                            >
                              {/* <div className="flex font-thin justify-end">id: 12345789</div> */}
                              <div className="relative">
                                <Image
                                  src={product.imageIds[0]}
                                  alt="product"
                                  width={1000}
                                  height={1000}
                                  className="w-full h-44 rounded-md object-cover"
                                />

                                {/* Favorite Icon */}
                                <motion.div
                                  className="absolute top-2 right-2 rounded-full p-2 bg-slate-200 cursor-pointer dark:bg-slate-600"
                                  whileHover={{ scale: 1.2 }}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: 0.1 }}
                                  onClick={(e) => {
                                    handleFavoriteToggle(productIdt);
                                    e.stopPropagation();
                                    e.preventDefault();
                                  }}
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

                              <div className="flex w-full flex-col">
                                <div className="text-start text-lg font-semibold flex justify-start">
                                  {renderValue(
                                    product.name?.length > 20
                                      ? `${product.name.substring(0, 20)}...`
                                      : product.name,
                                    product.translatedName?.length > 20
                                      ? `${product.translatedName.substring(
                                          0,
                                          20
                                        )}...`
                                      : product.translatedName
                                  )}
                                </div>
                                <div className="text-sm text-start font-semibold">
                                  {renderValue(
                                    product.additionalInformation?.brand
                                      ?.length > 20
                                      ? `${product.additionalInformation.brand.substring(
                                          0,
                                          20
                                        )}...`
                                      : product.additionalInformation?.brand,
                                    product.additionalInformation
                                      ?.translatedBrand?.length > 20
                                      ? `${product.additionalInformation.translatedBrand.substring(
                                          0,
                                          20
                                        )}...`
                                      : product.additionalInformation
                                          ?.translatedBrand
                                  )}
                                </div>
                                <div className="flex flex-row gap-3">
                                  <div>
                                    <Rate
                                      value={product.ratings.averageRating.toFixed(
                                        1
                                      )}
                                      className={`text-sm ${
                                        product.ratings.averageRating > 0
                                          ? ""
                                          : "rate-empty"
                                      }`}
                                      disabled
                                    />
                                  </div>
                                  <div className="flex flex-row gap-1 items-center text-sm">
                                    <div>
                                      <FaRegComment />
                                    </div>
                                    <div>{product.ratings.numberOfRatings}</div>
                                  </div>
                                </div>

                                <div className="flex flex-row justify-between items-center mt-4">
                                  <div className="flex flex-col">
                                    <div className="flex flex-row gap-1 items-center">
                                      {product?.discount > 0 && (
                                        <>
                                          <div className="font-mono line-through">
                                            {product.price}
                                          </div>
                                          <div className="bg-[var(--color-secondary)] text-gray-200  px-1 rounded font-bold text-xs">
                                            -
                                            {Math.round(
                                              product.discountPercentage
                                            )}
                                            %
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
                                  <div
                                    className="rounded-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      e.preventDefault();
                                    }}
                                  >
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
                                          className=""
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
                                          className=" "
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
                                        className="p-3 bg-[var(--color-primary)]   rounded-lg cursor-pointer hover:bg-[var(--color-secondary)]  "
                                        aria-label="Add to Cart"
                                      >
                                        <FaShoppingCart color="white" />
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>
                      No products found for the search term: &apos;{searchTerm}
                      &apos;
                    </p>
                  )}
                </div>
              )}
              <div className="text-2xl font-semibold mb-4">
                {pages > 1 ? <>Pages: {pages}</> : ""}{" "}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
