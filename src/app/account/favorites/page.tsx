"use client";
import { fetchFavorites, removeFavorite } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import { Card, Button, notification } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import Link from "next/link";

const { Meta } = Card;

 

const FavoriteList: React.FC = () => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector((state: RootState) => state.favorites as { favorites: any[]; loading: boolean; error: string });

  useEffect(() => {
    dispatch(fetchFavorites() as any)
      .unwrap()
      .then(() => {
        notification.success({
          message: "Favorites loaded successfully",
        });
      })
      .catch((error : any) => {
        notification.error({
          message: "Error loading favorites",
        });
console.log(error.message)
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

  if (loading) {
    return (
      <div role="status" className="space-y-8 mt-[124px] px-4 animate-pulse  rtl:space-x-reverse flex  flex-col  ">
        <div className="flex justify-center">
          <div className="md:w-2/3 w-full  h-10 bg-gray-300 rounded   dark:bg-gray-700"></div>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-3">
          <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded dark:bg-gray-700">
            <svg className="w-10  h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>

          <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded   dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>

          <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded   dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>

          <div className="flex items-center justify-center w-full h-56 bg-gray-300 rounded   dark:bg-gray-700">
            <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-2xl font-bold mt-[124px]">Error: {error}</p>;
  }

  return (
    <div className="dark:bg-slate-900 py-4 bg-white w-full max-lg:mt-[64px] lg:mt-[124px]px-4 transition-colors duration-300">
      <h3 className="text-2xl font-bold text-center mb-4 dark:text-white text-black">Your Favorite Categories</h3>
      
        {favorites?.length > 0 ? (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  
          {favorites.map((category) => (
            
            <Card
              key={category._id}
              hoverable
              cover={
                <><Link key={category?._id} href={`/${category?.parentCategory?.categoryName}/${category?.parentCategory?._id}/${category?.categoryName}/${category?._id}`}><Image
                  src={category.categoryLogo?.data as string} // Assuming it's a valid URL string
                  alt={category.categoryName}
                  width={1000}
                  height={1000}
                  className="object-cover" />
                  </Link> 
                  </>
                
              }
              style={{ width: 200, margin: "auto" }}
              className="dark:bg-slate-800 dark:border-slate-700 bg-white border-gray-200  transition-colors duration-300"
            >
              <Meta title={category.categoryName} style={{ textAlign: "center" }} className="text-red-400 py-1 text-lg font-semibold" />

              {/* Action button with background color styling */}
              <div className="py-2 flex justify-center items-center rounded-b-lg">
                <Button key={category._id} type="primary" danger icon={<DeleteOutlined />} onClick={() => handleRemoveFavorite(category._id)}>
                  Remove
                </Button>
              </div>
            </Card>
       
          ))}
</div>
        ) : (
          <p className="text-center flex items-center justify-center text-2xl font-bold  p-4 dark:text-white text-black">No Favorite Categories</p>
        )}
      
    </div>
  );
};

export default FavoriteList;
