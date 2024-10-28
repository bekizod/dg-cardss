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

        {/* Render orders   
        {orders?.length > 0 ? (
          orders.map((order: OrderData) => (
            <div key={order._id} className="order-card">
              <h3>Order ID: {order._id}</h3>
              <p>Ordered By: {order.orderedBy}</p>
              <p>Status: {order.status}</p>
              <p>Payment Status: {order.paymentStatus}</p>
              <p>Total Amount: ${order.totalAmount}</p>
              <p>Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>

              <div className="cart-items">
                <h4>Cart Items:</h4>
                {order.cart.map((item) => (
                  <div key={item.productId} className="cart-item">
                    <p>Product ID: {item.productId}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Unit Price: ${item.unitPrice}</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )} */}
      </div>
    );
}