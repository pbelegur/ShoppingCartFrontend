
"use client";
import Image from "next/image";
import { useState,useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [data,setData] = useState([]);
  useEffect(() => {
    fetch('https://karinialassignment-production.up.railway.app/api/data')
      .then(res => res.json())
      .then(data => {
        setData(data);
        setFilteredProducts(data);
        console.log('Backend says:', data);
      });
  }, []);
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm.trim()) {
      setFilteredProducts(data);
      return;
    }

    fetch('https://karinialassignment-production.up.railway.app/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data);
      });
    
  };

  const handleAdd = (newItem) => {
    setCart((prevItems) => [...prevItems, newItem]);
  };

  const handleCart = () => {
    localStorage.setItem("itemsInCart", JSON.stringify(cart));
    router.push("/cart");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div></div>
        <div className="flex-1 max-w-2xl mx-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search by SKU or Title ............"
            className={styles.searchInput}
          />
        </div>
        <div className={styles.cartIcon}>
          <Image
            onClick={handleCart}
            src="/cart.jpg"
            alt="Shopping Cart"
            width={40}
            height={40}
            className="object-contain"
          />
          {cart.length > 0 && (
            <span className={styles.cartCount}>{cart.length}</span>
          )}
        </div>
      </header>

      <main className={styles.mainWrapper}>
      {filteredProducts.length > 0 ? (
          <div className={styles.productgrid}>
            {filteredProducts.map((obj, index) => (
              <div className={styles.productcard} key={index}>
                {obj["Image Src"] && (
                  <img
                    width={80}
                    height={100}
                    src={obj["Image Src"]}
                    alt={obj["Title"] || "Product image"}
                    className="w-full h-48 object-contain mb-4"
                  />
                )}
                <div className="p-4">
                  <p className="font-semibold text-xl">{obj["Title"] || "Untitled Product"}</p>
                  <p className="text-sm text-gray-600">SKU: {obj["Variant SKU"]}</p>
                  <p className="font-bold text-lg mt-2">${obj["Variant Price"]}</p>
                  <button
                    onClick={() => handleAdd(obj)}
                    className="mt-4 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

        ) : (
          <p className="text-center p-8 text-gray-500">NO RESULTS FOUND</p>
        )}
      </main>
    </div>
  );
}
