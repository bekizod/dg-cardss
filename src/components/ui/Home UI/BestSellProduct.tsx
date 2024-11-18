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
        await dispatch(removeFavoriteProduct(productId));
        notification.success({
          message: "Success",
          description: "Product removed from favorites!",
        });
      } else {
        await dispatch(saveFavoriteProduct(productId));
        notification.success({
          message: "Success",
          description: "Product added to favorites!",
        });
      }
    } catch (error: any) {
      notification.error({
        message: "Error",
        description: error?.message || "Failed to toggle favorite product.",
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
          <div>Top Selling Products</div>
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
                    href={`/singleProduct/${product.productDetails.category}/${product.productDetails._id}`}
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
                <Rate
                  value={product.productDetails.ratings.averageRating}
                  disabled
                />
                <div className="flex justify-between items-center mt-4">
                  <div>${product.productDetails.price}</div>
                  <button
                    onClick={() => handleAddToCart(product.productDetails)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
      {products.length > 5 && (
        <>
          <button onClick={() => handleNavigation(-1)}>Prev</button>
          <button onClick={() => handleNavigation(1)}>Next</button>
        </>
      )}
    </div>
  );
};

export default BestProducts;
