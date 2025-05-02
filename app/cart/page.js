"use client";
import { useEffect, useState } from "react";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const fetchCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch('https://karinialassignment-production.up.railway.app/api/cart');
            const data = await response.json();
            setCart(data);
        } catch (error) {
            console.error("Error loading cart:", error);
            setCart([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleRemove = async (itemToRemove) => {
        try {
            setIsLoading(true);
            const deleteResponse = await fetch('https://karinialassignment-production.up.railway.app/api/cart', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(itemToRemove)
            });

            if (!deleteResponse.ok) {
                throw new Error('Failed to delete item');
            }

            await fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleBackBtn = ()=>{
        router.push("/");
    }
    return (
        <main className={styles.mainWrapper1}>
            <h1>ITEMS IN CART</h1>
            <div className={styles.productgrid1}>
                <div className={styles.productcard1}>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : cart.length > 0 ? (
                        cart.map((obj, index) => (
                            <div key={index} className={styles.cartItem}>
                                {obj["Image Src"] && (
                                    <img
                                        src={obj["Image Src"]}
                                        alt={obj["Title"] || "Product image"}
                                    />
                                )}
                                <p>{obj["Title"] || "Untitled Product"}</p>
                                <p>SKU: {obj["Variant SKU"]}</p>
                                <p>${obj["Variant Price"]}</p>
                                <button
                                    onClick={() => handleRemove(obj)}
                                    disabled={isLoading}
                                    className={styles.removeBtn}
                                >
                                    Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                </div>
                <div className={styles.productcard2}>
                    <div className={styles.orderSummary}>
                        <h2>Order Summary</h2>
                        <p>
                            <span>Total:</span>
                            <span>${cart.reduce((sum, item) => sum + (item["Variant Price"] || 0), 0).toFixed(2)}</span>
                        </p>
                        <button
                            disabled={cart.length === 0 || isLoading}
                            className={styles.checkoutBtn}
                        >
                            Proceed to Checkout
                        </button>
                        <button
                            disabled={cart.length === 0 || isLoading}
                            className={styles.checkoutBtn}
                            onClick={handleBackBtn}
                        >
                            Back to homepage
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
