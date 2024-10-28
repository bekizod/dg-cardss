"use client"; // Ensures this component is client-side

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Advertisement = {
  _id: string;
  imageId: { data: string };
  bannerLink: string;
  parentCategoryId?: { categoryName: string };
  subCategoryId?: { categoryName: string };
};

export default function Slider() {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = advertisements.length;

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch("https://alsaifgallery.onrender.com/api/v1/advertisement/getSampleAdd");
        const data = await response.json();
        if (response.ok) {
          setAdvertisements(data.data);
        } else {
          console.error("Failed to fetch advertisements:", data.message);
        }
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();

    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const goToSlide = (slideIndex: number) => setCurrentSlide(slideIndex);
  const handlePrevSlide = () => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  const handleNextSlide = () => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);

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
              {advertisements.map((ad, index) => (
                <motion.li key={ad._id} className="flex-shrink-0 w-full">
                  <Link href={ad.bannerLink || "#"}>
                    <div className="relative w-full h-[500px]"> {/* Fixed height here */}
                      <Image
                        src={ad.imageId?.data || ""}
                        alt={`Slide ${index + 1} - ${ad.parentCategoryId?.categoryName || "Advertisement"}`}
                        layout="fill"
                        objectFit="cover"  // Ensures the image covers the container without stretching
                        className="rounded-2xl border border-gray-300"
                      />
                    </div>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <button
            aria-label="previous slide"
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full"
            onClick={handlePrevSlide}
          >
            ‹
          </button>

          <button
            aria-label="next slide"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full"
            onClick={handleNextSlide}
          >
            ›
          </button>

          <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {advertisements.map((_, index) => (
              <li
                key={index}
                className={`w-2 h-2 rounded-full cursor-pointer ${currentSlide === index ? " bg-[var(--color-primary)]" : "bg-white"}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
