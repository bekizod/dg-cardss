"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";
import ProductCarousel from "./ProductCarousel";
import axios from "axios";
import Loader from "@/app/loading";
import BestProducts from "./BestSellProduct";

export default function HomeHero() {
  const [coverPictures, setCoverPictures] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [error, setError] = useState<string | null>(null); // Store error message

  useEffect(() => {
    const fetchCoverPictures = async () => {
      setLoading(true);
      setError(null); // Reset error before making the request
      try {
        const response = await axios.get(
          `https://alsaifgallery.onrender.com/api/v1/category/getCoverPicturesOfSubCategories`
        );
        // Directly set the response data as an array
        setCoverPictures(response.data.data); // Set the data when the request is successful
      } catch (err: any) {
        setError(err.response?.data || "An error occurred"); // Set error message if something goes wrong
      } finally {
        setLoading(false); // Stop loading once the request is complete
      }
    };

    fetchCoverPictures();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-[40px]">
      <motion.div
        className="py-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Image
          src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Header-EN_1.jpg"
          width={1000}
          height={1000}
          alt="banner"
          className="w-full rounded-2xl" // Add the rounded class here
        />
      </motion.div>

      <div>
        <Slider />
      </div>

      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="shadow-none">
          <Image
            width={1000}
            height={1000}
            src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_1_.png"
            alt="banner"
            loading="eager"
            fetchPriority="high"
            className="w-full"
          />
        </div>
      </motion.div>

       <div className="px-7">
        <BestProducts />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {coverPictures.length === 0 ? (
          <div>{" "}</div>
        ) : (
          coverPictures.map((item: any) => (
            <Link
              href={`/${item?.parentCategory?.categoryName}/${item?.parentCategory?._id}/${item?.subCategory?.categoryName}/${item?.subCategory?._id}`}
              key={item?._id}
            >
              <motion.div
                className="shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  width={1000}
                  height={1000}
                  layout="responsive"
                  src={item?.coverPic?.data}
                  alt={item?.subCategory?.categoryName}
                  objectFit="cover"
                  className="  w-full h-36  transition-opacity duration-300 hover:opacity-80"
                />
              </motion.div>
            </Link>
          ))
        )}
      </div>

      <div className="px-7">
        {/* <div>You May Also Like</div> */}
        <ProductCarousel />
      </div>
    </div>
  );
}
