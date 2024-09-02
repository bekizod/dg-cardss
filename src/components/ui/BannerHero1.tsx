import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BannerSection = () => {
  return (
    <>
      <motion.div className="relative flex  gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="relative w-1/4">
              <Link href="/SA_en/electrical-appliances/air-fryers.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__505.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={400} // Adjust width and height as needed
                  height={300}
                />
              </Link>
        </div>
        <div className="relative w-1/4">
              <Link href="/SA_en/kitchenware/pots.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/cook.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={400} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
        <div className="relative w-1/4">
          <div id="row_7_column_3_banner_1" className="PageBuilder_intersection_div__OvZlh">
            <div className="Banner_container__VNJY5">
              <Link href="/SA_en/serveware/serveware-set.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__507.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={400} // Adjust width and height as needed
                  height={300}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-1/4">
          <div id="row_7_column_4_banner_1" className="PageBuilder_intersection_div__OvZlh">
            <div className="Banner_container__VNJY5">
              <a href="/SA_en/large-home-appliances/washing-machines.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__508.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={400} // Adjust width and height as needed
                  height={300}
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="relative flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="relative w-1/2">
          <div id="row_8_column_1_banner_1" className="PageBuilder_intersection_div__OvZlh">
            <div className="Banner_container__VNJY5">
              <Link href="/SA_en/alsaif-gallery-offers/new-arrival-sa.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/new-arrival-Web-EN.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={800} // Adjust width and height as needed
                  height={400}
                />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-1/2">
          <div id="row_8_column_2_banner_1" className="PageBuilder_intersection_div__OvZlh">
            <div className="Banner_container__VNJY5">
              <a href="/SA_en/alsaif-gallery-offers/daily-offer-sa.html" className="block">
                <Image
                  src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Budget-Deals-Web-EN.jpg"
                  alt="banner"
                  loading="lazy"
                  fetchPriority="low"
                  className="w-full rounded-xl"
                  layout="responsive"
                  width={800} // Adjust width and height as needed
                  height={400}
                />
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="relative h-full flex gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="relative w-2/3">
          <motion.div initial={{ x: -100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
                        <Link href="/SA_en/electrical-appliances.html" className="block">
                          <Image width={100} height={100} src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Small-Applinces-EN_4.jpg" alt="slide 0" loading="lazy" fetchPriority="low" className="w-full rounded-xl" layout="responsive" />
                        </Link>
          </motion.div>
        </div>

        <div className="relative flex flex-col h-full gap-2  w-1/3">
          <motion.div initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            <div className="Banner_container">
              <a href="/SA_en/electrical-appliances/canister-vacuums.html" className="block">
                <Image width={1000} height={1100} src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/vacuums-EN_2.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full rounded-xl" />
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ x: 100 }} animate={{ x: 0 }} transition={{ duration: 0.5 }}>
            <div className="Banner_container">
              <a href="/SA_en/electrical-appliances/coffee-machines.html" className="block">
                <Image width={1000} height={1100} src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/Coffe-maker-EN_3.jpg" alt="banner" loading="lazy" fetchPriority="low" className="w-full rounded-xl" />
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default BannerSection;
