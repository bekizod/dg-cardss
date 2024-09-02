"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Slider from "./Test";
import ScrollableBanner from "./ScrollableBanner";
import BannerSection from "./BannerHero1";
export default function HomeHero() {
  return (
    <div className="">
      <motion.div style={{ position: "relative", width: "100%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div id="row_1_column_1_banner_1" className="">
          <div className="" style={{ boxShadow: "none" }}>
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Header-EN_1.jpg" width={1000} height={1000} alt="banner" loading="eager" fetchPriority="high" style={{ width: "100%" }} className="py-3 rounded-xl" />
          </div>
        </div>
      </motion.div>
      <div>
        <Slider />
      </div>

      <motion.div className="relative w-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="shadow-none">
          <Image width={1000} height={1000} src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_1_.png" alt="banner" loading="eager" fetchPriority="high" className="w-full" />
        </div>
      </motion.div>

      <div>
        <ScrollableBanner />
      </div>
      <div className="">
        <BannerSection />
      </div>
    </div>
  );
}
