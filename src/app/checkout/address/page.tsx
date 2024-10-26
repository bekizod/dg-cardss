// app/checkout/address/page.tsx
"use client";

import { fetchUserInfo, useAuth } from "@/context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa"; // Import icons from React Icons
import { Button, Form, Input, notification } from "antd";
import axios from 'axios';
import Cookies from "js-cookie";
 
 

export default function Address() {
  const [showMap, setShowMap] = useState(false);
   const [loading, setLoading] = useState(false);
   const [address, setAddress] = useState("");
  const router = useRouter();
  const { user,token } = useAuth();
  const [addressMe, setAddressMe] = useState( []);
   useEffect(() => {
     const token = Cookies.get("token");
     console.log("User data: " + JSON.stringify(user, null, 2));
     setAddressMe(user?.savedAddress);
     if (!token) {
       router.push("/checkout/login");
     }
   }, [user, router]);

   const fetchData = async () => {
     if (token) {
       await fetchUserInfo(token);
       setAddressMe(user?.savedAddress);
     }
   };

   const handleSubmit = async () => {
     setLoading(true);
     const token = Cookies.get("token");
     try {
       const response = await axios.post(
         "https://alsaifgallery.onrender.com/api/v1/user/setAddress",
         { address },
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         }
       );

       if (response.status === 200) {
         notification.success({
           message: "Address Added",
           description: response.data.message,
         });
         setAddress("");
         setShowMap(false);

         // Fetch the updated user data to refresh the address list
         await fetchData();
         window.location.reload(); 
       }
     } catch (error) {
       console.error(error);
       notification.error({
         message: "Submission Failed",
         description: "Failed to add the address. Please try again.",
       });
     } finally {
       setLoading(false);
     }
   };
  return (
    <div className="flex flex-col gap-4 p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-center mt-4">
        <motion.button className=" bg-[var(--color-primary)] text-white p-2 rounded-full  justify-center items-center shadow-md hover:bg-[var(--color-primary)] transition duration-300 dark:bg-[var(--color-primary)] dark:hover:bg-green-700" onClick={() => setShowMap(!showMap)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {showMap ? <FaMinus size={20} /> : <FaPlus size={20} />}
        </motion.button>
      </div>

      {/* Map Modal */}
      {showMap && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 dark:bg-gray-300">
          <motion.div className="relative w-full max-w-4xl bg-white rounded-lg shadow-md p-4 dark:bg-gray-900" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
            <button className="absolute z-50 top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200" onClick={() => setShowMap(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path d="M19.707 4.293a1 1 0 00-1.414 0L12 9.586 5.707 3.293a1 1 0 00-1.414 1.414L10.586 11 4.293 17.293a1 1 0 001.414 1.414L12 12.414l6.293 6.293a1 1 0 001.414-1.414L13.414 11l6.293-6.293a1 1 0 000-1.414z" fill="currentColor"></path>
              </svg>
            </button>
            {/* Add your map embed or component here */}
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Address" required>
                <Input.TextArea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" rows={4} />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} disabled={!address}>
                  Submit Address
                </Button>
              </Form.Item>
            </Form>
          </motion.div>
        </div>
      )}

      {/* Addresses Container */}
      <div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:text-white">
        <div className="gap-4">
          {/* Saved Addresses */}
          {addressMe?.length > 0 ? (
            <div className="space-y-4">
              {addressMe?.map((address, index) => (
                <motion.div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md w-full flex justify-between items-start dark:bg-gray-800" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <div>
                    <p className="text-lg font-semibold">{address}</p>
                  </div>
                  <button className="text-green-500 dark:text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H11C11.41 1.25 11.75 1.59 11.75 2C11.75 2.41 11.41 2.75 11 2.75H9C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V13C21.25 12.59 21.59 12.25 22 12.25C22.41 12.25 22.75 12.59 22.75 13V15C22.75 20.43 20.43 22.75 15 22.75Z" fill="#0C68F4"></path>
                      <path d="M8.49935 17.6901C7.88935 17.6901 7.32935 17.4701 6.91935 17.0701C6.42935 16.5801 6.21935 15.8701 6.32935 15.1201L6.75935 12.1101C6.83935 11.5301 7.21935 10.7801 7.62935 10.3701L15.5093 2.49006C17.4993 0.500059 19.5193 0.500059 21.5093 2.49006C22.5993 3.58006 23.0893 4.69006 22.9893 5.80006C22.8993 6.70006 22.4193 7.58006 21.5093 8.48006L13.6293 16.3601C13.2193 16.7701 12.4693 17.1501 11.8893 17.2301L8.87935 17.6601C8.74935 17.6901 8.61935 17.6901 8.49935 17.6901ZM16.5693 3.55006L8.68935 11.4301C8.49935 11.6201 8.27935 12.0601 8.23935 12.3201L7.80935 15.3301C7.76935 15.6201 7.82935 15.8601 7.97935 16.0101C8.12935 16.1601 8.36935 16.2201 8.65935 16.1801L11.6693 15.7501C11.9293 15.7101 12.3793 15.4901 12.5593 15.3001L20.4393 7.42006C21.0893 6.77006 21.4293 6.19006 21.4793 5.65006C21.5393 5.00006 21.1993 4.31006 20.4393 3.54006C18.8393 1.94006 17.7393 2.39006 16.5693 3.55006Z" fill="#0C68F4"></path>
                      <path d="M19.8496 9.83003C19.7796 9.83003 19.7096 9.82003 19.6496 9.80003C17.0196 9.06003 14.9296 6.97003 14.1896 4.34003C14.0796 3.94003 14.3096 3.53003 14.7096 3.41003C15.1096 3.30003 15.5196 3.53003 15.6296 3.93003C16.2296 6.06003 17.9196 7.75003 20.0496 8.35003C20.4496 8.46003 20.6796 8.88003 20.5696 9.28003C20.4796 9.62003 20.1796 9.83003 19.8496 9.83003Z" fill="#0C68F4"></path>
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">No addresses available. Add Address</p>
          )}

          {/* Confirm Button */}
          <div className="flex justify-center mt-4">
            <Link href="/checkout/payment">
              <motion.button className=" bg-[var(--color-primary)] text-white p-2 rounded-lg shadow-md hover:bg-[var(--color-primary)] transition duration-300 dark:bg-[var(--color-primary)] dark:hover:bg-green-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                Confirm
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
