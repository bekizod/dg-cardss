import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { SearchProducts } from "@/redux/slices/searchSlice";
import { notification, Rate } from "antd";
import { useAuth } from "@/context/UserContext";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/slices/cartSlice";
import React from "react";
import {
  addFavoriteLocally,
  fetchFavoriteProducts,
  removeFavoriteProduct,
  saveFavoriteProduct,
} from "@/redux/slices/favoriteProductsSlice";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment, FaShoppingCart } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios";

const BestProducts = () => {
  // Get user and logout function from context
  const dispatch = useDispatch<AppDispatch>();
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items as any);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const { favoriteProducts, error } = useSelector(
    (state: RootState) => state.favoriteProducts as any
  );
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const fetchHighlyOrderedProducts = async () => {
      try {
        const response = await axios.get(
          "https://alsaifgallery.onrender.com/api/v1/order/highlyOrderedProducts"
        );
        if (response.data?.status) {
          setProducts(response.data.mostSoldProducts);
        } else {
          notification.error({
            message: "Error",
            description: response.data?.message || "Failed to load products.",
          });
        }
      } catch (error: any) {
        notification.error({
          message: "Error",
          description: error?.message || "Failed to fetch products.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHighlyOrderedProducts();
  }, [user?.token]);

  const handleAddToCart = (product: any, link: any) => {
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
        link: link,
        averageRating: product.ratings.averageRating,
        numberOfRating: product.ratings.numberOfRatings,
        brand: product.additionalInformation.brand,
        adjective: product.adjective,
        size: product.additionalInformation.size,
      })
    );
  };
  const handleNavigation = (direction: number) => {
    const isRTL = currentLocale === "ar"; // Check if the current locale is Arabic
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < products.length && carouselRef.current) {
      setCurrentIndex(newIndex);

      // Adjust scroll direction based on layout
      const scrollOffset = carouselRef.current.clientWidth * direction;
      carouselRef.current.scrollBy({
        left: isRTL ? -scrollOffset : scrollOffset, // Reverse scroll direction for RTL
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log(JSON.stringify(products, null, 2));
  }, [products]);

  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Favorite Products:", favoriteProducts);
  }, [favoriteProducts]);

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
            Authentication error: Please{" "}
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
    <div className="relative ">
      {!loading && (
        <div className="font-bold text-xl">
          {translations.bestSellingProducts.top_selling_products}
        </div>
      )}

      <div
        ref={carouselRef}
        className="flex gap-2 overflow-x-auto scroll-smooth select-none scrollbar-hide"
      >
        <motion.div
          className="flex gap-2 py-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {products.map((product: any, index: any) => {
            const productIdt = product?.productDetails?._id as any;
            const buyerId = user?._id || "guest";
            const productColor =
              product?.productDetails?.additionalInformation?.color ||
              "default";
            // Check if the product is already in the cart
            const existingItem = cartItems.find(
              (item: any) => item.id === productIdt && item.buyerId === buyerId
            );
            const existingQuantity = existingItem ? existingItem.quantity : 0;
            const BuyerId = existingItem ? existingItem.buyerId : "guest";
            const ID = existingItem ? existingItem.id : "";
            const isFavorite = favoriteProducts?.some(
              (favProduct: any) => favProduct._id === productIdt
            );

            return (
              <motion.div
                key={productIdt}
                className="flex flex-col transform hover:-translate-y-1 duration-200 max-md:scale-75 max-md:-my-10 max-md:-mx-5 w-60 h-[350px] bg-white dark:bg-slate-800 dark:text-white shadow-xl gap-1 border dark:border-slate-700 rounded-3xl p-3"
              >
                <Link
                  href={`/singleProduct/${product?.parentCategoryDetails?.categoryName}/${product?.parentCategoryDetails?._id}/${product?.categoryDetails?.categoryName}/${product?.categoryDetails?._id}/${product?.productDetails?.name}/${product?.productDetails?._id}`}
                  className="block w-full"
                >
                  <div className="relative">
                    <Image
                      src={product.productDetails?.imageIds[0]}
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
                        e.stopPropagation();
                        e.preventDefault();
                        handleFavoriteToggle(productIdt);
                      }}
                    >
                      {isFavorite ? (
                        <GoHeartFill
                          className="text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
                          size={17}
                        />
                      ) : (
                        <GoHeart
                          className="text-[var(--color-primary)] dark:text-[var(--color-secondary)]"
                          size={17}
                        />
                      )}
                    </motion.div>
                  </div>

                  <div className="flex w-full flex-col flex-grow">
                    <div className="text-start text-lg font-semibold flex justify-start">
                      {renderValue(
                        product.productDetails?.name?.length > 20
                          ? `${product.productDetails?.name?.substring(
                              0,
                              20
                            )}...`
                          : product.productDetails?.name,
                        product.productDetails?.translatedName?.length > 20
                          ? `${product.productDetails?.translatedName?.substring(
                              0,
                              20
                            )}...`
                          : product.productDetails?.translatedName
                      )}
                    </div>
                    <div className="text-sm text-start font-semibold">
                      {renderValue(
                        product.productDetails?.additionalInformation?.brand
                          ?.length > 20
                          ? `${product.productDetails?.additionalInformation?.brand?.substring(
                              0,
                              20
                            )}...`
                          : product.productDetails?.additionalInformation
                              ?.brand,
                        product.productDetails?.additionalInformation
                          ?.translatedBrand?.length > 20
                          ? `${product.productDetails?.additionalInformation?.translatedBrand?.substring(
                              0,
                              20
                            )}...`
                          : product.productDetails?.additionalInformation
                              ?.translatedBrand
                      )}
                    </div>
                    <div className="flex flex-row gap-3 mt-1">
                      <div>
                        <Rate
                          value={product.productDetails?.ratings.averageRating.toFixed(
                            1
                          )}
                          className={`text-sm ${
                            product.productDetails?.ratings.averageRating > 0
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
                        <div>
                          {product.productDetails?.ratings.numberOfRatings}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-between items-center mt-auto">
                      <div className="flex flex-col">
                        <div className="flex flex-row gap-1 items-center">
                          {product?.productDetails?.discount > 0 && (
                            <>
                              <div className="font-mono line-through">
                                {product.productDetails?.price}
                              </div>
                              <div className="bg-[var(--color-secondary)] text-gray-200 px-1 rounded font-bold text-xs">
                                -
                                {Math.round(
                                  product.productDetails?.discountPercentage
                                )}
                                %
                              </div>
                            </>
                          )}
                        </div>

                        <div className="font-bold text-2xl">
                          {product?.productDetails?.discount > 0
                            ? `${product.productDetails?.discount}`
                            : `${product.productDetails?.price}`}
                        </div>
                      </div>
                      <div
                        className="rounded-lg"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                        }}
                      >
                        {product.productDetails?.stockQuantity > 0 ? (
                          <>
                            {existingItem ? (
                              <div className="flex flex-row items-center justify-center gap-2">
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

                                <div className="dark:text-gray-200">
                                  {existingQuantity}
                                </div>

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
                                onClick={() =>
                                  handleAddToCart(
                                    product.productDetails,
                                    `/singleProduct/${product?.parentCategoryDetails?.categoryName}/${product?.parentCategoryDetails?._id}/${product?.categoryDetails?.categoryName}/${product?.categoryDetails?._id}/${product?.productDetails?.name}/${product?.productDetails?._id}`
                                  )
                                }
                                className="p-3 bg-[var(--color-primary)] rounded-lg cursor-pointer hover:bg-[var(--color-secondary)]"
                                aria-label="Add to Cart"
                              >
                                <FaShoppingCart color="white" />
                              </motion.div>
                            )}
                          </>
                        ) : (
                          <div>Out Of Stock</div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {products?.length > 5 && (
        <div className="hidden md:block">
          <button
            className="absolute top-1/2 -translate-y-1/2 -left-12 p-2  bg-[var(--color-primary)] text-white rounded-full"
            onClick={() => handleNavigation(-1)}
            disabled={currentIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <button
            className="absolute top-1/2 -translate-y-1/2 -right-12 p-2  bg-[var(--color-primary)] text-white rounded-full"
            onClick={() => handleNavigation(1)}
            disabled={currentIndex === products.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default BestProducts;
