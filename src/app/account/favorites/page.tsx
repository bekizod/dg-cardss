"use client";
import { fetchFavorites, removeFavorite } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import { Card, Button, notification } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

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
      .catch(() => {
        notification.error({
          message: "Error loading favorites",
        });
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
    return <p className="text-center text-2xl font-bold mt-[124px]">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-2xl font-bold mt-[124px]">Error: {error}</p>;
  }

  return (
    <div className="dark:bg-slate-900 py-4 bg-white w-full mt-[124px] px-4 transition-colors duration-300">
      <h3 className="text-2xl font-bold text-center mb-4 dark:text-white text-black">Your Favorite Categories</h3>
      
        {favorites?.length > 0 ? (
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.map((category) => (
            <Card
              key={category._id}
              hoverable
              cover={
                <Image
                  src={category.categoryLogo?.data as string} // Assuming it's a valid URL string
                  alt={category.categoryName}
                  width={1000}
                  height={1000}
                  className="object-cover"
                />
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
