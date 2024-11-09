"use client";
import { fetchFavorites, removeFavorite } from "@/redux/slices/favoriteSlice";
import { fetchFavoriteProducts, removeFavoriteProduct } from "@/redux/slices/favoriteProductsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Button, notification } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { addToCart, decrementQuantity, incrementQuantity } from "@/redux/slices/cartSlice";
import { useAuth } from "@/context/UserContext";
import { MdDelete } from "react-icons/md";

const FavoriteList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { favorites, loading, error } = useSelector((state: RootState) => state.favorites as any);
  const { favoriteProducts } = useSelector((state: RootState) => state.favoriteProducts as any);
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
        message: 'Success',
        description: 'Product removed from favorites!',
      });
    } catch (error: any) {
      let errorMessage = 'Failed to save favorite product.';
      // Check if the error message contains "jwt malformed"
      if (error == "jwt malformed") {
        errorMessage = 'Authentication error: Please log in to save favorite products.';
      } else {
        errorMessage = 'Failed,No internet connection.';
      }
      notification.error({
        message: 'Error',
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
        test: "test",
      })
    );
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loader" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-2xl font-bold mt-[124px]">Error: {error}</p>;
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="dark:bg-slate-900 py-8 bg-white px-4 max-lg:mt[64px] mt-[124px]">
      <h3 className="text-2xl font-bold text-center mb-6 dark:text-white text-black">Your Favorite Categories</h3>
      {favorites?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favorites.map((category: any) => (
            <motion.div
              key={category._id}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              className="rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700 bg-white border border-gray-200 p-4 flex flex-col items-center"
            >
              <Link href={`/${category.parentCategory.categoryName}/${category.parentCategory._id}/${category.categoryName}/${category._id}`}>
                <Image
                  src={category.categoryLogo?.data as string}
                  alt={category.categoryName}
                  width={250}
                  height={250}
                  className="rounded-lg object-cover w-full h-40"
                />
              </Link>
              <h4 className="mt-4 text-lg font-semibold text-center text-red-400">{category.categoryName}</h4>
              <Button
                type="primary"
                danger
                icon={<DeleteOutlined />}
                className="mt-4 w-full"
                onClick={() => handleRemoveFavorite(category._id)}
              >
                Remove
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-2xl font-bold mt-6 dark:text-white text-black">No Favorite Categories</p>
      )}

      <h3 className="text-2xl font-bold text-center my-8 dark:text-white text-black">Your Favorite Products</h3>
      {favoriteProducts?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {favoriteProducts.map((product: any) => {


            const productIdt = product?._id as any;
            const buyerId = user?._id || "guest";
            const productColor = product?.additionalInformation?.color || "default";
            // Check if the product is already in the cart
            const existingItem = cartItems.find((item) => item.id === productIdt && item.buyerId === buyerId && item.color === productColor);
            const existingQuantity = existingItem ? existingItem.quantity : 0;
            const BuyerId = existingItem ? existingItem.buyerId : "guest";
            const ID = existingItem ? existingItem.id : "";
            const isFavorite = favoriteProducts?.some((favProduct: any) => favProduct._id === productIdt);
            return (
              <div key={product._id} className="relative w-64   flex-shrink-0">
                <div className="bg-white dark:bg-slate-700   p-4 rounded-lg shadow-lg">
                  <div onMouseDown={(e) => e.preventDefault()} onClick={(e) => e.preventDefault()}>
                  <div
                        onClick={() => handleRemoveFavProduct(product._id)}
                        className="  text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-300"
                        aria-label="Remove from favorites"
                      >
                        <MdDelete size={27} />
                      </div>
                    <motion.div
                      className="z-30 pb-1 cursor-pointer"

                      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                    >

                      
                    </motion.div>
                    
                    <Link href={`/singleProduct/${product?.category?.parentCategory?.categoryName}/${product?.category?.parentCategory?._id}/${product?.category?.categoryName}/${product?.category?._id}/${product?.name}/${product?._id}`}  >
                      <Image src={product?.signedUrls[0]} alt={product.name} width={200} height={200} loading="eager" fetchPriority="high" className="w-full h-40  rounded-xl object-cover" />
                      {
                        product?.discount > 0 && <p className="absolute top-0 right-0 c text-white text-xs sm:text-sm bg-[var(--color-primary)] font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">{Math.round(product.discountPercentage)}% SAVE</p>
                      }
                      <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{product.additionalInformation.brand}</p>
                      <div className="mt-2">
                        {
                          product?.discount ? (<><p className="text-xl  font-bold text-green-500">{product.discount}</p>
                            <p className="text-sm line-through text-gray-500">{product.price}</p>
                            <p className="text-sm text-red-500">SAVE {product.price - product.discount}</p></>) : (<p className="py-5 text-xl font-bold text-green-500">{product.price}</p>)
                        }

                      </div>

                    </Link>
                    {existingItem ? (
                      <div className="flex flex-row items-center justify-center py-2 gap-2">
                        <button onClick={() => dispatch(decrementQuantity({ id: ID, buyerId: BuyerId }))} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                          -
                        </button>
                        <div className=" text-gray-600 dark:text-gray-300">{existingQuantity}</div>
                        <button onClick={() => dispatch(incrementQuantity({ id: ID, buyerId: BuyerId }))} className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded">
                          +
                        </button>
                      </div>
                    ) : (
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleAddToCart(product)} className="mt-2 w-full  bg-[var(--color-primary)] dark:bg-green-700 text-white font-bold text-xs sm:text-sm py-1 sm:py-2 rounded-xl">
                        Add to Cart
                      </motion.button>
                    )}
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <p className="text-center text-2xl font-bold mt-6 dark:text-white text-black">No Favorite Products</p>
      )}
    </div>
  );
};

export default FavoriteList;
