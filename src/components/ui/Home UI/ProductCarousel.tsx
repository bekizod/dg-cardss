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
    <div className="relative ">
      <div ref={carouselRef} className="flex gap-2 overflow-x-auto scroll-smooth select-none scrollbar-hide">
        <motion.div className="flex gap-2 py-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          {products.map((product, index) => (
            <div key={index} className="relative w-64 flex-shrink-0">
              <div className="bg-white  p-4 rounded-lg shadow-lg" data-href={product.href}>
                <Link href={product.href} passHref>
                  <div onMouseDown={(e) => e.preventDefault()} onClick={(e) => e.preventDefault()}>
                    <Image src={product.imageSrc} alt={product.alt} width={200} height={200} loading="eager" fetchPriority="high" className="w-full h-auto rounded-xl object-cover" />
                    <p className="absolute top-0 right-0  bg-[var(--color-primary)] text-white text-xs sm:text-sm font-bold text-center p-1 sm:p-2 rounded-bl-lg rounded-tr-lg z-20">{product.discountLabel}</p>
                    <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600">{product.brand}</p>
                    <div className="mt-2">
                      <p className="text-xl font-bold text-green-500">{product.finalPrice}</p>
                      <p className="text-sm line-through text-gray-500">{product.regularPrice}</p>
                      <p className="text-sm text-red-500">SAVE {product.save}</p>
                    </div>
                    <button className="mt-2 w-full py-2  bg-[var(--color-primary)] text-white rounded-lg hover: bg-[var(--color-primary)]">Add to Cart</button>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      <button className="absolute top-1/2 -translate-y-1/2 left-2 p-2  bg-[var(--color-primary)] text-white rounded-full" onClick={() => handleNavigation(-1)} disabled={currentIndex === 0}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button className="absolute top-1/2 -translate-y-1/2 right-2 p-2  bg-[var(--color-primary)] text-white rounded-full" onClick={() => handleNavigation(1)} disabled={currentIndex === products.length - 1}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCarousel;


