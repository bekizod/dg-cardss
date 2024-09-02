import { motion } from "framer-motion";
import Image from "next/image";

export default function BannerCarousel() {
  return (
    <div className="container mx-auto">
      <div className="flex gap-2">
        {/* Carousel Section */}
        <div className="relative w-full">
          <div className="relative">
            <motion.div className="overflow-hidden" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <ul className="flex transition-transform duration-350" style={{ transform: "translate3d(-100%, 0, 0)" }}>
                <li className="slide selected previous">
                  <div>
                    <a href="/SA_en/electrical-appliances/air-fryers.html" className="block">
                      <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_21.jpg" alt="slide 0" loading="eager" fetchPriority="high" width={500} height={500} className="w-full" />
                    </a>
                  </div>
                </li>
                {/* Add more slides as needed */}
              </ul>
            </motion.div>
            <button aria-label="previous slide / item" className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2" disabled>
              Prev
            </button>
            <button aria-label="next slide / item" className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2" disabled>
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Banner Section */}
      <div className="flex gap-2 mt-4">
        <div className="w-full">
          <a href="/SA_en/electrical-appliances/pressure-cookers.html" className="block">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/eng_-_-_1.jpg" alt="banner" loading="eager" fetchPriority="high" width={1000} height={500} className="w-full" />
          </a>
        </div>
      </div>
      {/* Repeat for other banners */}
    </div>
  );
}
