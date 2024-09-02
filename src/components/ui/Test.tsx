"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const slides = [
  {
    href: "/SA_en/alsaif-gallery-offers/wixsana.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Wixana-EN.jpg",
    alt: "slide 6",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Green-02-EN.jpg",
    alt: "slide 0",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-thermos.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Trams-EN.jpg",
    alt: "slide 1",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-appliances.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/SDA-EN.jpg",
    alt: "slide 2",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-kitchenware.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Cooking-_-serveware-EN_1.jpg",
    alt: "slide 3",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/large-appliances-offers.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/MDA-EN_1.jpg",
    alt: "slide 4",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/cooling-offers.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Ref-EN.jpg",
    alt: "slide 5",
  },
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(3);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="carousel-root w-full overflow-hidden relative">
      <div className="carousel-slider flex items-center">
        <motion.div className="slider-wrapper flex" initial={{ x: `-${currentSlide * 100}%` }} animate={{ x: `-${currentSlide * 100}%` }} transition={{ duration: 0.35 }}>
          {slides.map((slide, index) => (
            <div key={index} className="slide flex-shrink-0 w-full">
              <Link href={slide.href}>
                <Image src={slide.src} alt={slide.alt} width={1920} height={1080} className="w-full" priority />
              </Link>
            </div>
          ))}
        </motion.div>
        <button type="button" aria-label="previous slide" className="control-arrow control-prev absolute left-0 p-2 bg-gray-600 text-white disabled:opacity-50" onClick={prevSlide} disabled={currentSlide === 0}>
          Previous
        </button>
        <button type="button" aria-label="next slide" className="control-arrow control-next absolute right-0 p-2 bg-gray-600 text-white disabled:opacity-50" onClick={nextSlide} disabled={currentSlide === slides.length - 1}>
          Next
        </button>
      </div>
      <ul className="control-dots flex justify-center mt-4">
        {slides.map((_, index) => (
          <li key={index} className={`dot mx-1 cursor-pointer ${index === currentSlide ? "selected" : ""}`} onClick={() => setCurrentSlide(index)}>
            <button type="button" className="w-4 h-4 rounded-full bg-gray-400 hover:bg-gray-700" aria-label={`slide item ${index + 1}`} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carousel;
