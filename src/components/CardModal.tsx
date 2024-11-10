// components/CardModal.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

interface CardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
  }) => void;
}

const CardModal: React.FC<CardModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const handleConfirmClick = () => {
    onConfirm({
      cardNumber,
      expiryDate: `${expiryMonth}/${expiryYear}`,
      cvv,
    });
    onClose(); // Close the modal
  };

  return (
    <div
      className="fixed inset-0 dark:bg-[#ffffff9f] bg-[#0000009f] flex items-center justify-center z-50"
      onClick={() => onClose()}
    >
      <motion.div
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-lg font-semibold mb-4 dark:text-white">
          Card information
        </p>
        <div className="space-y-4">
          <div>
            <p className="text-sm pb-2 dark:text-gray-300">Card number</p>
            <input
              className="border w-full border-gray-300 rounded-lg p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              dir="auto"
              placeholder="Card number"
              type="tel"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
            />
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <p className="text-sm pb-2 dark:text-gray-300">Expiry date</p>
              <div className="flex gap-2">
                <input
                  className="border border-gray-300 rounded-lg p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-12"
                  dir="auto"
                  placeholder="MM"
                  type="tel"
                  value={expiryMonth}
                  onChange={(e) => setExpiryMonth(e.target.value)}
                />
                <input
                  className="border border-gray-300 rounded-lg p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white w-12"
                  dir="auto"
                  placeholder="YY"
                  type="tel"
                  value={expiryYear}
                  onChange={(e) => setExpiryYear(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <Image
                width={10}
                height={10}
                src="/ic_cvv.png"
                alt="cvv icon"
                className="w-6 h-6 flex justify-center pb-2 dark:invert"
              />
              <input
                className="border border-gray-300 rounded-lg p-2 w-1/3 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                dir="auto"
                placeholder="CVV"
                type="tel"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
          <button
            id="add_card_info_button"
            className="bg-blue-500 text-white p-2 rounded-lg shadow-md dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={handleConfirmClick}
          >
            Confirm
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default CardModal;
