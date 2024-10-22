"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getAdvertisements,resetAdvertisements } from "@/redux/slices/bannersSlice";
import Link from "next/link";
 
export default function HomeAppliance(){
  const [currentSlide, setCurrentSlide] = useState(0);
   
 // Adjust based on the number of slides
 const dispatch = useDispatch<AppDispatch>();
  const advertisements = useSelector((state: any) => state.advertisement.data); // Access advertisements from the Redux state
 const totalSlides = advertisements?.length || 0;

 useEffect(() => {
    // Fetch advertisements when the component mounts or when the parentId changes
    dispatch(getAdvertisements("67176d7b8f31afc8d962be92"));

    // Optionally reset the advertisements when the component unmounts
    return () => {
      dispatch(resetAdvertisements());
    };
  }, [dispatch, parentId]);

  
  useEffect(() => {
     
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [ totalSlides   ]);

  
  return (
    <div className="page-container flex flex-col gap-8 py-10 px-4">
      <div className="relative w-full overflow-hidden rounded-2xl border border-gray-300">
        <motion.div className="relative w-full flex overflow-hidden">
          <motion.ul
            className="flex w-full"
            style={{
              display: "flex",
              padding: 0,
              margin: 0,
              transition: "transform 0.35s ease-in-out",
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {advertisements?.map((ad: any, index: number) => (
              <motion.li key={index} className="flex-shrink-0 w-full">
                <Link href={`/${ad.parentCategoryId?.categoryName}/${ad.parentCategoryId?._id}/${ad.subCategoryId.categoryName}/${ad.subCategoryId._id}`}>
                  {" "}
                  {/* Assuming 'link' is the URL to redirect */}
                  <Image
                    src={ad.imageId?.data} // Assuming 'imageUrl' holds the image link
                    alt={`slide ${index}`}
                    layout="responsive"
                    width={1200}
                    height={500}
                    priority
                    className="rounded-2xl border border-gray-300"
                    fetchPriority="high"
                  />
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <button type="button" aria-label="previous slide" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)}>
          ‹
        </button>
        <button type="button" aria-label="next slide" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)}>
          ›
        </button>

        <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(totalSlides).keys()].map((index) => (
            <li key={index} className={`dot ${currentSlide === index ? " bg-[var(--color-primary)]" : "bg-gray-400"} w-2 h-2 rounded-full`} />
          ))}
        </ul>
      </div>

      <h2 className="text-left text-lg font-bold py-2">Important Supplies</h2>

      <div className="flex gap-2">
        <motion.div className="w-1/3">
          <a href="/SA_en/sweeteners-antiques/antiques.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_76.jpg" alt="banner" layout="responsive" width={400} height={300} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
        <motion.div className="w-1/3">
          <a href="/SA_en/home-appliances/home-lighting.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_43.jpg" alt="banner" layout="responsive" width={400} height={300} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
        <motion.div className="w-1/3">
          <a href="/SA_en/coffee-spices/personal-care.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_44.jpg" alt="banner" layout="responsive" width={400} height={300} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
      </div>

      <div className="flex gap-2">
        <motion.div className="w-1/2">
          <a href="/SA_en/coffee-spices/table-mats.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_10.jpg" alt="banner" layout="responsive" width={600} height={400} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
        <motion.div className="w-1/2">
          <a href="/SA_en/coffee-spices/organizers.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_10.jpg" alt="banner" layout="responsive" width={600} height={400} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
      </div>

      <h2 className="text-left text-lg font-bold py-2">The Elegance of Your Home</h2>

      <div className="flex gap-2">
        <motion.div className="w-1/2">
          <a href="/SA_en/home-appliances/home-lighting.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__--eng.jpg" alt="banner" layout="responsive" width={600} height={400} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
        <motion.div className="w-1/2">
          <a href="/SA_en/sweeteners-antiques/antiques.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_10.jpg" alt="banner" layout="responsive" width={600} height={400} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
      </div>

      <h2 className="text-left text-lg font-bold py-2">Keep Fresh</h2>

      <div className="flex gap-2">
        <motion.div className="w-full">
          <a href="/SA_en/home-appliances/household-cleaners.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_45.jpg" alt="banner" layout="responsive" width={1200} height={800} className="rounded-2xl border border-gray-300" fetchPriority="high" />
          </a>
        </motion.div>
      </div>
    </div>
  );
};


