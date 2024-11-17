import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { SearchProducts } from "@/redux/slices/searchSlice";
import { notification } from "antd";
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
              <div key={index} className="relative w-64   flex-shrink-0">
                <div className="bg-white dark:bg-slate-700   p-4 rounded-lg shadow-lg">
                  <div
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => e.preventDefault()}
                  >
                    <motion.div
                      className="z-30 pb-1 cursor-pointer"
                      onClick={() => handleFavoriteToggle(productIdt)}
                      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    >
                      {isFavorite ? (
                        <GoHeartFill
                          className="text-[var(--color-primary)]"
                          size={27}
                        />
                      ) : (
                        <GoHeart
                          size={27}
                          className="text-[var(--color-secondary)]"
                        />
                      )}
                    </motion.div>
                    <Link
                      href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}
                    >
                      <Image
                        src={product?.imageIds[0]}
                        alt={product.alt}
                        width={200}
                        height={200}
                        loading="eager"
                        fetchPriority="high"
                        className="w-full h-40  rounded-xl object-cover"
                      />
                      {product?.discount > 0 ? (
                        <p className="absolute top-0 right-0 c text-white text-xs sm:text-sm bg-[var(--color-primary)] font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">
                          {Math.round(product.discountPercentage)}% SAVE
                        </p>
                      ) : (
                        <p className="absolute top-0 right-0 c text-white text-xs sm:text-sm bg-[var(--color-primary)] font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">
                          Expired Discount
                        </p>
                      )}
                      <h2 className="mt-2 text-lg font-semibold">
                        {product.name}
                      </h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {product.additionalInformation.brand}
                      </p>
                      <div className="mt-2">
                        {product?.discount ? (
                          <>
                            <p className="text-xl  font-bold text-green-500">
                              {product.discount}
                            </p>
                            <p className="text-sm line-through text-gray-500">
                              {product.price}
                            </p>
                            <p className="text-sm text-red-500">
                              SAVE {product.price - product.discount}
                            </p>
                          </>
                        ) : (
                          <p className="py-5 text-xl font-bold text-green-500">
                            {product.price}
                          </p>
                        )}
                      </div>
                    </Link>
                    {existingItem ? (
                      <div className="flex flex-row items-center justify-center py-2 gap-2">
                        <button
                          onClick={() =>
                            dispatch(
                              decrementQuantity({ id: ID, buyerId: BuyerId })
                            )
                          }
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-[var(--color-secondary)] dark:hover:bg-[var(--color-secondary)] rounded"
                        >
                          -
                        </button>
                        <div className=" text-gray-600 dark:text-gray-300">
                          {existingQuantity}
                        </div>
                        <button
                          onClick={() =>
                            dispatch(
                              incrementQuantity({ id: ID, buyerId: BuyerId })
                            )
                          }
                          className="px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-[var(--color-secondary)] dark:hover:bg-[var(--color-secondary)] rounded"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(product)}
                        className="mt-2 w-full  bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-xs sm:text-sm py-1 sm:py-2 rounded-xl"
                      >
                        Add to Cart
                      </motion.button>
                    )}
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
