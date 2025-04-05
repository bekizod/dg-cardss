"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ImageSlider = ({
  images,
  discount,
}: {
  images: string[];
  discount: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();
  const { currentLocale } = useSelector((state: RootState) => state.locale);

  // Navigation handlers
  const goToSlide = (index: number) => {
    resetAutoSlide();
    setCurrentIndex(index);
  };

  const goToNext = () => {
    resetAutoSlide();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToPrev = () => {
    resetAutoSlide();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  useEffect(() => {
    console.log("Locale changed:", currentLocale);
  }, [currentLocale]);
  useEffect(() => {
    const startAutoSlide = () => {
      if (images?.length <= 1) return;
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }, 3000);
    };

    if (!isDragging) startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images, isDragging]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    resetAutoSlide();
    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const diff = startX - currentX;
    const threshold = 25;

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrev();
    }

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.35s ease-out";
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    resetAutoSlide();
    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const diff = startX - currentX;
    const threshold = 25;

    if (diff > threshold) {
      goToNext();
    } else if (diff < -threshold) {
      goToPrev();
    }

    if (sliderRef.current) {
      sliderRef.current.style.transition = "transform 0.35s ease-out";
    }
  };

  // Calculate transform based on RTL/LTR
  const getTransform = () => {
    if (!isDragging) {
      return `translateX(${currentLocale === "ar" ? "+" : "-"}${
        currentIndex * 100
      }%)`;
    }

    const diff = currentX - startX;
    const offset = (diff / window.innerWidth) * 100;
    const maxOffset = 30;
    const boundedOffset = Math.max(-maxOffset, Math.min(maxOffset, offset));

    return `translateX(calc(${currentLocale === "ar" ? "+" : "-"}${
      currentIndex * 100
    }% ${currentLocale === "ar" ? "-" : "+"} ${boundedOffset}px))`;
  };

  return (
    <div
      className={` w-full flex ${
        currentLocale == "ar" ? "flex-row-reverse" : "flex-row"
      }  gap-4`}
    >
      {/* Thumbnails */}
      {images?.length > 1 && (
        <div
          className={`flex flex-col gap-2 overflow-y-auto max-h-[100%] w-20 ${
            currentLocale === "ar" ? "items-start" : "items-end"
          }`}
        >
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-full aspect-square rounded-md border-2 overflow-hidden transition-all ${
                currentIndex === index ? "border-primary" : ""
              }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              <Image
                src={img}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={100}
                className="object-cover w-full h-full"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Slider */}
      <div className="relative flex-1 overflow-hidden border rounded-lg aspect-square">
        {discount && discount > 0 && (
          <div
            className={`absolute ${
              currentLocale === "ar"
                ? "top-0 right-0 rounded-tr-lg rounded-bl-lg"
                : "top-0 left-0  rounded-tl-lg rounded-br-lg"
            } bg-red-500/90 text-white text-sm font-semibold px-2 py-1 z-10 shadow-md`}
          >
            -{discount}%
          </div>
        )}

        <div
          ref={sliderRef}
          className="flex h-full w-full select-none touch-none"
          style={{
            transform: getTransform(),
            transition: isDragging ? "none" : "transform 0.35s ease-out",
            direction: currentLocale === "ar" ? "rtl" : "ltr",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {images?.map((img, index) => (
            <div
              key={index}
              className="min-w-full flex items-center justify-center p-4"
              style={{ direction: "ltr" }} // Reset direction for image content
            >
              <Image
                src={img}
                alt={`Slide ${index + 1}`}
                width={900}
                height={900}
                className="object-contain h-full w-full pointer-events-none"
                draggable={false}
                priority={index === currentIndex}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <button
              onClick={goToPrev}
              className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10 hover:bg-black/50"
              aria-label="Previous slide"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d={
                    currentLocale === "ar" ? "M9 18l6-6-6-6" : "M15 18l-6-6 6-6"
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10 hover:bg-black/50"
              aria-label="Next slide"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
                <path
                  d={
                    currentLocale === "ar" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
