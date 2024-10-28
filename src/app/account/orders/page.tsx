"use client"

import { useAuth } from "@/context/UserContext";
import { getOrders } from "@/redux/slices/orderSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface CartItem {
  productId: string;
  quantity: number;
  unitPrice: number;
}

// Define the shape of an order
interface OrderData {
  _id: string;
  orderedBy: string;
  cart: CartItem[];
  totalAmount: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

export default function Order() {
    const dispatch = useDispatch<AppDispatch>();
    const{ user } = useAuth()
    const { orders, loading, error } = useSelector((state: RootState) => state.orders as any);
   useEffect(() => {
 
      dispatch(getOrders("6714b9dba68f7720b223fecc"));
   
  }, [dispatch ]);

 
    return (
      <div className="order-list mt-[64px] md:mt-[124px]">
        <h2>Order History</h2>

        {/* Loading and error handling */}
        {loading && <p>Loading orders...</p>}
        {error && <p>Error loading orders: {error}</p>}

        */}
      </div>
    );
}