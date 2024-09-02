import { FC, useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  {
    href: "/SA_en/40-2200.html",
    discountLabel: "50% OFF",
    imageSrc: "https://pwa-cdn.alsaifgallery.com/media/catalog/product/cache/b703357423ed99b4488b77e979847b90/_/6/_6_2_6285360069445_1_.jpg?width=200",
    alt: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    name: "خبازة إديسون الكهربائية قرص تحكم 40سم رمادي 2200 واط بفتحتين",
    brand: "خبازة",
    finalPrice: "265 SAR",
    regularPrice: "529 SAR",
    save: "264 SAR",
  },
  // Add other products here...
];

const ProductCarousel: FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: MouseEvent) => {
    if (carouselRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - carouselRef.current.offsetLeft);
      setScrollLeft(carouselRef.current.scrollLeft);
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && carouselRef.current) {
      const x = e.pageX - carouselRef.current.offsetLeft;
      const walk = (x - startX) * 2; // Adjust scrolling speed
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={carouselRef}
      className="relative flex gap-2 overflow-x-auto cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setIsDragging(false)}
    >
      <motion.div className="flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {products.map((product, index) => (
          <div key={index} className="relative w-64 flex-shrink-0">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Link href={product.href} passHref>
               
                  <Image
                    src={product.imageSrc}
                    alt={product.alt}
                    width={200}
                    height={200}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <p className="text-sm font-semibold text-red-500">{product.discountLabel}</p>
                  <h2 className="mt-2 text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600">{product.brand}</p>
                  <div className="mt-2">
                    <p className="text-xl font-bold text-green-500">{product.finalPrice}</p>
                    <p className="text-sm line-through text-gray-500">{product.regularPrice}</p>
                    <p className="text-sm text-red-500">SAVE {product.save}</p>
                  </div>
                  <button className="mt-2 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Add to Cart</button>
                
              </Link>
            </div>
          </div>
        ))}
      </motion.div>
      <button className="absolute top-1/2 -translate-y-1/2 left-2 p-2 bg-gray-800 text-white rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button className="absolute top-1/2 -translate-y-1/2 right-2 p-2 bg-gray-800 text-white rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>
    </div>
  );
};

export default ProductCarousel;
