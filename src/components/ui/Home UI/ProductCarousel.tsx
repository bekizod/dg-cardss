import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
const products = [
  {
    href: "/SA_en/6285360150099.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/6/2/6285360150099-1.jpg?width=200",
    alt: "إديسون قدر ضغط كهربائي برو بوعاء جرانيت بيد 6 لتر 1000 واط product image",
    name: "إديسون قدر ضغط كهربائي برو بوعاء جرانيت بيد 6 لتر 1000 واط",
    brand: "إديسون",
    finalPrice: "250 SAR",
    regularPrice: "499 SAR",
    save: "SAVE 249 SAR"
  },
  {
    href: "/SA_en/6285360150100.html",
    discountLabel: "30% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/6/2/6285360150100-1.jpg?width=200",
    alt: "إديسون محضر طعام كهربائي بوعاء زجاجي 1.5 لتر 600 واط product image",
    name: "إديسون محضر طعام كهربائي بوعاء زجاجي 1.5 لتر 600 واط",
    brand: "إديسون",
    finalPrice: "150 SAR",
    regularPrice: "215 SAR",
    save: "SAVE 65 SAR"
  },
  {
    href: "/SA_en/6285360150101.html",
    discountLabel: "40% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/6/2/6285360150101-1.jpg?width=200",
    alt: "إديسون خلاط كهربائي بوعاء بلاستيكي 2 لتر 700 واط product image",
    name: "إديسون خلاط كهربائي بوعاء بلاستيكي 2 لتر 700 واط",
    brand: "إديسون",
    finalPrice: "120 SAR",
    regularPrice: "200 SAR",
    save: "SAVE 80 SAR"
  },
  {
    href: "/SA_en/6285360150102.html",
    discountLabel: "20% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/6/2/6285360150102-1.jpg?width=200",
    alt: "إديسون غلاية كهربائية 1.7 لتر 1800 واط product image",
    name: "إديسون غلاية كهربائية 1.7 لتر 1800 واط",
    brand: "إديسون",
    finalPrice: "90 SAR",
    regularPrice: "112 SAR",
    save: "SAVE 22 SAR"
  },
  {
    href: "/SA_en/6285360150103.html",
    discountLabel: "10% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/6/2/6285360150103-1.jpg?width=200",
    alt: "إديسون ماكينة قهوة كهربائية 1.2 لتر 850 واط product image",
    name: "إديسون ماكينة قهوة كهربائية 1.2 لتر 850 واط",
    brand: "إديسون",
    finalPrice: "110 SAR",
    regularPrice: "122 SAR",
    save: "SAVE 12 SAR"
  },
  {
    href: "/SA_en/6285360150104.html",
    discountLabel: "25% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/6/2/6285360150104-1.jpg?width=200",
    alt: "إديسون مقلاة كهربائية 1.5 لتر 900 واط product image",
    name: "إديسون مقلاة كهربائية 1.5 لتر 900 واط",
    brand: "إديسون",
    finalPrice: "130 SAR",
    regularPrice: "175 SAR",
    save: "SAVE 45 SAR"
  }
];

const ProductCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (direction: number) => {
    const newIndex = currentIndex + direction;
    if (newIndex >= 0 && newIndex < products.length && carouselRef.current) {
      setCurrentIndex(newIndex);
      carouselRef.current.scrollTo({
        left: carouselRef.current.clientWidth * newIndex,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <div ref={carouselRef} className="flex gap-2 overflow-x-auto scroll-smooth select-none scrollbar-hide">
        <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {products.map((product, index) => (
            <motion.div key={index} className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg dark:shadow-gray-700 overflow-hidden" whileHover={{ y: -3, transition: { duration: 0.3 } }}>
              <Link href="/SA_en/edison-electric-bakery-controller-disc-40-cm-brown-2200-w-2-slots.html">
                <div className="block relative p-2 sm:p-3 md:p-4">
                  <p className="absolute top-0 right-0 bg-green-500 text-white text-xs sm:text-sm font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">
                    50% <br /> OFF
                  </p>
                  <div className="w-full flex justify-center items-center bg-transparent">
                    <motion.div whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}>
                      <Image id="CAT17-001181" src="/side cards/side Best Categories/BC01.png" alt="Edison Electric Bakery, Controller Disc 40 cm Brown 2200 W, 2-Slots product image" width={150} height={100} loading="eager" fetchPriority="high" className="w-full h-auto object-contain rounded-xl" />
                    </motion.div>
                  </div>
                  <h2 className="font-semibold mt-1 text-center text-gray-900 text-xs sm:text-sm dark:text-gray-100">Edison Electric Bakery, Controller Disc 40 cm Brown 2200 W, 2-Slots</h2>
                  <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center">Edison</p>
                  <div className="mt-1 text-center">
                    <p className="text-sm sm:text-base font-bold text-red-500">244 SAR</p>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">488 SAR</p>
                    <p className="text-xs text-green-500">SAVE 244 SAR</p>
                  </div>
                  <motion.button whileTap={{ scale: 0.95 }} className="mt-2 w-full bg-green-500 dark:bg-green-700 text-white font-bold text-xs sm:text-sm py-1 sm:py-2 rounded-xl">
                    Add to Cart
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <button className="absolute top-1/2 -translate-y-1/2 left-2 p-2 bg-green-500 text-white rounded-full" onClick={() => handleNavigation(-1)} disabled={currentIndex === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-green-500 text-white rounded-full" onClick={() => handleNavigation(1)} disabled={currentIndex === products.length - 1}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCarousel;


