"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Button } from "antd";
import { useAuth } from "@/context/UserContext";

export default function TopHeader() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("saudi");
  const modalRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    setOpen(false);
  };

  const { theme } = useTheme();
  const flagSrc = selectedCountry === "saudi" ? "/saudiA.png" : "/uae.png";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="hidden lg:block">
      {" "}
      <div className="bg-gray-100 dark:bg-slate-900  text-sm font-serif py-2 flex justify-around items-center gap-8">
        <div className="flex items-center gap-3">
          <p>Welcome to Digital Card</p>
          <Image
            src={flagSrc}
            alt="Country flag"
            onClick={() => setOpen(true)}
            className="h-5 w-7 cursor-pointer"
            width={100}
            height={100}
          />{" "}
          | <p>العربية</p>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                ref={modalRef}
                className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-lg max-w-sm w-full"
                initial={{ y: "-100vh" }}
                animate={{ y: 0 }}
                exit={{ y: "100vh" }}
              >
                <h1 className="text-center font-bold text-3xl text-gray-800 dark:text-gray-100 mb-4">
                  Choose Country
                </h1>
                <div className="space-y-4">
                  <div
                    className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-slate-700 rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleCountryChange("saudi")}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="country"
                        checked={selectedCountry === "saudi"}
                        readOnly
                        className="h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500"
                      />
                      <p className="text-lg text-gray-800 dark:text-gray-100">
                        المملكة العربية السعودية
                      </p>
                    </div>
                    <Image
                      src="/saudiA.png"
                      alt="Saudi flag"
                      className="h-10 w-10"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div
                    className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-slate-700 rounded-lg shadow-md cursor-pointer"
                    onClick={() => handleCountryChange("uae")}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="radio"
                        name="country"
                        checked={selectedCountry === "uae"}
                        readOnly
                        className="h-5 w-5 cursor-pointer text-blue-600 focus:ring-blue-500"
                      />
                      <p className="text-lg text-gray-800 dark:text-gray-100">
                        الإمارات العربية المتحدة
                      </p>
                    </div>
                    <Image
                      src="/uae.png"
                      alt="UAE flag"
                      className="h-10 w-10"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-row gap-4">
          {user && (
            <>
              <Link href="/feedback" className="flex flex-row gap-3">
                <span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 14.25C11.6022 14.25 11.2206 14.092 10.9393 13.8107C10.658 13.5294 10.5 13.1478 10.5 12.75C10.5 12.3522 10.658 11.9706 10.9393 11.6893C11.2206 11.408 11.6022 11.25 12 11.25C12.3978 11.25 12.7794 11.408 13.0607 11.6893C13.342 11.9706 13.5 12.3522 13.5 12.75C13.5 13.1478 13.342 13.5294 13.0607 13.8107C12.7794 14.092 12.3978 14.25 12 14.25V14.25ZM4.5 14.25C4.10218 14.25 3.72064 14.092 3.43934 13.8107C3.15804 13.5294 3 13.1478 3 12.75C3 12.3522 3.15804 11.9706 3.43934 11.6893C3.72064 11.408 4.10218 11.25 4.5 11.25C4.89782 11.25 5.27936 11.408 5.56066 11.6893C5.84196 11.9706 6 12.3522 6 12.75C6 13.1478 5.84196 13.5294 5.56066 13.8107C5.27936 14.092 4.89782 14.25 4.5 14.25V14.25Z"
                      stroke={
                        theme === "dark" ? "#FFFFFF" : "var(--color-primary)"
                      }
                      strokeMiterlimit="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.4625 12.75H6.75V4.95C6.75 4.83065 6.79741 4.71619 6.8818 4.6318C6.96619 4.54741 7.08065 4.5 7.2 4.5H17.25M13.7625 12.75H15.3C15.3591 12.75 15.4176 12.7384 15.4722 12.7157C15.5268 12.6931 15.5764 12.66 15.6182 12.6182C15.66 12.5764 15.6931 12.5268 15.7157 12.4722C15.7384 12.4176 15.75 12.3591 15.75 12.3V8.625"
                      stroke={
                        theme === "dark" ? "#FFFFFF" : "var(--color-primary)"
                      }
                      strokeLinecap="round"
                    />
                    <path
                      d="M16.5 6.75H13.5"
                      stroke="var(--color-primary)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.75 6.75H2.5425C2.45552 6.75002 2.3704 6.77525 2.29746 6.82264C2.22452 6.87002 2.16687 6.93753 2.1315 7.017L0.789 10.038C0.763424 10.0954 0.750139 10.1574 0.75 10.22V12.75C0.75 12.8091 0.7623 12.8686 0.7875 12.9275C0.8127 12.9865 0.8514 13.0412 0.9025 13.0884C0.95361 13.1357 1.0166 13.1645 1.079 13.1725H2.625M6.75 12.75H6"
                      stroke={
                        theme === "dark" ? "#FFFFFF" : "var(--color-primary)"
                      }
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                Send FeedBack
              </Link>
              |
            </>
          )}

          <Link href="/all-offers" className="flex flex-row gap-2">
            <div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.4043 5.29181C14.4043 4.35506 13.6445 3.59531 12.7085 3.59531H11.9368C11.4898 3.59531 11.06 3.41831 10.742 3.10256L10.2028 2.56256C9.54203 1.89881 8.46803 1.89581 7.80428 2.55656L7.79753 2.56256L7.25753 3.10256C6.94028 3.41831 6.51053 3.59531 6.06278 3.59531H5.29178C4.35503 3.59531 3.59528 4.35506 3.59528 5.29181V6.06206C3.59528 6.51056 3.41828 6.93956 3.10253 7.25756L2.56253 7.79756C1.89878 8.45831 1.89503 9.53156 2.55578 10.1961L2.56253 10.2028L3.10253 10.7428C3.41828 11.0593 3.59528 11.4898 3.59528 11.9368V12.7086C3.59528 13.6453 4.35503 14.4043 5.29178 14.4043H6.06278C6.51053 14.4043 6.94028 14.5821 7.25753 14.8978L7.79753 15.4371C8.45753 16.1016 9.53153 16.1046 10.196 15.4438C10.1983 15.4416 10.2005 15.4393 10.2028 15.4371L10.742 14.8978C11.06 14.5821 11.4898 14.4043 11.9368 14.4043H12.7085C13.6445 14.4043 14.4043 13.6453 14.4043 12.7086V11.9368C14.4043 11.4898 14.582 11.0593 14.8978 10.7428L15.437 10.2028C16.1015 9.54206 16.1045 8.46806 15.4438 7.80431L15.437 7.79756L14.8978 7.25756C14.582 6.93956 14.4043 6.51056 14.4043 6.06206V5.29181Z"
                  stroke={theme === "dark" ? "#FFFFFF" : "var(--color-primary)"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.9275 10.9271L7.07249 7.07214"
                  stroke={theme === "dark" ? "#FFFFFF" : "var(--color-primary)"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.07495 11.4918C7.22495 11.4918 7.36745 11.4318 7.47245 11.3268C7.52495 11.2743 7.56245 11.2068 7.59245 11.1393C7.62245 11.0718 7.63745 11.005 7.63745 10.9293C7.63745 10.8543 7.62245 10.7793 7.59245 10.7118C7.56245 10.6443 7.52495 10.5843 7.47245 10.5318C7.26245 10.3218 6.88745 10.3218 6.67745 10.5318C6.62495 10.5843 6.57995 10.6443 6.54995 10.7118C6.52745 10.7793 6.51245 10.8543 6.51245 10.9293C6.51245 11.005 6.52745 11.0718 6.54995 11.1393C6.57995 11.2068 6.62495 11.2743 6.67745 11.3268C6.78245 11.4318 6.92495 11.4918 7.07495 11.4918Z"
                  fill={theme === "dark" ? "#FFFFFF" : "var(--color-primary)"}
                />

                <path
                  d="M10.9301 7.63711C11.0051 7.63711 11.0726 7.62136 11.1401 7.59136C11.2076 7.56136 11.2751 7.52461 11.3276 7.47211C11.3801 7.41211 11.4176 7.35211 11.4476 7.28461C11.4776 7.21636 11.4926 7.14961 11.4926 7.07461C11.4926 6.99886 11.4776 6.92461 11.4476 6.85711C11.4176 6.78961 11.3801 6.72211 11.3276 6.67711C11.1101 6.46636 10.7426 6.46636 10.5326 6.67711C10.4276 6.78136 10.3676 6.92461 10.3676 7.07461C10.3676 7.14961 10.3751 7.21636 10.4051 7.28461C10.4351 7.35211 10.4801 7.41211 10.5326 7.47211C10.5851 7.52461 10.6451 7.56136 10.7126 7.59136C10.7801 7.62136 10.8551 7.63711 10.9301 7.63711Z"
                  fill={theme === "dark" ? "#FFFFFF" : "var(--color-primary)"}
                />
              </svg>
            </div>
            <div>All offers</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
