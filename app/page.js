
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
  // react function that gets automatically triggerred on page load.
  useEffect(() => {
    fetch('https://karinialassignment-production.up.railway.app/api/data')
      .then(res => res.json())
      .then(data => {
        setFilteredProducts(data);
        console.log('Backend says:', data);
      });
      fetch('https://karinialassignment-production.up.railway.app/api/clearCart', {
          method: 'DELETE',
      })
          .then(res => res.json())
          .then(data => {
              console.log(`Deleted ${data.deletedCount} items from cart`);
              // Update UI to reflect empty cart
          })
          .catch(error => {
              console.error('Error clearing cart:', error);
          });
  }, []);
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (!searchTerm.trim()) {
      setFilteredProducts(data);
      return;
    }

    fetch('https://karinialassignment-production.up.railway.app/api/search',  {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ searchTerm }), // request_ body
    })
      .then((res) => res.json())
      .then((data) => {
        setFilteredProducts(data);
      });

  };

  const handleAdd = (newItem) => {

      fetch('https://karinialassignment-production.up.railway.app/api/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(newItem)
      })
          .then(res => res.json())
          .then(data => {
              setCart((prevItems) => [...prevItems, newItem]);
              console.log('Success:', data);})
          .catch((error) => {
              console.error('Error:', error);
          });
  };

  const handleCart = () => {
    router.push("/cart");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div></div>
        <div>
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
            width={100}
            height={80}
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
                  <p>{obj["Title"] || "Untitled Product"}</p>
                  <p>SKU: {obj["Variant SKU"]}</p>
                  <p>${obj["Variant Price"]}</p>
                  <button
                      className={styles.addToCartBtn}
                    onClick={() => handleAdd(obj)}
                    >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

        ) : (
          <p>NO RESULTS FOUND</p>
        )}
      </main>
    </div>
  );
}
