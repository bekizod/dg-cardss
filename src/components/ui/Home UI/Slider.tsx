"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Image data stored in an array of objects
const imageData = [
  {
    href: "/SA_en/televisions/tv.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/TV-EN_1.jpg",
    alt: "TV Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Green-02-EN.jpg",
    alt: "National Day Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/clearance-offer.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Clearance-EN.jpg",
    alt: "Clearance Offer",
  },
  {
    href: "/SA_en/large-home-appliances/air-conditioners.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/AC-Banner-EN.jpg",
    alt: "Air Conditioners Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-thermos.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Trams-EN.jpg",
    alt: "Thermos Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-appliances.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/SDA-EN.jpg",
    alt: "Appliances Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-kitchenware.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Cooking-_-serveware-EN_1.jpg",
    alt: "Kitchenware Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/large-appliances-offers.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/MDA-EN_1.jpg",
    alt: "Large Appliances Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/cooling-offers.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Ref-EN.jpg",
    alt: "Cooling Appliances Offer",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/wixsana.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Wixana-EN.jpg",
    alt: "Wixana Offer",
  },
];


export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = imageData.length;

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
      <div className="carousel-root">
        <div className="carousel carousel-slider" style={{ width: "100%" }}>
          <motion.div className="relative rounded-2xl w-full flex overflow-hidden">
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
              {imageData.map((image, index) => (
                <motion.li key={index} className="flex-shrink-0 w-full">
                  <Link href={image.href}>
                    <Image src={image.src} alt={image.alt} layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <button aria-label="previous slide" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-green-700 p-2 rounded-full" onClick={handlePrevSlide}>
            ‹
          </button>

          <button aria-label="next slide" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-green-700 p-2 rounded-full" onClick={handleNextSlide}>
            ›
          </button>

          <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {imageData.map((_, index) => (
              <li key={index} className={`dot ${currentSlide === index ? "bg-green-500" : "bg-white"} w-2 h-2 rounded-full cursor-pointer`} onClick={() => goToSlide(index)} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
