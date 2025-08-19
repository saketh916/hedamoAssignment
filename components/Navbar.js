"use client";
import { useState } from "react";
import { ShoppingCart, Search } from "lucide-react";
import CartDrawer from "./CartDrawer";
import { motion } from "framer-motion";

export default function Navbar({
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  cartItems = [],
  onRemove,
}) {
  const [cartOpen, setCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Home");

  const categories = ["Home", "Skincare", "Snacks & Beverages", "Shampoos", "Tablets"];

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSelectedCategory(cat);
  };

  return (
    <>
      <nav
        className="flex justify-between items-center px-6 sm:px-8 py-4 
        bg-gradient-to-r from-purple-500 via-pink-500 to-red-400 
        shadow-md sticky top-0 z-50 text-white"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-extrabold tracking-wide"
        >
          Hedamo <span className="animate-pulse">♡</span>
        </motion.div>

        {/* Categories */}
        <ul className="hidden sm:flex gap-6 font-medium">
          {categories.map((cat) => (
            <li
              key={cat}
              className={`cursor-pointer relative group ${
                activeCategory === cat ? "font-bold" : ""
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
              <span
                className={`absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ${
                  activeCategory === cat ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </li>
          ))}
        </ul>

        {/* Search + Cart */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex items-center border border-white/40 rounded-lg px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-md">
            <Search className="w-5 h-5 text-white/80" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="outline-none bg-transparent px-2 text-white placeholder-white/60 w-24 sm:w-40"
            />
          </div>

          {/* Cart */}
          <div
            className="relative cursor-pointer"
            onClick={() => setCartOpen((prev) => !prev)}
          >
            <ShoppingCart className="w-7 h-7 hover:text-yellow-200 transition" />
            {cartItems.length > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs px-1.5 rounded-full"
              >
                {cartItems.length}
              </motion.span>
            )}
          </div>
        </div>
      </nav>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onRemove={onRemove}
      />
    </>
  );
}
