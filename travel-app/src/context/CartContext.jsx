import React, { Children, createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ Children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (item) => {
        const exists = cartItems.find(cart => cart.id === item.id);
        if (!exists) {
            setCartItems(prev => [...prev, item])
        }
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {Children}
        </CartContext.Provider>
    );
};