import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
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
  removeFavoriteProduct,
  saveFavoriteProduct,
} from "@/redux/slices/favoriteProductsSlice";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FaRegComment, FaShoppingCart } from "react-icons/fa";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import axios from "axios";
import { AppDispatch } from "@/redux/store";

const BestProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const cartItems = useSelector((state: any) => state.cart.items);
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const favoriteProducts = useSelector(
    (state: any) => state.favoriteProducts.products
  );

  useEffect(() => {
    const fetchHighlyOrderedProducts = async () => {
      try {
        const response = await axios.get(
          "https://alsaifgallery.onrender.com/api/v1/order/highlyOrderedProducts",
           
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

    useEffect(() => {
       console.log(JSON.stringify(products,null,2))
    }, [products])
    
  const handleAddToCart = (product: any) => {
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
        unitPrice: product.discount ? product.discount : product.price,
        discount: product.discountPercentage || 0,
        link: `/singleProduct/${product.category}/${product._id}`,
        averageRating: product.ratings.averageRating,
        numberOfRating: product.ratings.numberOfRatings,
        brand: product.additionalInformation.brand,
        adjective: product.adjective,
      })
    );
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative">
      <div className="font-bold text-xl ">Top Selling Products</div>
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
            const isFavorite = favoriteProducts?.some(
              (favProduct: any) => favProduct._id === product.productDetails._id
            );

            return (
              <div
                key={product.productDetails._id}
                className="flex flex-col w-60 bg-white shadow-xl gap-1 border rounded-3xl p-3"
              >
                <div className="relative">
                  <Link
                    href={`/#`}
                  >
                    <Image
                      src={product.productDetails.imageIds[0]}
                      alt="product"
                      width={1000}
                      height={1000}
                      className="w-full h-44 rounded-md object-cover"
                    />
                  </Link>
                  <motion.div
                    className="absolute top-2 right-2 rounded-full p-2 bg-gray-200 cursor-pointer"
                    onClick={() =>
                      handleFavoriteToggle(product.productDetails._id)
                    }
                  >
                    {isFavorite ? (
                      <GoHeartFill size={17} />
                    ) : (
                      <GoHeart size={17} />
                    )}
                  </motion.div>
                </div>
                <div className="text-lg font-semibold">
                  {product.productDetails.name}
                </div>
                <div className="font-semibold">
                  {product.productDetails.additionalInformation.brand}
                </div>
                <div className="flex flex-row gap-3">
                  <div>
                    <Rate
                      value={product.productDetails.ratings.averageRating.toFixed(
                        1
                      )}
                      className="text-sm dark:text-yellow-400"
                      disabled
                    />
                  </div>
                  <div className="flex flex-row gap-1 items-center text-sm">
                    <div>
                      <FaRegComment />
                    </div>
                    <div>{product.productDetails.ratings.numberOfRatings}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4 text-green-500 font-bold text-lg">
                  <div>${product.productDetails.price}</div>

                  {/* <button
                    onClick={() => handleAddToCart(product.productDetails)}
                  >
                    Add to Cart
                  </button> */}
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

export default BestProducts;































