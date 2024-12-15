"use client"; // Ensures this component is client-side
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  getAdvertisements,
  resetAdvertisements,
} from "@/redux/slices/bannersSlice";
import Link from "next/link";
import { getAllCoverPictures } from "@/redux/slices/coverPictureSlice";
import axios from "axios";
import Loader from "@/app/loading";

export default function PageBuilder({ parentId }: { parentId: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch<AppDispatch>();
  const { cache, status, error } = useSelector(
    (state: RootState) => state.advertisement as any
  ); // Access advertisements from the Redux state
  // const totalSlides = cache[parentId]?.length || 0;
  const [pages, setPages] = useState<number>(0);
  const { pictures, isFetching } = useSelector(
    (state: RootState) => state.coverPictureSlice as any
  );
  const { currentLocale, translations } = useSelector(
    (state: RootState) => state.locale
  );
  // useEffect(() => {
  //   // Fetch cover pictures when the component mounts
  //   if(parentId){
  //   dispatch(getAllCoverPictures({ parentId }));
  // }
  //   // Optionally reset the state when unmounting

  // }, [dispatch, parentId]);
  const [coverPictures, setCoverPictures] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(false); // Track loading state
  const [Cerror, setCerror] = useState<string | null>(null); // Store error message
  useEffect(() => {
    const fetchCoverPictures = async () => {
      setLoading(true);
      setCerror(null); // Reset error before making the request

      if (parentId) {
        try {
          const response = await axios.get(
            `https://alsaifgallery.onrender.com/api/v1/category/getCoverPicturesOfSubCategories/${parentId}`
          );
          // Directly set the response data as an array
          setCoverPictures(response.data.data); // Set the data when the request is successful
          console.log(response.data); // Log the response to check its structure
        } catch (err: any) {
          setCerror(err.response?.data || "An error occurred"); // Set error message if something goes wrong
        } finally {
          setLoading(false); // Stop loading once the request is complete
        }
      }
    };

    fetchCoverPictures();
  }, [parentId]);

  useEffect(() => {
    if (!cache[parentId]) {
      // Fetch advertisements only if they are not already cached
      dispatch(getAdvertisements(parentId));
      setPages(cache[parentId]?.length);
    } else {
      setPages(cache[parentId]?.length);
    }
  }, [dispatch, parentId, cache]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % pages);
    }, 5000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [pages]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {Cerror}</div>;
  }

  return (
    <div className="space-y-4 py-20 px-4">
      {/* Slider Section */}

      <motion.div
        className="relative w-full overflow-hidden rounded-2xl border border-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div className="relative w-full flex overflow-hidden">
          <motion.ul
            className="flex w-full"
            style={{
              display: "flex",
              padding: 0,
              margin: 0,
              transition: "transform 0.35s ease-in-out",
              transform:
                currentLocale === "ar"
                  ? `translateX(${currentSlide * 100}%)` // Reverse for RTL
                  : `translateX(-${currentSlide * 100}%)`,
            }}
          >
            {cache[parentId] &&
              cache[parentId]?.length > 0 &&
              cache[parentId]?.map((ad: any, index: number) => (
                <motion.li key={index} className="flex-shrink-0 w-full">
                  <Link
                    href={`/${ad.parentCategoryId?.categoryName}/${ad.parentCategoryId?._id}/${ad.subCategoryId.categoryName}/${ad.subCategoryId._id}`}
                  >
                    {" "}
                    {/* Assuming 'link' is the URL to redirect */}
                    <Image
                      // src={ad.imageId?.data} // Assuming 'imageUrl' holds the image link
                      src={
                        currentLocale === "ar" && ad.translatedImageId?.data
                          ? ad.translatedImageId?.data
                          : ad.imageId?.data || "/path/to/default-image.jpg"
                      }
                      alt={`slide ${index}`}
                      layout="responsive"
                      width={1200}
                      height={500}
                      priority
                      className="rounded-2xl border border-gray-300"
                      fetchPriority="high"
                    />
                  </Link>
                </motion.li>
              ))}
          </motion.ul>
        </motion.div>

        <button
          type="button"
          aria-label="previous slide"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide - 1 + pages) % pages)
          }
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="next slide"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white  bg-[var(--color-primary)] p-2 rounded-full"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % pages)
          }
        >
          ›
        </button>

        <ul className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[...Array(pages)?.keys()].map((index) => (
            <li
              key={index}
              className={`dot ${
                currentSlide === index
                  ? " bg-[var(--color-primary)]"
                  : "bg-gray-400"
              } w-2 h-2 rounded-full`}
            />
          ))}
        </ul>
      </motion.div>

      {/* Banner Sections */}
      {/* <motion.div className="relative w-full space-y-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="w-full">
          <Link href="/SA_en/electrical-appliances/pressure-cookers.html">
            <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/eng_-_-_1.jpg" alt="banner" layout="responsive" width={1200} height={800} priority className="rounded-2xl" fetchPriority="high" />
          </Link>
        </div>

        <div className="flex gap-2">
          <div className="w-1/2">
            <Link href="/SA_en/electrical-appliances/ovens-microwaves.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_91.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/2">
            <Link href="/SA_en/electrical-appliances/coffee-machines.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_15.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/pressure-cookers.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_ENG_2.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/electric-bakers.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_--eng_33.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/food-processors.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-ENG_19.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
          <div className="w-1/4">
            <Link href="/SA_en/electrical-appliances/blenders.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_92.jpg" alt="banner" layout="responsive" width={500} height={300} priority className="rounded-2xl" fetchPriority="high" />
            </Link>
          </div>
        </div>

        <motion.div className="relative w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="PageBuilder_intersection_div__OvZlh">
            <div className="Banner_container__VNJY5">
              <Link href="/SA_en/electrical-appliances/mixers-123.html">
                <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_66.jpg" alt="banner" layout="responsive" width={1200} height={800} priority className="w-full rounded-2xl" fetchPriority="high" />
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex gap-2.5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/pressure-cookers.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-__200.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/food-processors.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_-eng_36.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/grinders-roasters.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_6.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/blenders.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_93.jpg" alt="banner" layout="responsive" width={300} height={200} loading="eager" fetchPriority="high" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex gap-2.5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/electric-bakers.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_94.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/sandwich-waffle-maker.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_22.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/canister-vacuums.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_.eng_42.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/irons.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_6.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div className="relative flex gap-2.5" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/ovens-microwaves.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_--eng_41.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/food-chopper.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_8.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/juicers.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_67.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative w-1/4">
            <div className="PageBuilder_intersection_div__OvZlh">
              <div className="Banner_container__VNJY5">
                <Link href="/SA_en/electrical-appliances/electric-kettles.html">
                  <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_eng_9.jpg" alt="banner" layout="responsive" width={300} height={200} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="relative w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="PageBuilder_intersection_div__OvZlh">
          <div className="Banner_container__VNJY5">
            <Link href="/SA_en/electrical-appliances/canister-vacuums.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-_eng_8.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div className="relative w-full" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="PageBuilder_intersection_div__OvZlh">
          <div className="Banner_container__VNJY5">
            <Link href="/SA_en/electrical-appliances/ovens-microwaves.html">
              <Image src="https://pwa-cdn.alsaifgallery.com/media/wysiwyg/_-eng_70.jpg" alt="banner" layout="responsive" width={1200} height={800} loading="lazy" fetchPriority="low" className="w-full rounded-2xl" />
            </Link>
          </div>
        </div>
      </motion.div> */}
      {isFetching && <div>Cover Pics Are Fetching</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {coverPictures?.map((item: any) => (
          <Link
            href={`/${item.parentCategory?.categoryName}/${item.parentCategory?._id}/${item.subCategory.categoryName}/${item.subCategory._id}`}
            key={item._id}
          >
            <motion.div
              className="shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <Image
                width={1000}
                height={1000}
                objectFit="cover"
                layout="responsive"
                src={
                  currentLocale === "ar" && item.translatedCoverPic?.data
                    ? item.translatedCoverPic?.data
                    : item.coverPic?.data || "/path/to/default-image.jpg"
                }
                alt={item.subCategory.categoryName}
                className=" w-full h-60 transition-opacity duration-300 hover:opacity-80"
              />
              {/* <div className="p-4 bg-white">
                <h3 className="text-lg font-semibold text-gray-800">{item.subCategory.categoryName}</h3>
                <p className="text-sm text-gray-600">{item.parentCategory.categoryName}</p>
              </div> */}
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
