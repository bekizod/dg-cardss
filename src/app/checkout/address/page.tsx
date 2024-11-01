"use client";

import { fetchUserInfo, useAuth } from "@/context/UserContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaCheck } from "react-icons/fa";
import { Button, Form, Input, Select, notification } from "antd";
import axios from "axios";
import Cookies from "js-cookie";

interface City {
  id: number;
  name: string;
}

export default function Address() {
  const [showMap, setShowMap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState<string>(""); // State for selected city
  const [cities, setCities] = useState<City[]>([]); // State for cities list
  const router = useRouter();
  const { user, token } = useAuth();
  const [addressMe, setAddressMe] = useState<string[]>([]);

  useEffect(() => {
    const token = Cookies.get("token");
    setAddressMe(user?.savedAddress || []);
    if (!token) {
      router.push("/checkout/login");
    }
  }, [user, router]);

  const fetchData = async () => {
   
    const token = Cookies.get('token');
      try {
        const response = await fetch('https://alsaifgallery.onrender.com/api/v1/user/getUserAddress', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        // Check if the response is ok
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const result = await response.json();
  
        // Check for data in the response
        if (result.data && result.data.length > 0) {
          setAddressMe(result.data); // Set the fetched addresses
          setAddress(result.data[0]); // Set the first address as default
        } else {
          setAddressMe([]); // Set to empty if no addresses
        }
      } catch (error) {
        console.error('Error fetching user addresses:', error);
        // Optionally handle the error (e.g., show a notification)
      }
     
  };
  

  // Fetch cities from the JSON file
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/city.json");
        const data: City[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
    fetchData(); // Ensure address is set after user data is fetched
  } ,[]);

  const handleSubmit = async () => {
    setLoading(true);
    console.log("the picked addess is " + city)
    const token = Cookies.get("token");
    try {
      const response = await axios.post(
        "https://alsaifgallery.onrender.com/api/v1/user/setAddress",
        { address: city }, // Send city along with address
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      ) 
      if (response.status === 200) {
        notification.success({
          message: "Address Added",
          description: response.data.message,
        });
        setAddress("");
        setCity(""); // Reset city selection
        setShowMap(false);

        await fetchData();
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

  const handleConfirmSelection = () => {
    // Pass selected city as a query parameter to the payment route
    router.push(`/checkout/payment?address=${encodeURIComponent(address)}`);
  };

  return (
    <div className="flex flex-col gap-4 p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex justify-center mt-4">
        <motion.button
          className="bg-[var(--color-primary)] text-white p-2 rounded-full justify-center items-center shadow-md hover:bg-[var(--color-primary)] transition duration-300 dark:bg-[var(--color-primary)] dark:hover:bg-green-700"
          onClick={() => setShowMap(!showMap)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {showMap ? <FaMinus size={20} /> : <FaPlus size={20} />}
        </motion.button>
      </div>

      {showMap && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-gray-800 bg-opacity-75 dark:bg-gray-300">
          <motion.div
            className="relative w-full max-w-4xl bg-white rounded-lg shadow-md p-4 dark:bg-gray-900"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="absolute z-50 top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setShowMap(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="M19.707 4.293a1 1 0 00-1.414 0L12 9.586 5.707 3.293a1 1 0 00-1.414 1.414L10.586 11 4.293 17.293a1 1 0 001.414 1.414L12 12.414l6.293 6.293a1 1 0 001.414-1.414L13.414 11l6.293-6.293a1 1 0 000-1.414z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <Form layout="vertical" onFinish={handleSubmit}>
              <Form.Item label="Select City" required>
                <Select
                  placeholder="Select a city"
                  value={city}
                  onChange={(value) => setCity(value)}
                >
                  {cities.map((city) => (
                    <Select.Option key={city.id} value={city.name}>
                      {city.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  disabled={!city}
                >
                  Submit Address
                </Button>
              </Form.Item>
            </Form>
          
          </motion.div>
        </div>
      )}

<div className="bg-white p-4 rounded-lg shadow-md dark:bg-gray-900 dark:text-white">
  <div className="gap-4">
    {addressMe?.length > 0 ? (
      <div className="space-y-4">
        {addressMe?.map((savedAddress, index) => (
          <motion.div
            key={index}
            className={`p-4 cursor-pointer bg-gray-100 rounded-lg shadow-md w-full flex justify-between items-start dark:bg-gray-800 ${
              address === savedAddress ? "border-2 border-green-500" : ""
            }`}
            onClick={() => setAddress(savedAddress)} // Selects the new address and deselects the previous
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center">
              <p className="text-lg font-semibold">{savedAddress}</p>
              {address === savedAddress ? ( // Show check mark only for the selected address
                <FaCheck className="ml-2 text-green-500" />
              ) : null}
            </div>
          </motion.div>
        ))}
        <div className="flex justify-center">
          <button
            className="p-2 rounded-lg text-white bg-[var(--color-primary)]"
            onClick={handleConfirmSelection}
          >
            Confirm
          </button>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500 dark:text-gray-400">
        No saved address
      </p>
    )}
  </div>
</div>

      
    </div>
  );
}
