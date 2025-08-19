"use client";
import React, { useState } from "react";

const ProductCard = ({ product, addToCart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);

  const handlePrev = () => {
    setCurrentImg((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImg((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      {/* Product Card */}
      <div
        className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:scale-105 cursor-pointer relative group"
        onClick={() => {
          setIsOpen(true);
          setCurrentImg(0);
        }}
      >
        <div className="w-full h-48 bg-gray-100 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        <h3 className="text-gray-600 font-semibold">{product.name}</h3>
        <p className="text-gray-600 font-medium">₹{product.price}</p>

        {/* ⭐ Always show rating in card */}
        {product.rating && (
          <div className="flex items-center gap-1 mt-1">
            <span className="text-yellow-500 text-lg">★</span>
            <span className="text-sm font-medium text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Hidden description on hover */}
        <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition line-clamp-2">
          {product.description}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product);
          }}
          className="mt-3 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 transition"
        >
          Add to Cart
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full relative shadow-xl animate-fadeIn overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
            >
              ✖
            </button>

            {/* Image Carousel */}
            <div className="relative w-full h-60 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden mb-4">
              <img
                src={product.images ? product.images[currentImg] : product.image}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
              />

              {/* Prev & Next Buttons */}
              {product.images && product.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700"
                  >
                    {"<"}
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800/80 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700"
                  >
                    {">"}
                  </button>
                </>
              )}
            </div>

            {/* Product Info */}
            <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
            <p className="text-gray-700 mb-3">{product.description}</p>
            <p className="text-pink-600 font-bold text-lg mb-3">
              ₹{product.price}
            </p>

            {/* Calories */}
            {product.calories && (
              <p className="text-sm text-gray-600 mb-3">
                🔥 Calories:{" "}
                <span className="font-semibold">{product.calories}</span>
              </p>
            )}

            {/* Reviews */}
            {product.reviews && product.reviews.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Customer Reviews</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto pr-2">
                  {product.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border p-2 rounded-lg bg-gray-50"
                    >
                      <p className="text-sm font-semibold">{review.user}</p>
                      <p className="text-sm text-gray-700">{review.comment}</p>
                      <p className="text-yellow-500 text-sm">
                        ⭐ {review.rating}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <button
              onClick={() => {
                addToCart(product);
                setIsOpen(false);
              }}
              className="mt-4 w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-2 rounded-lg hover:from-pink-600 hover:to-pink-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
