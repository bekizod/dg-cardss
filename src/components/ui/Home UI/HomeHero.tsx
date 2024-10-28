"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Slider";
import ScrollableBanner from "./ScrollableBanner";
import BannerSection from "./BannerHero1";
import ProductSlider from "./ProductCarousel";
import ProductCarousel from "./ProductCarousel";
import ScrollableBanner2 from "./ScrollableBanner2";
import OffersCountdown from "./OffersCountdown";
import { getAllCoverPictures } from "@/redux/slices/coverPictureSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
export default function HomeHero() {
  const dispatch = useDispatch<AppDispatch>();
  const { pictures, isFetching } = useSelector((state: RootState) => state.coverPictureSlice as any);
   
  useEffect(() => {
    dispatch(getAllCoverPictures({parentId:""}));
  }, [dispatch]);
 
  return (
    <div className="">
      <motion.div className="py-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <Image
          src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Header-EN_1.jpg"
          width={1000}
          height={1000}
          alt="banner"
          className=" w-full rounded-2xl" // Add the rounded class here
        />
      </motion.div>

      <div>
        <Slider />
      </div>

      <motion.div className="relative w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="shadow-none">
          <Image width={1000} height={1000} src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_1_.png" alt="banner" loading="eager" fetchPriority="high" className="w-full" />
        </div>
      </motion.div>

      {isFetching && <div>Cover Pics Are Fetching</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {pictures?.map((item: any) => (
          <Link href={`/${item?.parentCategory?.categoryName}/${item?.parentCategory?._id}/${item?.subCategory?.categoryName}/${item?.subCategory?._id}`} key={item?._id}>
            <motion.div className="shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105" whileHover={{ scale: 1.05 }}>
              <Image width={1000} height={1000} src={item?.coverPic?.data} alt={item?.subCategory?.categoryName} className="object-fit w-full h-60 transition-opacity duration-300 hover:opacity-80" />
              {/* <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{item.subCategory.categoryName}</h3>
                <p className="text-sm text-gray-600">{item.parentCategory.categoryName}</p>
              </div> */}
            </motion.div>
          </Link>
        ))}
      </div>

      {/* <div>
        <OffersCountdown />
      </div> */}

      {/* <div>
        <ScrollableBanner />
      </div> */}

      {/* <div className="">
        <BannerSection />
      </div> */}

      {/* <div>
        <motion.div className="flex py-4 gap-2.5">
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/alsaif-gallery-offers/less-than-99.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/99-EN_3.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/alsaif-gallery-offers/less-than-199.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/199-EN_3.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/alsaif-gallery-offers/less-than-299.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/299-EN_3.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/alsaif-gallery-offers/less-than-399.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/399-EN_3.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div> */}

      {/* <div>
        <ScrollableBanner2 />
      </div> */}
      {/* //////////////////////////////////////////////////////////////////// */}
      {/* <div>
        <div className="flex py-2 gap-2">
          <motion.div className="relative w-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/kitchenware/food-keeper.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Food-Box-Web-EN.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={400} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/kitchenware/spoons-knives.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Spoons-Knives-Web-EN.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={400} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div> */}
      {/* //////////////////////////////////////////////////////////////////// */}
      {/* <div>
        <div className="relative py-2 flex gap-2">
          <div className="relative w-1/2">
            <motion.div id="row_13_column_1_banner_1" className="PageBuilder_intersection_div__OvZlh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/large-home-appliances/air-conditioners.html" className="block">
                  <motion.img src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/AC-EN_1.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="relative w-1/4">
            <div className="h-full  flex flex-col justify-between">
              <motion.div id="row_13_column_2_banner_1" className="PageBuilder_intersection_div__OvZlh h-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Link href="/SA_en/electrical-appliances/food-processors.html" className="block h-full">
                  <motion.img src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__509.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full h-full object-cover rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                </Link>
              </motion.div>

              <motion.div id="row_13_column_2_banner_2" className="PageBuilder_intersection_div__OvZlh mt-2 h-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <Link href="/SA_en/large-home-appliances/refrigerator.html" className="block h-full">
                  <motion.img src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/file_500.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full h-full object-cover rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                </Link>
              </motion.div>
            </div>
          </div>

          <div className="relative w-1/4">
            <motion.div id="row_13_column_3_banner_1" className="PageBuilder_intersection_div__OvZlh h-full flex flex-col justify-between" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="Banner_container__VNJY5 h-1/2">
                <Link href="/SA_en/electrical-appliances/irons.html" className="block h-full">
                  <motion.img src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/file_499.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full h-full object-cover rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                </Link>
              </div>

              <motion.div id="row_13_column_3_banner_2" className="PageBuilder_intersection_div__OvZlh mt-2 h-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                <div className="Banner_container__VNJY5 h-full">
                  <Link href="/SA_en/large-home-appliances/gaz.html" className="block h-full">
                    <motion.img src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/file_501.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full h-full object-cover rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div> */}
      {/* //////////////////////////////////////////////////////////////////// */}
      {/* <div>
        <div className="flex py-3 gap-2">
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/electrical-appliances/juicers.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/file_502.jpg"
                  alt="banner 1"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/coffee-lovers/grinders-roasters.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__510.jpg"
                  alt="banner 2"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/serveware.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__511.jpg"
                  alt="banner 3"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/kitchenware/pans-alsaifgallery.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/file_503.jpg"
                  alt="banner 4"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div> */}
      {/* //////////////////////////////////////////////////////////////////// */}
      {/* <div>
        <div className="relative pb-3 flex gap-2">
          <div className="relative w-full">
            <motion.div id="row_15_column_1_banner_1" className="PageBuilder_intersection_div__OvZlh" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/kitchenware/kitchen-accessories.html" className="block">
                  <motion.img src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Kitchen-Accessories-Web-EN.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full rounded-2xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div> */}
      {/* //////////////////////////////////////////////////////////////////// */}
      <div>
        {/* <div className="flex pb-3 gap-2">
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/televisions/tv.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/file_504.jpg"
                  alt="banner 1"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/large-home-appliances/built-in.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-__128.jpg"
                  alt="banner 2"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/health-beauty/personal-care.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__512.jpg"
                  alt="banner 3"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
          <motion.div className="relative w-1/4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <div className="relative">
              <Link href="/SA_en/electrical-appliances/electrical-cooler.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__513.jpg"
                  alt="banner 4"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={300} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </motion.div>
        </div>
      </div> */}
        {/* //////////////////////////////////////////////////////////////////// */}
        <div>
          You May Also Like
          <ProductCarousel />
        </div>
        {/* //////////////////////////////////////////////////////////////////// */}
        {/* <div>
        <h1>Best Brands</h1>
        <motion.div className="flex py-3 gap-2">
          <div className="relative w-1/3">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Edison_4.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/3">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/kitchenware/pots.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Tornado_4.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/3">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/serveware.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Alsaif_4.jpg" alt="banner" width={1000} height={1000} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
}
