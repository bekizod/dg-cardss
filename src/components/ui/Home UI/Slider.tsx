"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

type Advertisement = {
  _id: string;
  imageId: { data: string };
  bannerLink: string;
  translatedImageId: { data: string };
  parentCategoryId?: { categoryName: string; _id: string };
  subCategoryId?: { categoryName: string; _id: string };
};

export default function Slider({ isRTL }: { isRTL: boolean }) {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Fetch advertisements
  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const response = await fetch(
          "https://alsaifgallery.onrender.com/api/v1/advertisement/getSampleAdd"
        );
        const data = await response.json();
        if (response.ok) {
          setAdvertisements(data.data || []);
        } else {
          console.error("Failed to fetch advertisements:", data.message);
        }
      } catch (error) {
        console.error("Error fetching advertisements:", error);
      }
    };

    fetchAdvertisements();
  }, []);

  // Automatic slide transition
  useEffect(() => {
    const startAutoSlide = () => {
      if (advertisements.length <= 1) return;

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % advertisements.length);
      }, 3000);
    };

    if (!isDragging) startAutoSlide();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [advertisements, isDragging]);

  // Navigation handlers
  const goToSlide = (index: number) => {
    resetAutoSlide();
    setCurrentSlide(index);
  };

  const handlePrevSlide = () => {
    resetAutoSlide();
    setCurrentSlide(
      (prev) => (prev - 1 + advertisements.length) % advertisements.length
    );
  };

  const handleNextSlide = () => {
    resetAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % advertisements.length);
  };

  const resetAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    resetAutoSlide();
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
      handleNextSlide(); // Swiped left - go to next
    } else if (diff < -threshold) {
      handlePrevSlide(); // Swiped right - go to previous
    }
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);
    resetAutoSlide();
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
      handleNextSlide();
    } else if (diff < -threshold) {
      handlePrevSlide();
    }
  };

  // Calculate transform for natural swipe
  const getTransform = () => {
    if (!isDragging) {
      return isRTL
        ? `translateX(${currentSlide * 100}%)`
        : `translateX(-${currentSlide * 100}%)`;
    }

    const diff = currentX - startX;
    const direction = isRTL ? -1 : 1;
    const offset = diff * direction;

    return isRTL
      ? `translateX(calc(${currentSlide * 100}% + ${offset}px))`
      : `translateX(calc(-${currentSlide * 100}% + ${offset}px))`;
  };

  return (
    <div className="relative w-full select-none touch-none">
      <div
        className="carousel-root"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="relative rounded-2xl w-full overflow-hidden">
          <div
            className="flex"
            style={{
              width: "100%",
              transform: getTransform(),
              transition: isDragging ? "none" : "transform 0.35s ease-out",
            }}
          >
            {advertisements.map((ad, index) => (
              <div key={ad._id} className="flex-shrink-0 w-full">
                <div
                  onClick={() => {
                    const diff = Math.abs(startX - currentX);
                    const threshold = 10;
                    if (diff < threshold) {
                      window.location.href = `/singleProduct/${ad?.parentCategoryId?.categoryName}/${ad?.parentCategoryId?._id}/${ad?.subCategoryId?.categoryName}/${ad?.subCategoryId?._id}`;
                    }
                  }}
                  className="block w-full cursor-pointer"
                  draggable={false}
                >
                  <div className="relative w-full lg:h-[500px]">
                    <Image
                      src={
                        isRTL && ad.translatedImageId?.data
                          ? ad.translatedImageId?.data
                          : ad.imageId?.data 
                      }
                      alt={`Slide ${index + 1}`}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-cover rounded-2xl pointer-events-none"
                      draggable={false}
                      priority={index === 0}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        {advertisements.length > 1 && (
          <>
            <button
              onClick={handlePrevSlide}
              className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10 hover:bg-black/50"
              aria-label="Previous slide"
            >
              <span className="text-xl">‹</span>
            </button>
            <button
              onClick={handleNextSlide}
              className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white p-2 rounded-full z-10 hover:bg-black/50"
              aria-label="Next slide"
            >
              <span className="text-xl">›</span>
            </button>
          </>
        )}

        {/* Dots indicator */}
        {advertisements.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {advertisements.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
          h-2 rounded-full transition-all duration-300 ease-in-out
          ${
            currentSlide === index
              ? "w-6 bg-primary shadow-md scale-105"
              : "w-2 bg-gray-300 hover:bg-gray-400"
          }
        `}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
