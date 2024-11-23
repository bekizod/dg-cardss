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
        size: product.additionalInformation.size,
        selectedSize: product.additionalInformation.size[0],
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

  return (
    // <div className="dark:bg-slate-900 py-8 bg-white px-4 max-lg:mt-[32px] lg:mt-[124px]">
    //   <h3 className="text-2xl font-bold text-center mb-6 dark:text-white text-black">
    //     Your Favorite Categories
    //   </h3>
    // {favorites?.length > 0 ? (
    //   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
    //     {favorites.map((category: any) => (
    //       <motion.div
    //         key={category._id}
    //         variants={cardVariants}
    //         initial="hidden"
    //         animate="visible"
    //         className="rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700 bg-white border border-gray-200 p-4 flex flex-col items-center"
    //       >
    //         <Link
    //           href={`/${category.parentCategory.categoryName}/${category.parentCategory._id}/${category.categoryName}/${category._id}`}
    //         >
    //           <Image
    //             src={category.categoryLogo?.data as string}
    //             alt={category.categoryName}
    //             width={250}
    //             height={250}
    //             className="rounded-lg object-cover w-full h-40"
    //           />
    //         </Link>
    //         <h4 className="mt-4 text-lg font-semibold text-center text-red-400">
    //           {category.categoryName}
    //         </h4>
    //         <Button
    //           type="primary"
    //           danger
    //           icon={<DeleteOutlined />}
    //           className="mt-4 w-full"
    //           onClick={() => handleRemoveFavorite(category._id)}
    //         >
    //           Remove
    //         </Button>
    //       </motion.div>
    //     ))}
    //   </div>
    // ) : (
    //   <div className="text-gray-500  text-center flex justify-center">
    //     <Image
    //       src={"/fav_gif.gif"}
    //       className="h-72 w-72 rounded"
    //       alt={"order"}
    //       width={1000}
    //       height={1000}
    //     />
    //   </div>
    // )}

    //   <h3 className="text-2xl font-bold text-center my-8 dark:text-white text-black">
    //     Your Favorite Products
    //   </h3>

    // {favoriteProducts?.length > 0 ? (
    //   <div className="grid grid-cols-1 sm:grid-cols-2 px-6 lg:grid-cols-4 gap-6">
    //     {favoriteProducts.map((product: any) => {
    //       const productIdt = product?._id as any;
    //       const buyerId = user?._id || "guest";
    //       const productColor =
    //         product?.additionalInformation?.color || "default";
    //       // Check if the product is already in the cart
    //       const existingItem = cartItems.find(
    //         (item) =>
    //           item.id === productIdt &&
    //           item.buyerId === buyerId &&
    //           item.color === productColor
    //       );
    //       const existingQuantity = existingItem ? existingItem.quantity : 0;
    //       const BuyerId = existingItem ? existingItem.buyerId : "guest";
    //       const ID = existingItem ? existingItem.id : "";
    //       const isFavorite = favoriteProducts?.some(
    //         (favProduct: any) => favProduct._id === productIdt
    //       );
    //       return (
    //         <div key={product._id} className="relative   flex-shrink-0">
    //           <div className="bg-white dark:bg-slate-700   p-4 rounded-lg shadow-lg">
    //             <div
    //               onMouseDown={(e) => e.preventDefault()}
    //               onClick={(e) => e.preventDefault()}
    //             >
    //               <div
    //                 onClick={() => handleRemoveFavProduct(product._id)}
    //                 className="  text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-300"
    //                 aria-label="Remove from favorites"
    //               >
    //                 <MdDelete size={27} />
    //               </div>
    //               <motion.div
    //                 className="z-30 pb-1 cursor-pointer"
    //                 whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
    //               ></motion.div>

    //               <Link
    //                 href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}
    //               >
    //                 <Image
    //                   src={product?.signedUrls[0]}
    //                   alt={product.name}
    //                   width={200}
    //                   height={200}
    //                   loading="eager"
    //                   fetchPriority="high"
    //                   className="w-full h-40  rounded-xl object-cover"
    //                 />
    //                 {product?.discount > 0 && (
    //                   <p className="absolute top-0 right-0 c text-white text-xs sm:text-sm bg-[var(--color-primary)] font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">
    //                     {Math.round(product.discountPercentage)}% SAVE
    //                   </p>
    //                 )}
    //                 <h2 className="mt-2 text-lg font-semibold">
    //                   {product.name}
    //                 </h2>
    //                 <p className="text-sm text-gray-600 dark:text-gray-300">
    //                   {product.additionalInformation.brand}
    //                 </p>
    //                 <div className="mt-2">
    //                   {product?.discount ? (
    //                     <>
    //                       <p className="text-xl  font-bold text-green-500">
    //                         {product.discount}
    //                       </p>
    //                       <p className="text-sm line-through text-gray-500">
    //                         {product.price}
    //                       </p>
    //                       <p className="text-sm text-red-500">
    //                         SAVE {product.price - product.discount}
    //                       </p>
    //                     </>
    //                   ) : (
    //                     <p className="py-5 text-xl font-bold text-green-500">
    //                       {product.price}
    //                     </p>
    //                   )}
    //                 </div>
    //               </Link>
    //               {existingItem ? (
    //                 <div className="flex flex-row items-center justify-center py-2 gap-2">
    //                   <button
    //                     onClick={() =>
    //                       dispatch(
    //                         decrementQuantity({ id: ID, buyerId: BuyerId })
    //                       )
    //                     }
    //                     className="px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-[var(--color-secondary)] dark:hover:bg-[var(--color-secondary)] rounded"
    //                   >
    //                     -
    //                   </button>
    //                   <div className=" text-gray-600 dark:text-gray-300">
    //                     {existingQuantity}
    //                   </div>
    //                   <button
    //                     onClick={() =>
    //                       dispatch(
    //                         incrementQuantity({ id: ID, buyerId: BuyerId })
    //                       )
    //                     }
    //                     className="px-2 py-1 bg-gray-200 dark:bg-gray-600 hover:bg-[var(--color-secondary)] dark:hover:bg-[var(--color-secondary)] rounded"
    //                   >
    //                     +
    //                   </button>
    //                 </div>
    //               ) : (
    //                 <motion.button
    //                   whileTap={{ scale: 0.95 }}
    //                   onClick={() => handleAddToCart(product)}
    //                   className="mt-2 w-full  bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white font-bold text-xs sm:text-sm py-1 sm:py-2 rounded-xl"
    //                 >
    //                   Add to Cart
    //                 </motion.button>
    //               )}
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })}
    //   </div>
    // ) : (
    //   <div className="text-gray-500  text-center flex justify-center">
    //     <Image
    //       src={"/fav_gif.gif"}
    //       className="h-72 w-72 rounded"
    //       alt={"order"}
    //       width={1000}
    //       height={1000}
    //     />
    //   </div>
    // )}
    // </div>

    <div className="flex flex-col lg:flex-row gap-8 max-lg:mt-[34px]     dark:text-white p-3">
      {/* Left Section */}
      <div className="flex flex-col lg:w-1/2 w-full">
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="text-2xl text-center font-bold">
              Favorite Products
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
                  const productColor =
                    product?.additionalInformation?.color || "default";
                  const existingItem = cartItems.find(
                    (item) =>
                      item.id === productIdt &&
                      item.buyerId === buyerId &&
                      item.color === productColor
                  );
                  return acc + (existingItem ? 1 : 0);
                }, 0)}
              </span>{" "}
              Favorite Products in your cart.
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
                    item.buyerId === buyerId &&
                    item.color === productColor
                );
                const isInCart = !!existingItem;

                return (
                  <div
                    key={product._id}
                    className="flex    flex-row bg-slate-100 dark:bg-slate-700 rounded-2xl shadow-lg shadow-slate-300 dark:shadow-lg gap-3 max-sm:gap-1 p-1 max-sm:py-5 items-center relative"
                  >
                    {isInCart && (
                      <div className="absolute top-0 right-0 rounded-tr-xl rounded-bl-lg bg-[var(--color-primary)] text-white text-xs font-bold px-2 py-1 rounded-br-md">
                        In Cart
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
                        {product.name}
                      </div>
                      <div className="truncate max-sm:hidden">
                        {product.description}
                      </div>
                      <div className="truncate">
                        {product.additionalInformation.brand}
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
          Favorite Categories
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
                    href={`/${category.parentCategory.categoryName}/${category.parentCategory._id}/${category.categoryName}/${category._id}`}
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
