/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsCartCheck } from "react-icons/bs";
import React from "react";
import { CloseOutlined } from "@ant-design/icons";
// import ProductCarousel from "@/components/ui/Home UI/ProductCarousel";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/redux/slices/categorySlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { message, notification, Modal, Input, Button, Rate } from "antd";
import "./stars.css";
import Custom404 from "@/app/not-found";
import { addToCart } from "@/redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { useTheme } from "next-themes";
import ImageSlider from "@/components/ui/Sliders";
import { MdRemoveShoppingCart } from "react-icons/md";

interface Product {
  id: string;
  imageIds: string[];
  name: string;
  color: string;
  stockQuantity: number;
  price: number;
  discount: number;
}

interface SingleProductPageProps {
  product: Product;
}

export default function SingleProductPage({
  params,
}: {
  params: { slug: string[] };
}) {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("description");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [purchaseOption, setPurchaseOption] = useState("purchase-now");
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state: RootState) =>
      state.categories as { product: any; loading: boolean; error: string }
  );
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  const [rating, setRating] = useState<number | null>(
    product.ratings?.averageRating || 0
  ); // Set initial rating
  const productIdt = product?._id;
  const buyerId = user?._id || "guest";
  const productColor = product?.additionalInformation?.color || "default"; // Ensure a fallback color
  const [comment, setComment] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [Loading, setLoading] = useState(false);
  const { theme } = useTheme();
  const [selectedSize, setSelectedSize] = useState(
    "" // Default to the first size, or set to an empty string if no sizes
  );
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);

  const handleOpen = () => setIsCommentModalVisible(true);
  const handleClose = () => setIsCommentModalVisible(false);
  // Now use useSelector to get cart items and perform the logic outside of the hook
  const existingItem = useSelector((state: RootState) =>
    state.cart.items.find(
      (item) => item.id === productIdt && item.buyerId === buyerId
    )
  );

  const slugLength = params.slug.length;

  let parentName = "";
  let parentId = "";
  let subCategoryName = "";
  let subcategoryId = "";
  let productName = "";
  let productId = "";
  let generalCategoryName = "";
  let generalCategoryId = "";

  if (slugLength === 4) {
    generalCategoryName = decodeURIComponent(params.slug[0]);
    generalCategoryId = decodeURIComponent(params.slug[1]);
    productName = decodeURIComponent(params.slug[2]);
    productId = decodeURIComponent(params.slug[3]);
  } else if (slugLength === 6) {
    parentName = decodeURIComponent(params.slug[0]);
    parentId = decodeURIComponent(params.slug[1]);
    subCategoryName = decodeURIComponent(params.slug[2]);
    subcategoryId = decodeURIComponent(params.slug[3]);
    productName = decodeURIComponent(params.slug[4]);
    productId = decodeURIComponent(params.slug[5]);
  } else {
    return (<Custom404 />) as any;
  }

  useEffect(() => {
    dispatch(fetchSingleProduct(productId) as any);
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      setSelectedSize(product?.additionalInformation?.size[0]);
    }
  }, [product]);

  useEffect(() => {
    // Ensure the product has images before accessing them
    if (product && product.imageIds && product.imageIds.length > 0) {
      setCurrentIndex(0); // Reset index if new product is loaded
    }
  }, [product]);
  useEffect(() => {
    if (existingItem) {
      // If the item exists, you could perform some action here
      console.log("Item exists in cart:", existingItem);
    }
  }, [existingItem]);

  if (loading)
    return (
      <div className="flex flex-col gap-3    2xl:mt-[124px]  animate-pulse    rtl:space-x-reverse">
        <div
          role="status"
          className="space-y-8   px-4 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse flex md:flex-row flex-col  "
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded dark:bg-gray-700">
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

          <div className="w-full">
            <div className="h-3 bg-gray-200 rounded-sm dark:bg-gray-700 mb-2.5"></div>
            <div className="h-5 bg-gray-200 rounded-sm dark:bg-gray-700 mb-2.5"></div>
            <div className="h-24 bg-gray-200 rounded-sm dark:bg-gray-700 mb-2.5"></div>
          </div>

          <div className="flex items-center justify-center w-full h-64 bg-gray-300 rounded   dark:bg-gray-700">
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

        <div className="h-24 bg-gray-200 rounded-sm dark:bg-gray-700 mb-2.5 mx-4">
          <div className="h-4 bg-gray-300 mt-4 mx-1 rounded-sm dark:bg-gray-500 mb-2.5"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center">
        <div className="font-bold text-2xl text-red-700">{error}</div>
      </div>
    );

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? product.imageIds.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === product.imageIds.length - 1 ? 0 : prevIndex + 1
    );
  };
  const goToSlide = (slideIndex: number) => setCurrentIndex(slideIndex);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleAddToCart = () => {
    // Check if the product is already in the cart for this buyer

    if (existingItem) {
      // If the item already exists, redirect to the cart page
      router.push("/cart");
    } else {
      setIsModalOpen(true);
      // If not, add the item to the cart
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
  const handleRate = async () => {
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        `https://alsaifgallery.onrender.com/api/v1/product/rateProduct/${productId}`,
        { rating, comment: addComment ? comment : "" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        notification.success({
          message: "Rating Submitted",
          description: "Your rating has been submitted successfully!",
          placement: "topRight",
        });
        dispatch(fetchSingleProduct(productId) as any);
      } else {
        notification.error({
          message: "Submission Failed",
          description: "Failed to submit rating.",
          placement: "topRight",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Error",
        description: "Error submitting rating. Please try again.",
        placement: "topRight",
      });
    } finally {
      setLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleRateChange = (value: number) => {
    setRating(value);
    setIsModalVisible(true); // Show the modal on rate selection
  };

  const handleModalOk = () => {
    setLoading(true);
    if (addComment) {
      if (comment.trim() === "") {
        message.error("Please enter a comment.");
        return;
      }
      if (comment.length < 10) {
        message.error("Comment must be at least 10 characters.");
        return;
      }
      if (comment.length > 300) {
        message.error("Comment must not exceed 300 characters.");
        return;
      }
    }

    handleRate();
  };
  const isCommentInvalid =
    addComment &&
    (comment.trim() === "" || comment.length < 10 || comment.length > 300);

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setRating(null); // Reset rating if user cancels
    setComment(""); // Reset comment if user cancels
    setAddComment(false); // Reset add comment option
  };

  return (
    <div className="container mx-auto flex flex-col space-y-8 p-5  max-lg:mt-[34px]    max-w-screen-xl">
      {/* First Section */}
      <section className="flex flex-col lg:flex-row lg:gap-8 space-y-8 lg:space-y-0">
        {/* Image Slider */}
        <div className="relative w-full lg:w-1/2">
          {/* Carousel wrapper */}
          {slugLength === 4 && (
            <div className="mb-4">
              <nav aria-label="breadcrumb">
                <ol className="flex space-x-2 text-sm">
                  <li>
                    <Link
                      href={`/`}
                      className="text-gray-600 dark:text-gray-300"
                    >
                      Home/General
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link
                      href={`/${generalCategoryName}/${generalCategoryId}`}
                      className="text-blue-500 underline"
                    >
                      {generalCategoryName}
                    </Link>
                  </li>
                  <li>/</li>
                  <li>{productName}</li>
                </ol>
              </nav>
            </div>
          )}

          {slugLength === 6 && (
            <div className="mb-4">
              <nav aria-label="breadcrumb">
                <ol className="flex space-x-2 text-sm">
                  <li>
                    <Link
                      href={`/`}
                      className="text-gray-600 dark:text-gray-300"
                    >
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
                    <Link
                      href={`/${parentName}/${parentId}/${subCategoryName}/${subcategoryId}`}
                    >
                      {subCategoryName}
                    </Link>
                    / {productName}
                  </li>
                </ol>
              </nav>
            </div>
          )}
          <div>
            {product.stockQuantity > 0 ? (
              <span className="font-bold">
                {translations.single.totalProductInStock} :{" "}
                {product.stockQuantity}
              </span>
            ) : (
              <span className="text-red-500 font-bold">
                {translations.single.outOfStock}
              </span>
            )}
          </div>

          <ImageSlider
            images={product?.imageIds}
            discount={Math.round(product.discountPercentage)}
          />
        </div>

        {/* Description Section */}
        <div className="lg:w-1/2 w-full space-y-4">
          <motion.h1
            className="text-2xl font-semibold dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {renderValue(product.name, product.translatedName)}
          </motion.h1>
          <motion.div
            className="text-lg flex justify-between items-center font-semibold dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {product?.discount > 0 ? (
              <div className="flex justify-center items-center gap-3">
                {product?.discount > 0 && (
                  <>
                    <p className="line-through text-gray-600 dark:text-gray-400">
                      {product.price}
                    </p>
                  </>
                )}
                <p className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                  {product.discount}
                </p>
              </div>
            ) : (
              <>
                <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                  {product.price}
                </p>
              </>
            )}
            {product?.discount > 0 && (
              <div className="flex items-center text-red-600 dark:text-red-400">
                <p className="text-lg font-bold">
                  -{Math.round(product.discountPercentage)}%
                </p>
                <svg
                  className="ml-2"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.5299 10.87L20.0099 9.35001C19.7499 9.09 19.5399 8.58001 19.5399 8.22001V6.06C19.5399 5.18 18.8199 4.46 17.9399 4.46H15.7899C15.4299 4.46 14.9199 4.25 14.6599 3.99L13.1399 2.47C12.5199 1.85 11.4999 1.85 10.8799 2.47L9.33988 3.99C9.08988 4.25 8.57988 4.46 8.20988 4.46H6.05988C5.17988 4.46 4.45988 5.18 4.45988 6.06V8.21C4.45988 8.57 4.24988 9.08 3.98988 9.34L2.46988 10.86C1.84988 11.48 1.84988 12.5 2.46988 13.12L3.98988 14.64C4.24988 14.9 4.45988 15.41 4.45988 15.77V17.92C4.45988 18.8 5.17988 19.52 6.05988 19.52H8.20988C8.56988 19.52 9.07988 19.73 9.33988 19.99L10.8599 21.51C11.4799 22.13 12.4999 22.13 13.1199 21.51L14.6399 19.99C14.8999 19.73 15.4099 19.52 15.7699 19.52H17.9199C18.7999 19.52 19.5199 18.8 19.5199 17.92V15.77C19.5199 15.41 19.7299 14.9 19.9899 14.64L21.5099 13.12C22.1599 12.51 22.1599 11.49 21.5299 10.87ZM7.99988 9C7.99988 8.45 8.44988 8 8.99988 8C9.54988 8 9.99988 8.45 9.99988 9C9.99988 9.55 9.55988 10 8.99988 10C8.44988 10 7.99988 9.55 7.99988 9ZM9.52988 15.53C9.37988 15.68 9.18988 15.75 8.99988 15.75C8.80988 15.75 8.61988 15.68 8.46988 15.53C8.17988 15.24 8.17988 14.76 8.46988 14.47L14.4699 8.47001C14.7599 8.18001 15.2399 8.18001 15.5299 8.47001C15.8199 8.76 15.8199 9.24 15.5299 9.53L9.52988 15.53ZM14.9999 16C14.4399 16 13.9899 15.55 13.9899 15C13.9899 14.45 14.4399 14 14.9899 14C15.5399 14 15.9899 14.45 15.9899 15C15.9899 15.55 15.5499 16 14.9999 16Z"
                    fill="#FF233F"
                  />
                </svg>
              </div>
            )}
          </motion.div>
          <div className="flex flex-row gap-2 items-center text-slate-400">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
              {/* Rating + customer count */}
              <div className="flex flex-col items-center sm:items-start">
                <Rate
                  value={product?.ratings?.averageRating.toFixed(1)}
                  onChange={handleRateChange}
                  disabled={
                    !user ||
                    product?.ratings?.ratingsByUser?.some(
                      (rater: any) => rater?.userId?._id === user?._id
                    )
                  }
                  // className={`text-base ${
                  //   product?.ratings?.averageRating > 0 ? "" : "rate-empty"
                  // }`}
                />
                <p
                  onClick={handleOpen}
                  className="text-sm text-gray-600 cursor-pointer font-semibold dark:text-gray-300 mt-1"
                >
                  {product.ratings?.numberOfRatings || 0}{" "}
                  {translations.single.customersRateThisProduct}
                </p>
              </div>
              <Modal
                open={isCommentModalVisible}
                onCancel={handleClose}
                footer={null}
                closeIcon={
                  <CloseOutlined
                    style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
                  />
                }
                style={{
                  backgroundColor: theme === "dark" ? "#1f1f1f" : "white",
                  color: theme === "dark" ? "#ffffff" : "black",
                  padding: "0px",
                  borderRadius: 8,
                  maxHeight: "80vh", // Restrict modal height
                  overflow: "hidden", // Prevent outer scroll
                }}
                bodyStyle={{
                  backgroundColor: theme === "dark" ? "#1f1f1f" : "white",
                  padding: "1rem",
                  maxHeight: "65vh", // Content area height
                  overflowY: "auto", // Scroll only the comment area
                }}
              >
                <div className="space-y-4 max-h-[400px] overflow-y-auto">
                  {product?.ratings?.ratingsByUser?.filter(
                    (rater: any) => rater.comment
                  )?.length > 0 ? (
                    product.ratings.ratingsByUser
                      .filter((rater: any) => rater.comment) // ✅ Only include raters with comments
                      .map((rater: any) => (
                        <div
                          key={rater._id}
                          className={`border p-3 rounded-lg shadow-sm ${
                            theme === "dark"
                              ? "bg-[#2b2b2b] text-white"
                              : "bg-white text-black"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <div className="font-semibold">
                              {rater?.userId?.firstName}{" "}
                              {rater?.userId?.lastName}
                            </div>
                            <div className="text-yellow-500">
                              <Rate value={rater.rating} disabled />
                            </div>
                          </div>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-700"
                            }`}
                          >
                            {rater.comment}
                          </p>
                        </div>
                      ))
                  ) : (
                    <p
                      className={`text-sm ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      No comments yet.
                    </p>
                  )}
                </div>
              </Modal>

              <div className="hidden sm:block h-4 w-px bg-gray-300 dark:bg-gray-600" />

              {/* Product Adjective */}
              <motion.p
                className="text-sm text-gray-500 dark:text-gray-400 italic"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
              >
                {renderValue(product.adjective, product.translatedAdjective)}
              </motion.p>
            </div>

            <Modal
              visible={isModalVisible}
              onOk={handleModalOk}
              onCancel={handleModalCancel}
              okText={translations.single.submit}
              cancelText={translations.single.cancel}
              confirmLoading={Loading}
              style={{
                backgroundColor: theme === "dark" ? "#1f1f1f" : "white",
                color: theme === "dark" ? "#ffffff" : "black",
                borderRadius: "8px",
                padding: "0px",
              }}
              okButtonProps={{
                disabled: isCommentInvalid,
                style: {
                  backgroundColor: isCommentInvalid
                    ? "grey"
                    : theme === "dark"
                    ? "#4caf50"
                    : "var(--color-primary)",
                  borderColor: isCommentInvalid
                    ? "grey"
                    : theme === "dark"
                    ? "#4caf50"
                    : "var(--color-secondary)",
                  color: "white",
                  borderRadius: "5px",
                  padding: "8px 16px",
                  marginTop: "10px",
                  fontWeight: "bold",
                  cursor: isCommentInvalid ? "not-allowed" : "pointer",
                },
              }}
              cancelButtonProps={{
                style: {
                  backgroundColor: theme === "dark" ? "#333333" : "white",
                  color: theme === "dark" ? "#ffffff" : "black",
                  borderColor: theme === "dark" ? "#555555" : "lightgrey",
                  borderRadius: "5px",
                  padding: "8px 16px",
                  marginTop: "10px",
                  fontWeight: "bold",
                },
              }}
            >
              <p
                style={{
                  color: theme === "dark" ? "#cccccc" : "black",
                  fontSize: "16px",
                  fontWeight: "500",
                }}
              >
                {translations.single.addCommentPrompt}
              </p>

              {!addComment && (
                <>
                  <Button
                    onClick={() => setAddComment(true)}
                    style={{
                      backgroundColor: theme === "dark" ? "#333333" : "#f5f5f5",
                      color: theme === "dark" ? "#ffffff" : "black",
                      border: "none",
                      marginRight: 8,
                      marginLeft: 8,
                      borderRadius: "5px",
                      padding: "6px 16px",
                      fontWeight: "500",
                    }}
                  >
                    {translations.single.yes}
                  </Button>

                  <Button
                    onClick={() => setAddComment(false)}
                    style={{
                      backgroundColor: theme === "dark" ? "#333333" : "#f5f5f5",
                      color: theme === "dark" ? "#ffffff" : "black",
                      border: "none",
                      borderRadius: "5px",
                      padding: "6px 16px",
                      fontWeight: "500",
                    }}
                  >
                    {translations.single.no}
                  </Button>
                </>
              )}

              {addComment && (
                <div style={{ marginTop: "20px" }}>
                  <Input.TextArea
                    placeholder={translations.single.enterComment}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                    maxLength={300}
                    showCount={{
                      formatter: ({ count, maxLength }) => (
                        <span
                          className={
                            theme === "dark"
                              ? "text-gray-400 py-2"
                              : "text-gray-600 py-2"
                          }
                        >
                          {count}/{maxLength} characters
                        </span>
                      ),
                    }}
                    style={{
                      backgroundColor: theme === "dark" ? "#2b2b2b" : "white",
                      color: theme === "dark" ? "#ffffff" : "black",
                      border:
                        theme === "dark"
                          ? "1px solid #555555"
                          : "1px solid lightgrey",
                      borderRadius: "5px",
                      padding: "8px",
                      fontSize: "14px",
                      opacity: theme === "dark" ? 0.85 : 1,
                    }}
                  />

                  {comment.length > 0 && comment.length < 10 && (
                    <div
                      style={{
                        color: "orange",
                        fontSize: "12px",
                        marginTop: "8px",
                      }}
                    >
                      Comment must be at least 10 characters.
                    </div>
                  )}
                  {comment.length > 300 && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "8px",
                      }}
                    >
                      Comment is too long.
                    </div>
                  )}
                  {comment === "" && (
                    <div
                      style={{
                        color: "red",
                        fontSize: "12px",
                        marginTop: "8px",
                      }}
                    >
                      Comment cannot be empty!
                    </div>
                  )}
                </div>
              )}
            </Modal>
          </div>
          <motion.div
            className="flex gap-3 p-1 rounded-lg shadow-md dark:bg-gray-800 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2">
              <Image
                src="/return.png"
                alt="return icon"
                width="20"
                height="20"
              />
              <p className="text-xs">
                {renderValue(
                  product.additionalInformation?.returnPolicy,
                  product.additionalInformation?.translatedReturnPolicy
                )}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Image src="/delevery.png" alt="90 icon" width="20" height="20" />
              <p className="text-xs">
                {renderValue(
                  product.additionalInformation?.brand,
                  product.additionalInformation?.translatedBrand
                )}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.99212 12.6417C8.82546 12.6417 8.66712 12.575 8.55046 12.4584L6.53379 10.4417C6.29212 10.2 6.29212 9.80002 6.53379 9.55836C6.77546 9.31669 7.17546 9.31669 7.41712 9.55836L8.99212 11.1334L12.5755 7.55002C12.8171 7.30836 13.2171 7.30836 13.4588 7.55002C13.7005 7.79169 13.7005 8.19169 13.4588 8.43336L9.43379 12.4584C9.31712 12.575 9.15879 12.6417 8.99212 12.6417Z"
                  fill="#C9747C"
                />
                <path
                  d="M10.0001 18.9583C9.47507 18.9583 8.95006 18.7833 8.54173 18.4333L7.22506 17.3C7.09173 17.1833 6.7584 17.0666 6.5834 17.0666H5.15006C3.91673 17.0666 2.91673 16.0666 2.91673 14.8333V13.4083C2.91673 13.2333 2.80007 12.9083 2.6834 12.775L1.5584 11.45C0.875065 10.6416 0.875065 9.36663 1.5584 8.55829L2.6834 7.23329C2.80007 7.09996 2.91673 6.77496 2.91673 6.59996V5.16663C2.91673 3.93329 3.91673 2.93329 5.15006 2.93329H6.59173C6.76673 2.93329 7.10007 2.80829 7.2334 2.69996L8.55007 1.56663C9.36673 0.866626 10.6417 0.866626 11.4584 1.56663L12.7751 2.69996C12.9084 2.81663 13.2417 2.93329 13.4167 2.93329H14.8334C16.0667 2.93329 17.0667 3.93329 17.0667 5.16663V6.58329C17.0667 6.75829 17.1917 7.09163 17.3084 7.22496L18.4417 8.54163C19.1417 9.35829 19.1417 10.6333 18.4417 11.45L17.3084 12.7666C17.1917 12.9 17.0667 13.2333 17.0667 13.4083V14.825C17.0667 16.0583 16.0667 17.0583 14.8334 17.0583H13.4167C13.2417 17.0583 12.9084 17.1833 12.7751 17.2916L11.4584 18.425C11.0501 18.7833 10.5251 18.9583 10.0001 18.9583ZM5.15006 4.18329C4.6084 4.18329 4.16673 4.62496 4.16673 5.16663V6.59163C4.16673 7.06663 3.94173 7.67496 3.6334 8.03329L2.5084 9.35829C2.21673 9.69996 2.21673 10.2916 2.5084 10.6333L3.6334 11.9583C3.94173 12.325 4.16673 12.925 4.16673 13.4V14.825C4.16673 15.3666 4.6084 15.8083 5.15006 15.8083H6.59173C7.07506 15.8083 7.6834 16.0333 8.05006 16.35L9.36673 17.4833C9.7084 17.775 10.3084 17.775 10.6501 17.4833L11.9667 16.35C12.3334 16.0416 12.9417 15.8083 13.4251 15.8083H14.8417C15.3834 15.8083 15.8251 15.3666 15.8251 14.825V13.4083C15.8251 12.925 16.0501 12.3166 16.3667 11.95L17.5001 10.6333C17.7917 10.2916 17.7917 9.69163 17.5001 9.34996L16.3667 8.03329C16.0501 7.66663 15.8251 7.05829 15.8251 6.57496V5.16663C15.8251 4.62496 15.3834 4.18329 14.8417 4.18329H13.4251C12.9417 4.18329 12.3334 3.95829 11.9667 3.64163L10.6501 2.50829C10.3084 2.21663 9.7084 2.21663 9.36673 2.50829L8.05006 3.64163C7.6834 3.95829 7.07506 4.18329 6.59173 4.18329H5.15006Z"
                  fill="#C9747C"
                />
              </svg>
              <p className="text-xs">
                {renderValue(
                  product.additionalInformation?.warranty,
                  product.additionalInformation?.translatedWarranty
                )}
              </p>
            </div>
          </motion.div>
          <div
            id="dt-additional-info-content"
            className="w-full flex justify-center"
          >
            <div className="w-full md:w-1/2 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="w-full text-gray-800 rounded-lg  dark:text-gray-200">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {product.additionalInformation?.brand && (
                    <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="py-3 px-4 font-medium">
                        {translations.single.brand}
                      </td>
                      <td className="py-3 px-4">
                        {renderValue(
                          product.additionalInformation.brand,
                          product.additionalInformation.translatedBrand
                        )}
                      </td>
                    </tr>
                  )}
                  {product.additionalInformation?.color && (
                    <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="py-3 px-4 font-medium">
                        {translations.single.color}
                      </td>
                      <td className="py-3 px-4 flex items-center">
                        {Array.isArray(product.additionalInformation.color) ? (
                          <div className="flex flex-wrap gap-2">
                            {product.additionalInformation.color.map(
                              (color: any, index: any) => (
                                <div key={index} className="flex items-center">
                                  <div
                                    className="w-5 h-5 rounded-full mr-1 border border-gray-300 dark:border-gray-600"
                                    style={{ backgroundColor: color }}
                                  />
                                  {index <
                                  product.additionalInformation.color.length - 1
                                    ? `${color}, `
                                    : color}
                                </div>
                              )
                            )}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <div
                              className="w-5 h-5 rounded-full mr-2 border border-gray-300 dark:border-gray-600"
                              style={{
                                backgroundColor:
                                  product.additionalInformation.color,
                              }}
                            />
                            {product.additionalInformation.color}
                          </div>
                        )}
                      </td>
                    </tr>
                  )}
                  {product.additionalInformation?.material && (
                    <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                      <td className="py-3 px-4 font-medium">
                        {translations.single.material}
                      </td>
                      <td className="py-3 px-4">
                        {renderValue(
                          product.additionalInformation.material,
                          product.additionalInformation.translatedMaterial
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* <motion.p
            className="text-gray-700 dark:text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {renderValue(product.description, product.translatedDescription)}
          </motion.p> */}

          <div className=" w-full space-y-4">
            {/* Pricing Information Card */}

            {/* Modal */}
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-80 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.8 }}
                >
                  <Link href="/cart" className="flex items-center space-x-4">
                    <BsCartCheck
                      size={40}
                      className="text-green-500 dark:text-green-400"
                    />

                    <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {translations.single.add_to_cart}
                    </p>
                  </Link>

                  <p className="mt-4 text-gray-600 dark:text-gray-300">
                    {translations.single.productAddedToCart}
                  </p>
                  <div className="mt-6 flex justify-between">
                    <button
                      className="text-xs lg:text-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      onClick={handleCloseModal}
                    >
                      {translations.single.continueShopping}
                    </button>
                    <Link href="/cart">
                      <button className="text-xs lg:text-lg  bg-[var(--color-primary)]   text-white dark:text-gray-200 px-4 py-2 rounded-xl   dark:hover:bg-[var(--color-primary)] transition">
                        {translations.single.completePurchase}
                      </button>
                    </Link>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Payment Methods Card */}
            <motion.div
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg flex items-center space-x-4"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-sm dark:text-gray-300">
                <span>Pay with Madfu </span>
                <span className="font-bold text-teal-500 underline dark:text-teal-400">
                  on 6 installments
                </span>
                <span> with value of installment </span>
                <span className="font-bold text-teal-500 underline dark:text-teal-400">
                  66.67 SAR
                </span>
                <span className="text-xs dark:text-gray-400">
                  (Warning: Maximum value is 2000 SAR)
                </span>
              </div>
              <div>
                <Image
                  src="/madufu.png"
                  alt="Madfu Logo"
                  width={200}
                  height={300}
                  className="rounded-lg"
                />
              </div>
            </motion.div>

            <motion.div
              className="p-6 flex-row bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg relative flex items-center space-x-4 cursor-pointer font-sans text-left text-sm text-black dark:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <p>
                  Or split in 4 payments of{" "}
                  <span className="font-semibold">SAR 100.00</span> - No late
                  fees, Sharia compliant!{" "}
                  <span className="text-blue-500 underline cursor-pointer">
                    {translations.single.learn_more}
                  </span>
                </p>
              </div>
              <div className="w-1/4">
                <Image
                  className="absolute top-6 right-4 h-7"
                  src="data:image/svg+xml,%3csvg width='85' height='28' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3crect width='85' height='28' rx='8' fill='url(%23logo-grad-en__a)'/%3e%3cpath d='M25.599 10.129c-1.232-.46-2.424-.684-3.925-.368-1.171.246-2.113.715-2.731 1.884.272.22.516.429.755.636.392.339.799.688 1.344 1.093.431-.611 1.184-1.3 1.992-1.316.938-.018 1.836.495 1.984 1.246.06.312.1 1.6.1 1.6l-.491.104a.434.434 0 0 1-.302 0l-.078-.03-.063-.024a9.209 9.209 0 0 0-3.162-.612c-.364 0-.728.028-1.087.084-1.104.173-2.417.794-2.394 2.773.009.753.167 1.318.5 1.777a3.142 3.142 0 0 0 2.62 1.33 5.11 5.11 0 0 0 3.438-1.189c.02-.016.25-.214.315-.266l.677-.521v1.962h2.825v-6.86c.002-1.554-.85-2.755-2.317-3.303Zm-.873 6.447c-.604 1.075-1.588 1.682-2.721 1.682h-.144a3.363 3.363 0 0 1-.707-.09c-.847-.221-1.328-.899-1.294-1.81l.017-.4h5.194l-.345.618Zm30.381-6.447c-1.232-.46-2.424-.684-3.923-.368-1.174.246-2.115.715-2.732 1.884.272.22.516.429.755.636.394.339.8.688 1.344 1.093.431-.611 1.186-1.3 1.992-1.316.94-.018 1.836.495 1.984 1.246.06.312.1 1.6.1 1.6l-.49.104a.434.434 0 0 1-.301 0 1.077 1.077 0 0 1-.078-.03l-.065-.024a9.209 9.209 0 0 0-3.162-.612c-.364 0-.727.028-1.087.084-1.104.173-2.417.794-2.394 2.773.009.753.169 1.318.5 1.777a3.142 3.142 0 0 0 2.62 1.33 5.113 5.113 0 0 0 3.44-1.189c.019-.016.249-.214.313-.266l.678-.521v1.962h2.824v-6.86c0-1.554-.85-2.755-2.318-3.303Zm-.873 6.447c-.602 1.075-1.589 1.682-2.72 1.682h-.144a3.35 3.35 0 0 1-.706-.09c-.848-.221-1.33-.899-1.293-1.81l.017-.4h5.193l-.347.618Zm20.172-6.447c-1.232-.46-2.424-.684-3.925-.368-1.171.246-2.113.715-2.73 1.884.27.22.515.429.754.636.392.339.8.688 1.344 1.093.431-.611 1.184-1.3 1.992-1.316.94-.018 1.836.495 1.984 1.246.06.312.1 1.6.1 1.6l-.49.104a.434.434 0 0 1-.301 0 1.114 1.114 0 0 1-.078-.03l-.064-.024a9.209 9.209 0 0 0-3.163-.612c-.364 0-.727.028-1.087.084-1.104.173-2.417.794-2.394 2.773.01.753.167 1.318.5 1.777a3.142 3.142 0 0 0 2.62 1.33 5.113 5.113 0 0 0 3.44-1.189c.019-.016.249-.214.314-.266l.677-.521v1.962h2.824v-6.86c.002-1.554-.85-2.755-2.317-3.303Zm-.873 6.447c-.603 1.075-1.588 1.682-2.72 1.682h-.145a3.363 3.363 0 0 1-.707-.09c-.847-.221-1.328-.899-1.294-1.81l.017-.4h5.192l-.343.618Zm-8.369-6.08c-.914.041-1.566.439-1.997 1.22-.047.086-.352.68-.352.68l-.677-.155v-1.606h-2.732v9.678h2.739v-3.78c0-.322-.022-.655 0-.988.04-.582.283-1.133.687-1.557a2.529 2.529 0 0 1 1.528-.764c.383-.054 1.344-.058 1.45-.06V10.49a10.688 10.688 0 0 0-.646.006Zm-49.737 7.556a5.728 5.728 0 0 1-.72-.057c-.718-.117-1.177-.469-1.372-1.047a2.414 2.414 0 0 1-.144-.754v-4.322l.424-.018c.907-.045 1.869-.11 2.782-.362l-.582-1.974-2.624.388V7h-3.098v2.906H8v1.992h2.093s0 4.11.017 5.158c.002.64.188 1.268.537 1.807.416.63 1.022 1.024 1.907 1.242.953.233 1.92.221 2.94.21h.245v-2.251h-.118l-.194-.012Zm23.721-3.192c0-.977.661-1.748 1.56-1.831 1.084-.102 1.846.437 2.04 1.439.029.176.04.354.036.533V20.3h2.731v-6.546a5.156 5.156 0 0 0-.078-.94c-.227-1.201-.874-1.933-1.965-2.242-1.181-.338-2.314-.087-3.313.681v-.66h-2.724v9.707h2.724v-3.43l.013-.053ZM6.538 16.317H4.562c-.377 0-.75-.002-1.125 0-.45 0-.838-.179-1.062-.542-.125-.21-.177-.448-.177-.693v-1.685h4.338v-1.99H2.198v-1.994h-.263c-.49.01-1.042-.049-1.47.097-.982.33-1.535 1.178-1.537 2.184-.004 1.323-.005 2.645 0 3.968.003.834.295 1.583.862 2.162.517.534 1.157.763 1.88.802l.304.016h3.564v-1.996Zm10.725 1.996v-2.728H12.63v2.728H10.52v-2.728H8.414v2.728H6.306v-6.44c0-.078-.002-.155 0-.233a1.967 1.967 0 0 1 .37-1.068c.434-.573 1.051-.84 1.735-.951.703-.114 1.41-.139 2.115-.128.843.012 1.693.073 2.528.21v2.234h-2.108v-1.016l-.072-.013c-.391-.048-.783-.099-1.176-.137-.299-.027-.6-.017-.899.03-.485.07-.79.352-.8.842-.01.521 0 1.043 0 1.565v.177h2.095v-1.737h2.108v5.575h-2.107Z' fill='%23fff'/%3e%3cdefs%3e%3clinearGradient id='logo-grad-en__a' x1='0' y1='0' x2='85' y2='28' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23BE90F4'/%3e%3cstop offset='1' stop-color='%237881FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                  alt="Tamara Payment"
                  width={40}
                  height={40}
                />
              </div>
            </motion.div>

            <motion.div
              className="p-6 flex-row bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-lg relative flex items-center space-x-4 cursor-pointer font-sans text-left text-sm text-black dark:text-white"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div>
                <p>
                  {translations.single.tamara_payment}
                  <span className="text-blue-500 underline cursor-pointer">
                    {translations.single.learn_more}
                  </span>
                </p>
              </div>
              <div className="w-1/4">
                <Image
                  className="absolute top-6 right-4 h-7"
                  src="data:image/svg+xml,%3csvg width='85' height='28' fill='none' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3crect width='85' height='28' rx='8' fill='url(%23logo-grad-en__a)'/%3e%3cpath d='M25.599 10.129c-1.232-.46-2.424-.684-3.925-.368-1.171.246-2.113.715-2.731 1.884.272.22.516.429.755.636.392.339.799.688 1.344 1.093.431-.611 1.184-1.3 1.992-1.316.938-.018 1.836.495 1.984 1.246.06.312.1 1.6.1 1.6l-.491.104a.434.434 0 0 1-.302 0l-.078-.03-.063-.024a9.209 9.209 0 0 0-3.162-.612c-.364 0-.728.028-1.087.084-1.104.173-2.417.794-2.394 2.773.009.753.167 1.318.5 1.777a3.142 3.142 0 0 0 2.62 1.33 5.11 5.11 0 0 0 3.438-1.189c.02-.016.25-.214.315-.266l.677-.521v1.962h2.825v-6.86c.002-1.554-.85-2.755-2.317-3.303Zm-.873 6.447c-.604 1.075-1.588 1.682-2.721 1.682h-.144a3.363 3.363 0 0 1-.707-.09c-.847-.221-1.328-.899-1.294-1.81l.017-.4h5.194l-.345.618Zm30.381-6.447c-1.232-.46-2.424-.684-3.923-.368-1.174.246-2.115.715-2.732 1.884.272.22.516.429.755.636.394.339.8.688 1.344 1.093.431-.611 1.186-1.3 1.992-1.316.94-.018 1.836.495 1.984 1.246.06.312.1 1.6.1 1.6l-.49.104a.434.434 0 0 1-.301 0 1.077 1.077 0 0 1-.078-.03l-.065-.024a9.209 9.209 0 0 0-3.162-.612c-.364 0-.727.028-1.087.084-1.104.173-2.417.794-2.394 2.773.009.753.169 1.318.5 1.777a3.142 3.142 0 0 0 2.62 1.33 5.113 5.113 0 0 0 3.44-1.189c.019-.016.249-.214.313-.266l.678-.521v1.962h2.824v-6.86c0-1.554-.85-2.755-2.318-3.303Zm-.873 6.447c-.602 1.075-1.589 1.682-2.72 1.682h-.144a3.35 3.35 0 0 1-.706-.09c-.848-.221-1.33-.899-1.293-1.81l.017-.4h5.193l-.347.618Zm20.172-6.447c-1.232-.46-2.424-.684-3.925-.368-1.171.246-2.113.715-2.73 1.884.27.22.515.429.754.636.392.339.8.688 1.344 1.093.431-.611 1.184-1.3 1.992-1.316.94-.018 1.836.495 1.984 1.246.06.312.1 1.6.1 1.6l-.49.104a.434.434 0 0 1-.301 0 1.114 1.114 0 0 1-.078-.03l-.064-.024a9.209 9.209 0 0 0-3.163-.612c-.364 0-.727.028-1.087.084-1.104.173-2.417.794-2.394 2.773.01.753.167 1.318.5 1.777a3.142 3.142 0 0 0 2.62 1.33 5.113 5.113 0 0 0 3.44-1.189c.019-.016.249-.214.314-.266l.677-.521v1.962h2.824v-6.86c.002-1.554-.85-2.755-2.317-3.303Zm-.873 6.447c-.603 1.075-1.588 1.682-2.72 1.682h-.145a3.363 3.363 0 0 1-.707-.09c-.847-.221-1.328-.899-1.294-1.81l.017-.4h5.192l-.343.618Zm-8.369-6.08c-.914.041-1.566.439-1.997 1.22-.047.086-.352.68-.352.68l-.677-.155v-1.606h-2.732v9.678h2.739v-3.78c0-.322-.022-.655 0-.988.04-.582.283-1.133.687-1.557a2.529 2.529 0 0 1 1.528-.764c.383-.054 1.344-.058 1.45-.06V10.49a10.688 10.688 0 0 0-.646.006Zm-49.737 7.556a5.728 5.728 0 0 1-.72-.057c-.718-.117-1.177-.469-1.372-1.047a2.414 2.414 0 0 1-.144-.754v-4.322l.424-.018c.907-.045 1.869-.11 2.782-.362l-.582-1.974-2.624.388V7h-3.098v2.906H8v1.992h2.093s0 4.11.017 5.158c.002.64.188 1.268.537 1.807.416.63 1.022 1.024 1.907 1.242.953.233 1.92.221 2.94.21h.245v-2.251h-.118l-.194-.012Zm23.721-3.192c0-.977.661-1.748 1.56-1.831 1.084-.102 1.846.437 2.04 1.439.029.176.04.354.036.533V20.3h2.731v-6.546a5.156 5.156 0 0 0-.078-.94c-.227-1.201-.874-1.933-1.965-2.242-1.181-.338-2.314-.087-3.313.681v-.66h-2.724v9.707h2.724v-3.43l.013-.053ZM6.538 16.317H4.562c-.377 0-.75-.002-1.125 0-.45 0-.838-.179-1.062-.542-.125-.21-.177-.448-.177-.693v-1.685h4.338v-1.99H2.198v-1.994h-.263c-.49.01-1.042-.049-1.47.097-.982.33-1.535 1.178-1.537 2.184-.004 1.323-.005 2.645 0 3.968.003.834.295 1.583.862 2.162.517.534 1.157.763 1.88.802l.304.016h3.564v-1.996Zm10.725 1.996v-2.728H12.63v2.728H10.52v-2.728H8.414v2.728H6.306v-6.44c0-.078-.002-.155 0-.233a1.967 1.967 0 0 1 .37-1.068c.434-.573 1.051-.84 1.735-.951.703-.114 1.41-.139 2.115-.128.843.012 1.693.073 2.528.21v2.234h-2.108v-1.016l-.072-.013c-.391-.048-.783-.099-1.176-.137-.299-.027-.6-.017-.899.03-.485.07-.79.352-.8.842-.01.521 0 1.043 0 1.565v.177h2.095v-1.737h2.108v5.575h-2.107Z' fill='%23fff'/%3e%3cdefs%3e%3clinearGradient id='logo-grad-en__a' x1='0' y1='0' x2='85' y2='28' gradientUnits='userSpaceOnUse'%3e%3cstop stop-color='%23BE90F4'/%3e%3cstop offset='1' stop-color='%237881FF'/%3e%3c/linearGradient%3e%3c/defs%3e%3c/svg%3e"
                  alt="Tamara Payment"
                  width={40}
                  height={40}
                />
              </div>
            </motion.div>

            {product.stockQuantity > 0 ? (
              <motion.button
                onClick={() => {
                  handleAddToCart();
                }}
                className="mt-4 w-full py-2 px-4  bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white rounded-lg"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.95 }}
              >
                {existingItem
                  ? `${translations.single.product_in_cart}`
                  : `${translations.single.add_to_cart}`}
              </motion.button>
            ) : (
              <div className="font-bold flex justify-center items-center gap-3 text-2xl text-red-500">
                <div>{translations.single.outOfStock}</div>
                <MdRemoveShoppingCart className="text-2xl text-red-500" />
              </div>
            )}
          </div>
        </div>

        {/* Pricing and Payment Methods */}
      </section>

      {/* Second Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:space-x-8 space-y-8 lg:space-y-0">
            <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                {translations.single.description}
              </h3>
              <div id="dt-description-content" className="space-y-2">
                <p className="text-gray-800 dark:text-gray-200">
                  <strong>
                    {renderValue(
                      product.description,
                      product.translatedDescription
                    )}
                  </strong>
                </p>
              </div>
            </div>

            <div className="w-full lg:w-1/2 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                {translations.single.additional_information}
              </h3>
              <div id="dt-additional-info-content">
                <table className="w-full text-gray-800 dark:text-gray-200">
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {product.additionalInformation?.SKU && (
                      <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">SKU</td>
                        <td className="py-3 px-4">
                          {product.additionalInformation.SKU}
                        </td>
                      </tr>
                    )}
                    {product.additionalInformation?.barcode && (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">
                          {translations.single.barcode}
                        </td>
                        <td className="py-3 px-4">
                          {product.additionalInformation.barcode}
                        </td>
                      </tr>
                    )}
                    {product.additionalInformation?.brand && (
                      <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">
                          {translations.single.brand}
                        </td>
                        <td className="py-3 px-4">
                          {renderValue(
                            product.additionalInformation.brand,
                            product.additionalInformation.translatedBrand
                          )}
                        </td>
                      </tr>
                    )}
                    {product.additionalInformation?.color && (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">
                          {translations.single.color}
                        </td>
                        <td className="py-3 px-4 flex items-center">
                          {Array.isArray(
                            product.additionalInformation.color
                          ) ? (
                            <div className="flex flex-wrap gap-2">
                              {product.additionalInformation.color.map(
                                (color: any, index: any) => (
                                  <div
                                    key={index}
                                    className="flex items-center"
                                  >
                                    <div
                                      className="w-5 h-5 rounded-full mr-1 border border-gray-300 dark:border-gray-600"
                                      style={{ backgroundColor: color }}
                                    />
                                    {index <
                                    product.additionalInformation.color.length -
                                      1
                                      ? `${color}, `
                                      : color}
                                  </div>
                                )
                              )}
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div
                                className="w-5 h-5 rounded-full mr-2 border border-gray-300 dark:border-gray-600"
                                style={{
                                  backgroundColor:
                                    product.additionalInformation.color,
                                }}
                              />
                              {product.additionalInformation.color}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                    {product.additionalInformation?.material && (
                      <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">
                          {translations.single.material}
                        </td>
                        <td className="py-3 px-4">
                          {renderValue(
                            product.additionalInformation.material,
                            product.additionalInformation.translatedMaterial
                          )}
                        </td>
                      </tr>
                    )}
                    {product.additionalInformation?.size?.length > 0 && (
                      <tr className="hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">
                          {translations.single.size}
                        </td>
                        <td className="py-3 px-4">
                          {product.additionalInformation.size.join(", ")}
                        </td>
                      </tr>
                    )}
                    {product.additionalInformation?.warranty && (
                      <tr className="bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <td className="py-3 px-4 font-medium">
                          {translations.single.warranty}
                        </td>
                        <td className="py-3 px-4">
                          {renderValue(
                            product.additionalInformation.warranty,
                            product.additionalInformation.translatedWarranty
                          )}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Submit
// Submit Rating
// Submit
// Cancel
// Enter your comment
// Tax included
// Out Of Stock
// Product added successfully to cart
// Continue Shopping
// Complete Purchase
// Barcode
// Brand
// Color
// Material
// Size
// warranty
// Customers Rate This
//  product
// total product in stock

// {
//   "content": {
//     "description": {
//       "en": "Description",
//       "ar": "الوصف"
//     },
//     "additional_information": {
//       "en": "Additional Information",
//       "ar": "معلومات إضافية"
//     },
//     "ratings": {
//       "en": "Ratings",
//       "ar": "التقييمات"
//     },
//     "madfu_installments": {
//       "en": "Pay with Madfu on 6 installments with a value of 66.67 SAR per installment (Warning: Maximum value is 2000 SAR)",
//       "ar": "ادفع مع مدفو على 6 أقساط بقيمة 66.67 ريال سعودي لكل قسط (تحذير: الحد الأقصى للقيمة هو 2000 ريال سعودي)"
//     },
//     "split_payment": {
//       "en": "Or split in 4 payments of SAR 100.00 - No late fees, Sharia compliant!",
//       "ar": "أو قسّم على 4 دفعات بقيمة 100.00 ريال سعودي - بدون رسوم تأخير، متوافق مع الشريعة!"
//     },
//     "learn_more": {
//       "en": "Learn more",
//       "ar": "تعرف على المزيد"
//     },
//     "tamara_payment": {
//       "en": "4 interest-free payments of SAR 100.00. No fees. Shariah-compliant.",
//       "ar": "4 دفعات بدون فوائد بقيمة 100.00 ريال سعودي. بدون رسوم. متوافق مع الشريعة."
//     },
//     "purchase_now": {
//       "en": "Purchase now",
//       "ar": "اشتر الآن"
//     },
//     "choose_your_size": {
//       "en": "Choose Your Size",
//       "ar": "اختر مقاسك"
//     },
//     "product_in_cart": {
//       "en": "Product in Cart, Go to Cart",
//       "ar": "المنتج في السلة، انتقل إلى السلة"
//     },
//     "add_to_cart": {
//       "en": "Add To Cart",
//       "ar": "أضف إلى السلة"
//     }
//   }
// }
