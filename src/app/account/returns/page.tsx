"use client";

import { useAuth } from "@/context/UserContext";
import { getOrders } from "@/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PurchaseData {
  item: string;
  itemCode: string;
  amount: number;
  price: number;
  discount: number;
  date: string;
  image: string;
  status: string;
  cart: { productId: string; quantity: number, name: string, _id: string, price: number, category: string }[];
  orderedBy: string;
}

export default function OrderReturned() {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const { orders, loading, error } = useSelector((state: RootState) => state.orders as any);
  
  // State to track visibility of cart items for each order
  const [showCartItems, setShowCartItems] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    if (user?._id) {
      dispatch(getOrders(user._id));
    }
  }, [dispatch, user?._id]);

  // Filter for orders with status 'returned'
  const data: PurchaseData[] = orders?.data
    ? orders.data
        .filter((order: any) => order.status === "returned") // Only include returned orders
        .map((order: any) => ({
            item: "Order",
            itemCode: order._id,
            amount: order.totalAmount,
            price: order.cart.reduce((sum: number, cartItem: any) => sum + Number(cartItem.productId.price), 0),
            discount: 0,
            date: new Date(order.createdAt).toLocaleDateString("en-GB"),
            status: order.status,
            cart: order.cart,
            orderedBy: order.orderedBy.firstName,
        }))
    : [];

  const getStatusClass = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-200 text-green-800"; // Light green background with dark green text
      case "delayed":
        return "bg-yellow-200 text-yellow-800"; // Light yellow background with dark yellow text
      case "canceled":
        return "bg-red-200 text-red-800"; // Light red background with dark red text
      case "returned":
        return "bg-blue-200 text-blue-800"; // Light blue background with dark blue text
      default:
        return "bg-gray-200 text-gray-800"; // Default light gray background
    }
  };

  const toggleCartItemsVisibility = (orderId: string) => {
    setShowCartItems(prev => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  return (
    <div className="order-list max-lg:mt-[64px] lg:mt-[124px] p-4 bg-white dark:bg-gray-800 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Returned Orders History</h2>

      {/* Loading and error handling */}
      {loading && <p className="text-gray-500 text-center">Loading orders...</p>}
      {error && <p className="text-red-600 text-center">Error loading orders: {error}</p>}

      {/* Render filtered order data */}
      {data.length === 0 && !loading ? (
        <div className="text-gray-500  text-center flex justify-center">
        <Image src={"/Empty_Order.gif"} className="h-72 w-72 rounded" alt={"order"} width={1000} height={1000}/>
      </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((order) => {
            const isVisible = showCartItems[order.itemCode];

            return (
              <div
                key={order.itemCode}
                className="border border-gray-300 dark:border-slate-600 p-4 rounded-lg shadow-lg bg-white dark:bg-slate-700 transition-transform transform hover:scale-105"
              >
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">{order.item}</h3>
                <p className="text-gray-700 dark:text-gray-300">Order Code: <span className="font-medium">{order.itemCode}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Amount: <span className="font-medium">${order.price}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Total Quantity: <span className="font-medium">{order.amount}</span></p>
                <p className="text-gray-700 dark:text-gray-300">Date: <span className="font-medium">{order.date}</span></p>
                <p className={`p-2 rounded mt-2 text-center ${getStatusClass(order.status)} text-white`}>
                  Status: {order.status}
                </p>
                
                {/* Button to toggle cart items visibility for the specific order */}
                <button
                  onClick={() => toggleCartItemsVisibility(order.itemCode)}
                  className="mt-4 bg-[var(--color-primary)] text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
                >
                  {isVisible ? 'Hide Cart Items' : 'View Cart Items'}
                </button>

                {/* Conditionally render cart items */}
                {isVisible && (
                  <div className="mt-4">
                    <h4 className="font-semibold mb-1 text-gray-800 dark:text-white">Cart Items:</h4>
                    <div className="flex flex-col space-y-2">
                      {order.cart.map((cartItem: any) => (
                        <div key={cartItem?.productId?._id} className="flex justify-between p-2 bg-gray-100 dark:bg-gray-600 rounded-md">
                          <div className="flex flex-col">
                            <span className="font-medium">Product ID: {cartItem?.productId?._id}</span>
                            <span className="text-gray-600 dark:text-gray-300">Product Name: {cartItem?.productId?.name}</span>
                            <span className="text-gray-600 dark:text-gray-300">Quantity: {cartItem?.quantity}</span>
                            <span className="text-gray-600 dark:text-gray-300">Price: ${cartItem?.productId?.price}</span>
                            <span className="text-gray-600 dark:text-gray-300">Category: {cartItem?.productId?.category.categoryName}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
