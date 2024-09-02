"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Serveware() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 2; // Number of slides

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [totalSlides]);

  return (
    <div className="flex flex-wrap gap-4 py-10 px-4">
      {/* Slider Section */}
      <motion.div className="relative w-full overflow-hidden rounded-2xl border border-gray-300" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <motion.div className="relative w-full" style={{ display: "flex", overflow: "hidden" }}>
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
            <motion.li className="flex-shrink-0 w-full">
              <a href="/SA_en/serveware/sweeteners-section.html" className="block">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-_ENG_1.jpg" alt="slide 1" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </a>
            </motion.li>
            <motion.li className="flex-shrink-0 w-full">
              <a href="/SA_en/serveware/serveware-set.html" className="block">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-_-ENG.jpg" alt="slide 0" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" fetchPriority="high" />
              </a>
            </motion.li>
          </motion.ul>
        </motion.div>
      </motion.div>

      {/* Other sections */}
      <div className="w-full">
        <h2 className="text-left text-lg font-bold">
          <span>Get it Now</span>
        </h2>
      </div>

      <div className="relative w-full rounded-2xl border border-gray-300 overflow-hidden">
        <a href="/SA_en/serveware/dallah-teapots.html" className="block">
          <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-eng.jpg" alt="banner" layout="responsive" width={500} height={150} priority className="rounded-2xl" fetchPriority="high" />
        </a>
      </div>

      <div className="w-full">
        <h2 className="text-left text-lg font-bold">
          <span>Hospitality Basics</span>
        </h2>
      </div>

      <div className="flex gap-4">
        <div className="w-1/3 p-2">
          <a href="/SA_en/serveware/dallah-teapots.html" className="block">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_7.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl border border-gray-300" priority fetchPriority="high" />
          </a>
        </div>
        <div className="w-1/3 p-2">
          <a href="/SA_en/serveware/cups.html" className="block">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_71.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl border border-gray-300" priority fetchPriority="high" />
          </a>
        </div>
        <div className="w-1/3 p-2">
          <a href="/SA_en/serveware/thermos-ones.html" className="block">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_72.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl border border-gray-300" priority fetchPriority="high" />
          </a>
        </div>
      </div>

      {/* Repeated sections... */}
      
      <div className="w-full">
        <h2 className="text-left text-lg font-bold">
          <span>Create your hospitality</span>
        </h2>
      </div>

      <div className="w-full">
        <a href="/SA_en/serveware/thermos-sets-alsaifgallery.html" className="block">
          <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_--eng_31.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl border border-gray-300" />
        </a>
      </div>

      <div className="w-full">
        <h2 className="text-left text-lg font-bold">
          <span>For your table</span>
        </h2>
      </div>

      <div className="w-full">
        <a href="/SA_en/serveware/dinnerware-sets.html" className="block">
          <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_42.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl border border-gray-300" />
        </a>
      </div>

      <div className="w-full">
        <a href="/SA_en/serveware/incense-holders.html" className="block">
          <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/428-x-150--_-3-copy_1_.gif" alt="banner" layout="responsive" width={500} height={150} loading="lazy" fetchPriority="low" className="rounded-2xl border border-gray-300" />
        </a>
      </div>

      <div className="w-full">
        <h2 className="text-left text-lg font-bold">
          <span>Best Food Warmer</span>
        </h2>
      </div>

      <div className="w-full">
        <a href="/SA_en/serveware/food-warmers.html" className="block">
          <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_10.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchPriority="low" className="rounded-2xl border border-gray-300" />
        </a>
      </div>
    </div>
  );
}



















// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function Serveware(){
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const totalSlides = 2; // Number of slides

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
//     }, 3000); // Change slide every 3 seconds

//     return () => clearInterval(interval); // Clean up interval on component unmount
//   }, [totalSlides]);

//   return (
//     <div className="flex flex-wrap w-full gap-4 py-10">
//       {/* Slider Section */}
//       <motion.div className="relative w-full overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
//         <motion.div className="relative w-full" style={{ display: "flex", overflow: "hidden" }}>
//           <motion.ul
//             className="flex"
//             style={{
//               display: "flex",
//               width: "100%",
//               padding: 0,
//               margin: 0,
//               transition: "transform 0.35s ease-in-out",
//               transform: `translateX(-${currentSlide * 100}%)`,
//             }}
//           >
//             <motion.li className="flex-shrink-0 w-full">
//               <a href="/SA_en/serveware/sweeteners-section.html" className="block">
//                 <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-_ENG_1.jpg" alt="slide 1" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" />
//               </a>
//             </motion.li>
//             <motion.li className="flex-shrink-0 w-full">
//               <a href="/SA_en/serveware/serveware-set.html" className="block">
//                 <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-_-ENG.jpg" alt="slide 0" layout="responsive" width={500} height={300} priority className="rounded-2xl border border-gray-300" />
//               </a>
//             </motion.li>
//           </motion.ul>
//         </motion.div>
//       </motion.div>

//       {/* Other sections */}
//       <div className="w-full">
//         <h2 className="text-left text-lg font-bold">
//           <span>Get it Now</span>
//         </h2>
//       </div>

//       <div className="relative w-full">
//         <a href="/SA_en/serveware/dallah-teapots.html" className="block">
//           <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/__-eng.jpg" alt="banner" layout="responsive" width={500} height={150} priority className="rounded-2xl border border-gray-300" />
//         </a>
//       </div>

//       <div className="w-full">
//         <h2 className="text-left text-lg font-bold">
//           <span>Hospitality Basics</span>
//         </h2>
//       </div>

//       <div className="flex gap-2.5 w-full">
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/dallah-teapots.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_7.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/cups.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_71.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/thermos-ones.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_72.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//       </div>
//       <div className="flex gap-2.5 w-full">
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/dallah-teapots.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_7.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/cups.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_71.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/thermos-ones.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_72.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//       </div>
//       <div className="flex gap-2.5 w-full">
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/dallah-teapots.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_7.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/cups.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_71.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/thermos-ones.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_72.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//       </div>
//       <div className="flex gap-2.5 w-full">
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/dallah-teapots.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-ENG_7.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/cups.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_71.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//         <div className="w-1/3">
//           <a href="/SA_en/serveware/thermos-ones.html" className="block ">
//             <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_72.jpg" alt="banner" layout="responsive" width={500} height={300} className="rounded-2xl" priority />
//           </a>
//         </div>
//       </div>

//       <div className="w-full">
//         <h2 className="text-left text-lg font-bold">
//           <span>Create your hospitality</span>
//         </h2>
//       </div>

//       <div className="w-full">
//         <a href="/SA_en/serveware/thermos-sets-alsaifgallery.html" className="block">
//           <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_--eng_31.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchpriority="low" className="rounded-2xl border border-gray-300" />
//         </a>
//       </div>

//       <div className="w-full">
//         <h2 className="text-left text-lg font-bold">
//           <span>For your table</span>
//         </h2>
//       </div>

//       <div className="w-full">
//         <a href="/SA_en/serveware/dinnerware-sets.html" className="block">
//           <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_42.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchpriority="low" className="rounded-2xl border border-gray-300" />
//         </a>
//       </div>

//       <div className="w-full">
//         <a href="/SA_en/serveware/incense-holders.html" className="block">
//           <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/428-x-150--_-3-copy_1_.gif" alt="banner" layout="responsive" width={500} height={150} loading="lazy" fetchpriority="low" className="rounded-2xl border border-gray-300" />
//         </a>
//       </div>

//       <div className="w-full">
//         <h2 className="text-left text-lg font-bold">
//           <span>Best Food Warmer</span>
//         </h2>
//       </div>

//       <div className="w-full">
//         <a href="/SA_en/serveware/food-warmers.html" className="block">
//           <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_10.jpg" alt="banner" layout="responsive" width={500} height={300} loading="lazy" fetchpriority="low" className="rounded-2xl border border-gray-300" />
//         </a>
//       </div>
//     </div>
//   );
// };

