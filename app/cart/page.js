"use client";
import _ from 'lodash';

import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const handleRemove = (newItem) => {
    const result = cart.filter(item => 
      !_.isMatch(item, newItem)
    );
    setCart(result);
  };

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("itemsInCart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];

      setCart(Array.isArray(parsedCart) ? parsedCart : []);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCart([]); // Fallback to empty array
    }
  }, []);

  return (
    <main>
      <h1>ITEMS IN CART</h1>
      {cart.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {cart.map((obj, index) => (
            <div key={index}>
              {obj["Image Src"] && (
                <img
                  width={80}
                  height={100}
                  src={obj["Image Src"]}
                  alt={obj["Title"] || "Product image"}
                  className="w-full h-48 object-contain mb-2"
                />
              )}
              <p className="font-semibold">{obj["Title"] || "Untitled Product"}</p>
              <p className="text-sm text-gray-600">SKU: {obj["Variant SKU"]}</p>
              <p className="font-bold mt-2">${obj["Variant Price"]}</p>
              <button
                  onClick={() => handleRemove(obj)}
                  className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                >
                  Remove From Cart
                </button>
            </div>
          ))}
        </ul>
      ) : (
        <p className="text-center p-8 text-gray-500">Your cart is empty.</p>
      )}
    </main>
  );
}
