"use client";
import { fetchFavorites, removeFavorite } from "@/redux/slices/favoriteSlice";
import {
  fetchFavoriteProducts,
  removeFavoriteProduct,
} from "@/redux/slices/favoriteProductsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, notification } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "@/redux/slices/cartSlice";
import { useAuth } from "@/context/UserContext";
import { MdDelete } from "react-icons/md";
import Loader from "@/app/loading";
import { FaTrashAlt } from "react-icons/fa";

const FavoriteList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, loading, error } = useSelector(
    (state: RootState) => state.favorites as any
  );
  const { favoriteProducts } = useSelector(
    (state: RootState) => state.favoriteProducts as any
  );
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { user } = useAuth();
  useEffect(() => {
    dispatch(fetchFavoriteProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchFavorites() as any)
      .unwrap()
      .catch((error: any) => {
        notification.error({
          message: "Error loading favorites",
        });
        console.log(error.message);
      });
  }, [dispatch]);

  const handleRemoveFavorite = (categoryId: string) => {
    dispatch(removeFavorite(categoryId) as any)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Category removed from favorites",
        });
      })
      .catch(() => {
        notification.error({
          message: "Error removing category from favorites",
        });
      });
  };
  const handleRemoveFavProduct = async (productId: string) => {
    try {
      await dispatch(removeFavoriteProduct(productId)).unwrap();
      notification.success({
        message: "Success",
        description: "Product removed from favorites!",
      });
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
        size: product.additionalInformation.size
      
      })
    );
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-2xl font-bold mt-[124px]">
        Error: {error}
      </p>
    );
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
    <div className="flex flex-col lg:flex-row gap-8 max-lg:mt-[34px]     dark:text-white p-3">
      {/* Left Section */}
      <div className="flex flex-col lg:w-1/2 w-full">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="text-2xl text-center font-bold">
              {translations.fav.favoriteProducts}
            </div>
            <div className="font-bold py-2 text-center">
              {/* You have{" "}
              <span className="text-[var(--color-primary)] font-serif">
                {favoriteProducts?.length}
              </span>{" "}
              in your favorites and{" "} */}
              <span className="text-[var(--color-primary)] text-lg font-serif">
                {favoriteProducts?.reduce((acc: any, product: any) => {
                  const productIdt = product?._id as any;
                  const buyerId = user?._id || "guest";
                  const productColor = product?.additionalInformation?.color;
                  const existingItem = cartItems.find(
                    (item) => item.id === productIdt && item.buyerId === buyerId
                  );
                  return acc + (existingItem ? 1 : 0);
                }, 0)}
              </span>{" "}
              {translations.fav.Fav_in}
            </div>
          </div>

          {favoriteProducts?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {favoriteProducts.map((product: any) => {
                const productIdt = product?._id as any;
                const buyerId = user?._id || "guest";
                const productColor =
                  product?.additionalInformation?.color || "default";
                const existingItem = cartItems.find(
                  (item) =>
                    item.id === productIdt &&
                    item.buyerId === buyerId 
                    // item.color === productColor
                );
                const isInCart = existingItem;

                return (
                  <div
                    key={product._id}
                    className="flex    flex-row bg-slate-100 dark:bg-slate-700 rounded-2xl shadow-lg shadow-slate-300 dark:shadow-lg gap-3 max-sm:gap-1 p-1 max-sm:py-5 items-center relative"
                  >
                    {isInCart && (
                      <div
                        className={`absolute ${
                          currentLocale === "ar"
                            ? "top-0 left-0 rounded-tl-xl rounded-br-lg" // Arabic: Top-left corner
                            : "top-0 right-0 rounded-tr-xl rounded-bl-lg" // English: Top-right corner
                        } bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-1`}
                      >
                        {translations.fav.inCart}
                      </div>
                    )}

                    <Link
                      href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}
                    >
                      <div className="w-36 h-36 max-md:w-20 max-md:h-20 relative">
                        <Image
                          src={product?.signedUrls[0]}
                          alt={product.name}
                          width={144}
                          height={144}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                    </Link>

                    <div className="flex flex-col w-full max-sm:text-xs  text-center sm:text-left">
                      <div className="font-semibold truncate">
                        {renderValue(product.name, product.translatedName)}
                      </div>
                      {/* <div className="truncate max-sm:hidden">
                        {product.description}
                      </div> */}
                      <div className="truncate">
                        {renderValue(
                          product.additionalInformation?.brand,
                          product.additionalInformation?.translatedBrand
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col  max-sm:text-xs gap-1 w-full sm:w-auto text-center sm:text-left">
                      {product?.discount ? (
                        <>
                          <div className="flex flex-row gap-1 items-center justify-center sm:justify-start">
                            <div className="font-mono line-through">
                              {product.price}
                            </div>
                            <div className="bg-[var(--color-primary)] px-1 rounded font-semibold text-xs">
                              -{Math.round(product.discountPercentage)}%
                            </div>
                          </div>
                          <div className="font-semibold  max-sm:text-sm text-xl">
                            ${product.discount}
                          </div>
                        </>
                      ) : (
                        <div className="font-semibold  max-sm:text-sm text-xl">
                          {product.price}
                        </div>
                      )}
                    </div>

                    <div
                      className="px-5 max-sm:px-1"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={(e) => e.preventDefault()}
                    >
                      <FaTrashAlt
                        onClick={() => handleRemoveFavProduct(product._id)}
                        className="text-black cursor-pointer dark:text-white"
                        size={23}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-gray-500 text-center flex justify-center">
              <Image
                src={"/fav_gif.gif"}
                className="h-72 w-72 rounded"
                alt={"order"}
                width={1000}
                height={1000}
              />
            </div>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-col lg:w-1/2 gap-3 px-5 justify-start items-start text-white rounded-2xl bg-[var(--color-tertiary)]">
        <div className="text-white text-2xl py-3 font-semibold text-center w-full">
          {translations.fav.Favorite_Categories}
          <hr className="border-gray-300 dark:border-slate-600 w-full" />
        </div>

        {favorites?.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {favorites.map((category: any) => (
              <div
                key={category._id}
                className="flex flex-row items-center w-full p-3 rounded-lg shadow-lg dark:shadow-slate-950"
              >
                <div className="md:w-[20%] max-sm:px-2 ">
                  <Link
                    href={`/${category?.parentCategory?.categoryName}/${category?.parentCategory?._id}/${category?.categoryName}/${category?._id}`}
                  >
                    <Image
                      src={category.categoryLogo?.data as string}
                      alt={category.categoryName}
                      width={1000}
                      height={1000}
                      className="w-24 h-24 max-sm:w-20 max-sm:h-20 rounded-lg"
                    />
                  </Link>
                </div>

                <div className="text-start w-[70%] font-bold text-xl">
                  {category.categoryName}
                </div>
                <div>
                  <FaTrashAlt
                    onClick={() => handleRemoveFavorite(category._id)}
                    className="text-white cursor-pointer dark:text-slate-300"
                    size={23}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-gray-500 text-center flex justify-center w-full">
            <Image
              src={"/fav_gif.gif"}
              className="h-72 w-72 rounded"
              alt={"order"}
              width={1000}
              height={1000}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteList;
