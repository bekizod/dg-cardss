"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Sample image data for the slider
const sliderImages = [
  {
    href: "/SA_en/alsaif-gallery-offers/wixsana.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Wixana-EN.jpg",
    alt: "slide 1",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Green-02-EN.jpg",
    alt: "slide 2",
  },
  {
    href: "/SA_en/alsaif-gallery-offers/national-day-thermos.html",
    src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Trams-EN.jpg",
    alt: "slide 3",
  },
  // Add more items here...
];

const Countdown = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    second: 0,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = sliderImages.length; // Total slides based on image data

  useEffect(() => {
    const targetDate = new Date("2024-12-31T23:59:59");

    const countdownInterval = setInterval(() => {
      const now = new Date();
      const timeLeft = targetDate.getTime() - now.getTime();

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const second = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTime({ days, hours, minutes, second });
      } else {
        clearInterval(countdownInterval);
      }
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => setCurrentSlide(slideIndex);
  const handlePrevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  const handleNextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);

  const containerAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: 0.2, type: "spring", stiffness: 100 },
  };

  const numberAnimation = {
    initial: { scale: 0.5, rotate: 90, opacity: 0 },
    animate: { scale: 1, rotate: 0, opacity: 1, transition: { duration: 0.5, type: "spring", stiffness: 120 } },
    exit: { scale: 0.5, rotate: -90, opacity: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col shadow-lg my-3 items-center border bg-gray-200 dark:bg-slate-800 border-[var(--color-primary)] rounded-2xl justify-center w-full ">
      <motion.div className="text-center pt-3" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
        <h2 className="text-2xl lg:text-2xl font-bold text-[var(--color-primary)]">
          Offers Available{"   "}
          <motion.span className="inline-block cursor-pointer" initial={{ opacity: 1, x: -50 }} animate={{ opacity: 1, x: ["10%", "-9%", "15%", "-8%", "10%", "10%"], transition: { duration: 4, repeat: Infinity, repeatType: "loop" } }}>
            View All
          </motion.span>
        </h2>
      </motion.div>

      {/* Countdown Timer */}
      <div className="flex flex-wrap sm:flex-nowrap items-center justify-evenly w-full py-6 gap-2 sm:gap-4">
        {["days", "hours", "minutes", "second"].map((unit, index) => (
          <motion.div key={unit} className="timer w-full max-w-[60px] sm:max-w-[80px] md:max-w-[150px] flex justify-center" variants={containerAnimation} initial="initial" animate="animate">
            <div className="rounded-xl bg-gradient-to-b shadow-lg from-[var(--color-primary)] to-green-300 py-2 w-full flex items-center justify-center flex-col gap-1 aspect-square px-1 sm:px-2">
              <AnimatePresence mode="wait">
                <motion.h3 key={unit + time[unit as keyof typeof time]} className="countdown-element font-manrope font-semibold text-lg sm:text-xl md:text-2xl text-white text-center" variants={numberAnimation} initial="initial" animate="animate" exit="exit">
                  {time[unit as keyof typeof time]}
                </motion.h3>
              </AnimatePresence>
              <p className="text-sm  sm:text-base md:text-lg font-manrope font-normal text-white mt-1 text-center w-full capitalize">{unit}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Image Slider */}
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
                {sliderImages.map((image, index) => (
                  <motion.li key={index} className="flex-shrink-0 w-full">
                    <Link href={image.href}>
                      <Image src={image.src} alt={image.alt} layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
            <button aria-label="previous slide" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-[var(--color-primary)] p-2 rounded-full" onClick={handlePrevSlide}>
              ‹
            </button>
            <button aria-label="next slide" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-[var(--color-primary)] p-2 rounded-full" onClick={handleNextSlide}>
              ›
            </button>
            <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[...Array(totalSlides).keys()].map((index) => (
                <li key={index} className={`dot ${currentSlide === index ? " bg-[var(--color-primary)]" : "bg-white"} w-2 h-2 rounded-full`} onClick={() => goToSlide(index)} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
