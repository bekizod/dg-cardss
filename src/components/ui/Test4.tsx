"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function HomeAppliance(){
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // Adjust based on the number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [totalSlides]);

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
            <motion.li className="flex-shrink-0 w-full">
              <a href="/SA_en/sweeteners-antiques/antiques.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_77.jpg" alt="slide 1" layout="responsive" width={1200} height={800} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </a>
            </motion.li>
            <motion.li className="flex-shrink-0 w-full">
              <a href="/SA_en/coffee-spices/personal-care.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_75.jpg" alt="slide 0" layout="responsive" width={1200} height={800} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>

        <button type="button" aria-label="previous slide" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)}>
          ‹
        </button>
        <button type="button" aria-label="next slide" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)}>
          ›
        </button>

        <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(totalSlides).keys()].map((index) => (
            <li key={index} className={`dot ${currentSlide === index ? "bg-gray-800" : "bg-gray-400"} w-3 h-3 rounded-full`} />
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


