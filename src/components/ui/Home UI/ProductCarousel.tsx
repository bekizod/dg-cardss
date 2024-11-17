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

const ProductCarousel = () => {
  // Get user and logout function from context
  const dispatch = useDispatch<AppDispatch>();
  const { products, pages, total, status } = useSelector(
    (state: RootState) => state.searchProducts as any
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useAuth();
  const { favoriteProducts, loading, error } = useSelector(
    (state: RootState) => state.favoriteProducts as any
  );
  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = [
        `page=`,
        `size=`,
        `q=`, // Only add 'q' if searchTerm is not empty
        `color=`,
        `productSize=`,
        `brand=`,
        `material=`,
        `minPrice=`,
        `maxPrice=`,
        `category=`,
        `hasDiscount=true`,
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
    };

    fetchProducts(); // Call the async function inside the useEffect
  }, [dispatch]);

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
        link: `/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`,
        averageRating: product.ratings.averageRating,
        numberOfRating: product.ratings.numberOfRatings,
        brand: product.additionalInformation.brand,
        adjective: product.adjective,
      })
    );
  };
  const handleNavigation = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < products.length && carouselRef.current) {
      setCurrentIndex(newIndex);
      carouselRef.current.scrollTo({
        left: carouselRef.current.clientWidth * newIndex,
        behavior: "smooth",
      });
    }
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

  return (
    <div className="relative ">
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
            const productIdt = product?._id as any;
            const buyerId = user?._id || "guest";
            const productColor =
              product?.additionalInformation?.color || "default";
            // Check if the product is already in the cart
            const existingItem = cartItems.find(
              (item) =>
                item.id === productIdt &&
                item.buyerId === buyerId &&
                item.color === productColor
            );
            const existingQuantity = existingItem ? existingItem.quantity : 0;
            const BuyerId = existingItem ? existingItem.buyerId : "guest";
            const ID = existingItem ? existingItem.id : "";
            const isFavorite = favoriteProducts?.some(
              (favProduct: any) => favProduct._id === productIdt
            );

            return (
              <div
                key={productIdt}
                className="flex flex-col w-60 bg-white dark:bg-slate-800 dark:text-white shadow-xl gap-1 border dark:border-slate-700 rounded-3xl p-3"
              >
                {/* <div className="flex font-thin justify-end">id: 12345789</div> */}
                <div className="flex flex-row gap-1">
                  <Link
                    href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}
                    className="w-[95%]"
                  >
                    <Image
                      src={product.imageIds[0]}
                      alt="product"
                      width={1000}
                      height={1000}
                      className="w-full h-44 rounded-md"
                    />
                  </Link>

                  <div>
                    <motion.div
                      className="rounded-full p-2 bg-slate-200 cursor-pointer dark:bg-slate-600"
                      whileHover={{ scale: 1.2 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      onClick={() => handleFavoriteToggle(productIdt)}
                    >
                      {isFavorite ? (
                        <GoHeartFill
                          className="text-[var(--color-primary)] dark:text-[var(--color-secondary)] "
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
                </div>

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
                              {product.price - product.discount}
                            </div>
                            <div className="bg-blue-100 dark:bg-blue-900 px-1 rounded font-semibold text-xs">
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
                          className="p-3 bg-blue-500 dark:bg-blue-700 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-800"
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
          })}
        </motion.div>
      </div>
      {products?.length > 5 && (
        <React.Fragment>
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
        </React.Fragment>
      )}
    </div>
  );
};

export default ProductCarousel;
