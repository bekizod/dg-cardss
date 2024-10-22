"use client"; // Ensures this component is client-side

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ScrollableBanner() {
  const banners = [
    { href: "/SA_en/large-home-appliances/air-conditioners.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Air-conditioners_3.png", alt: "banner 0" },
    { href: "/SA_en/serveware/thermos-ones.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Thermos.png", alt: "banner 1" },
    { href: "/SA_en/electrical-appliances/air-fryers.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Air-Fryers_1.png", alt: "banner 2" },
    { href: "/SA_en/serveware/thermos-sets-alsaifgallery.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Thermos-Set.png", alt: "banner 3" },
    { href: "/SA_en/electrical-appliances/mixers-123.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Kneading-Machines_1.png", alt: "banner 4" },
    { href: "/SA_en/serveware/dinnerware-sets.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Dinnerware-Sets.png", alt: "banner 5" },
    { href: "/SA_en/electrical-appliances/pressure-cookers.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Pressure-Cookers_1.png", alt: "banner 6" },
    { href: "/SA_en/kitchenware/pot-1.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Pots-Web-EN.png", alt: "banner 7" },
    { href: "/SA_en/electrical-appliances/ovens-microwaves.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Ovens-Microwaves.png", alt: "banner 8" },
    { href: "/SA_en/serveware/traies.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Traies.png", alt: "banner 9" },
    { href: "/SA_en/electrical-appliances/electric-bakers.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Bread-Makers_1.png", alt: "banner 10" },
  ];
const banners2 = [
  { href: "/SA_en/electrical-appliances/food-chopper.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Grinder.png", alt: "banner 0" },
  { href: "/SA_en/electrical-appliances/sandwich-waffle-maker.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Waffle-_-Sandwich-Maker.png", alt: "banner 1" },
  { href: "/SA_en/electrical-appliances/electric-kettles.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Kettle.png", alt: "banner 2" },
  { href: "/SA_en/kitchenware/cake-mould-ovenpan.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Cake-Pans-_-Baking-Trays.png", alt: "banner 3" },
  { href: "/SA_en/electrical-appliances/stove.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Electric-Stoves.png", alt: "banner 4" },
  { href: "/SA_en/electrical-appliances/grill.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Grills.png", alt: "banner 5" },
  { href: "/SA_en/serveware/teaset.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Teaset.png", alt: "banner 6" },
  { href: "/SA_en/serveware/incense-holders.html", src: "https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Incense-Holders.png", alt: "banner 7" }
];

  const itemsPerSlide = 6;
  const totalSlides = Math.ceil(banners.length / itemsPerSlide);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Group banners into slides
  const slides = Array.from({ length: totalSlides }, (_, slideIndex) => banners.slice(slideIndex * itemsPerSlide, (slideIndex + 1) * itemsPerSlide));

  return (
    <div className="relative w-full overflow-hidden rounded-2xl">
      <motion.div className="relative flex overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
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
          {slides.map((slide, slideIndex) => (
            <motion.li key={slideIndex} className="flex-shrink-0 w-full flex">
              {slide.map((banner, bannerIndex) => (
                <div key={bannerIndex} className="flex-shrink-0 w-1/6 p-1">
                  <Link href={banner.href}>
                    <Image src={banner.src} alt={banner.alt} width={120} height={120} priority fetchPriority="high" className="rounded-2xl" />
                  </Link>
                </div>
              ))}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
      <button aria-label="previous slide" className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides)}>
        ‹
      </button>
      <button aria-label="next slide" className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full" onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides)}>
        ›
      </button>
      <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {[...Array(totalSlides).keys()].map((index) => (
          <li key={index} className={`w-3 h-3 rounded-full ${currentSlide === index ? " bg-[var(--color-primary)]" : "bg-gray-200"}`} />
        ))}
      </ul>
    </div>
  );
}
