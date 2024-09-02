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

      <div>
        <ScrollableBanner />
      </div>
      <div className="">
        <BannerSection />
      </div>

      <div>
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
      </div>

      <div>
        <ScrollableBanner />
      </div>


      
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div>
        <h1>Best Brands</h1>
        <motion.div className="flex py-2 gap-2">
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
        </motion.div>
      </div>
    </div>
  );
}
