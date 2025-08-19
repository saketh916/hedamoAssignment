"use client";
import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function CartDrawer({ isOpen, onClose, cartItems = [], onRemove }) {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 80 }}
      className="fixed top-0 right-0 h-full w-80 
      backdrop-blur-lg bg-white/80 border-l border-purple-100 
      shadow-2xl z-[9999]"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-bold text-purple-700">Your Cart</h2>
        <X
          className="cursor-pointer w-6 h-6 text-gray-600 hover:text-pink-600 transition"
          onClick={onClose}
        />
      </div>

      {/* Cart Items */}
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-120px)]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          cartItems.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center border-b pb-2 group"
            >
              <span className="text-gray-700">{item.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-purple-600 font-medium">₹{item.price}</span>
                <Trash2
                  className="w-5 h-5 text-gray-400 cursor-pointer opacity-0 group-hover:opacity-100 hover:text-red-500 transition"
                  onClick={() => onRemove(item)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 
            text-white py-2 rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700 transition"
          >
            Checkout
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
