"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function PageBuilder() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // Number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [totalSlides]);

  return (
    <div className="space-y-4 py-10 px-4">
      {/* Slider Section */}
      <motion.div className="relative w-full overflow-hidden rounded-2xl border border-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.div className="relative w-full flex overflow-hidden">
          <motion.ul
            className="flex"
            style={{
              width: "100%",
              padding: 0,
              margin: 0,
              transition: "transform 0.35s ease-in-out",
              transform: `translateX(-${currentSlide * 100}%)`,
            }}
          >
            <motion.li className="flex-shrink-0 w-full">
              <Link href="/SA_en/electrical-appliances/air-fryers.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_21.jpg" alt="slide 0" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </Link>
            </motion.li>
            <motion.li className="flex-shrink-0 w-full">
              <Link href="/SA_en/electrical-appliances/air-fryers.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_21.jpg" alt="slide 1" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
        <button aria-label="previous slide / item" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-green-500 p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)}>
          ‹
        </button>
        <button aria-label="next slide / item" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-green-500 p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)}>
          ›
        </button>
        <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(totalSlides).keys()].map((index) => (
            <li key={index} className={`dot ${currentSlide === index ? "bg-green-500" : "bg-gray-400"} w-2 h-2 rounded-full`} />
          ))}
        </ul>
      </motion.div>

      {/* Banner Sections */}
      <motion.div className="relative w-full space-y-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-full">
          <Link href="/SA_en/electrical-appliances/pressure-cookers.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/eng_-_-_1.jpg" alt="banner" layout="responsive" width={1200} height={800} priority className="rounded-2xl" fetchPriority="high" />
          </Link>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <Link href="/SA_en/electrical-appliances/ovens-microwaves.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_91.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/2">
            <Link href="/SA_en/electrical-appliances/coffee-machines.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_15.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/pressure-cookers.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_2.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/electric-bakers.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_--eng_33.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/food-processors.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_19.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/blenders.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_92.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
        </div>

        <motion.div className="relative w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="PageBuilder_intersection_div__OvZlh">
            <div className="Banner_container__VNJY5">
              <Link href="/SA_en/electrical-appliances/mixers-123.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_66.jpg" alt="banner" layout="responsive" width={1200} height={800} priority className="w-full rounded-2xl" fetchPriority="high" />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex gap-2.5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/pressure-cookers.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__200.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/food-processors.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_36.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/grinders-roasters.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_6.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/blenders.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_93.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex gap-2.5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/electric-bakers.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_94.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/sandwich-waffle-maker.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_22.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/canister-vacuums.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_.eng_42.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/irons.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_6.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex gap-2.5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/ovens-microwaves.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_--eng_41.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/food-chopper.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_8.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/juicers.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_67.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/electric-kettles.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_9.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="relative w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="PageBuilder_intersection_div__OvZlh">
          <div className="Banner_container__VNJY5">
            <Link href="/SA_en/electrical-appliances/canister-vacuums.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_8.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div className="relative w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="PageBuilder_intersection_div__OvZlh">
          <div className="Banner_container__VNJY5">
            <Link href="/SA_en/electrical-appliances/ovens-microwaves.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_70.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
