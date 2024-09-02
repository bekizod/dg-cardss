"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 7; // Number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [totalSlides]);

  // Function to handle slide change
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  // Function to handle previous slide
  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Function to handle next slide
  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  return (
    <div className="relative w-full">
      <div className="">
        <div className="">
          <div className="carousel-root">
            <div className="carousel carousel-slider" style={{ width: "100%" }}>
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
                    <Link href="/SA_en/alsaif-gallery-offers/wixsana.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Wixana-EN.jpg" alt="slide 6" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/national-day.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Green-02-EN.jpg" alt="slide 0" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/national-day-thermos.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Trams-EN.jpg" alt="slide 1" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/national-day-appliances.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/SDA-EN.jpg" alt="slide 2" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/national-day-kitchenware.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Cooking-_-serveware-EN_1.jpg" alt="slide 3" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/large-appliances-offers.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/MDA-EN_1.jpg" alt="slide 4" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/cooling-offers.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Ref-EN.jpg" alt="slide 5" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                  <motion.li className="flex-shrink-0 w-full">
                    <Link href="/SA_en/alsaif-gallery-offers/wixsana.html">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Wixana-EN.jpg" alt="slide 6" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                </motion.ul>
              </motion.div>
              <button aria-label="previous slide / item" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full" onClick={handlePrevSlide}>
                ‹
              </button>
              <button aria-label="next slide / item" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-gray-800 p-2 rounded-full" onClick={handleNextSlide}>
                ›
              </button>
              <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[...Array(totalSlides).keys()].map((index) => (
                  <li key={index} className={`dot ${currentSlide === index ? "bg-gray-800" : "bg-gray-400"} w-3 h-3 rounded-full`} onClick={() => goToSlide(index)} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
