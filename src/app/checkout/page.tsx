"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation"; // If using `app/` directory

export default function Checkout() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to /checkout/login on component load
    router.push("/checkout/login");
  }, [router]);

  return null; // Optionally, you can return a loading spinner or a blank component
}
