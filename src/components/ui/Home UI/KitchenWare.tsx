"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function KitchenWare() {
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
              <Link href="/SA_en/kitchenware/pots.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-_ENG.jpg" alt="slide 1" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </Link>
            </motion.li>
            <motion.li className="flex-shrink-0 w-full">
              <Link href="/SA_en/kitchenware/kitchen-accessories.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_3.jpg" alt="slide 0" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </Link>
            </motion.li>
          </motion.ul>
        </motion.div>
        <button aria-label="previous slide / item" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)}>
          ‹
        </button>
        <button aria-label="next slide / item" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)}>
          ›
        </button>
        <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(totalSlides).keys()].map((index) => (
            <li key={index} className={`dot ${currentSlide === index ? " bg-[var(--color-primary)]" : "bg-gray-400"} w-2 h-2 rounded-full`} />
          ))}
        </ul>
      </motion.div>

      {/* Banner Sections */}
      <motion.div className="relative w-full space-y-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="banner-container">
          <Link href="/SA_en/kitchenware/cake-mould-ovenpan.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_4.jpg" alt="banner" layout="responsive" width={1200} height={800} priority className="rounded-2xl" fetchPriority="high" />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-left px-2">Practical Pots</h2>

        <div className="banner-container">
          <Link href="/SA_en/kitchenware/pots.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_38.jpg" alt="banner" layout="responsive" width={1200} height={800} priority className="rounded-2xl" fetchPriority="high" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-left px-2">Basics of Cooking Utensils</h2>

        {/* Three Banners in a Row */}
        <div className="flex gap-2">
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/pots.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_12.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/kitchen-accessories.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_6.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/pot-1.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_5.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/food-keeper.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_7.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/cake-mould-ovenpan.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_8.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/coffee-and-spices.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_13.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
        </div>
        <div className="flex gap-2">
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/spoons-knives.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_39.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/kitchenware/pans-alsaifgallery.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_6.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
          <motion.div className="w-1/3" whileTap={{ scale: 0.95 }}>
            <Link href="/SA_en/alsaif-coffee.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_9.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl" />
            </Link>
          </motion.div>
        </div>

        {/* Additional Banners and Text Sections */}
        <h2 className="text-2xl font-bold text-left px-2">Best Products For You</h2>
        <div className="banner-container">
          <Link href="/SA_en/kitchenware/spoons-knives.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_9.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="rounded-2xl" />
          </Link>
        </div>
        <h2 className="text-2xl font-bold text-left px-2">Pans Utensils</h2>
        <div className="banner-container">
          <Link href="/SA_en/kitchenware/pans-alsaifgallery.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_ENG_1.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="rounded-2xl" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-left px-2">A Moment of Joy</h2>
        <div className="banner-container">
          <Link href="/SA_en/alsaif-coffee.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_14.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="rounded-2xl" />
          </Link>
        </div>

        <h2 className="text-2xl font-bold text-left px-2">Elegant Food Keeper</h2>
        <div className="banner-container">
          <Link href="/SA_en/kitchenware/food-keeper.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_15.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="rounded-2xl" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
