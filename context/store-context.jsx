"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import products from "@/data/products.json";

const STORAGE_KEY = "demo-hirdavat-store";

const initialState = {
  cart: [],
  user: null,
  orders: []
};

const StoreContext = createContext(undefined);

function getStoredState() {
  if (typeof window === "undefined") {
    return initialState;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return initialState;
    }
    return { ...initialState, ...JSON.parse(raw) };
  } catch {
    return initialState;
  }
}

export function StoreProvider({ children }) {
  const [state, setState] = useState(initialState);
  const [hydrated, setHydrated] = useState(false);
  const [cartNotice, setCartNotice] = useState(null);

  useEffect(() => {
    setState(getStoredState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  useEffect(() => {
    if (!cartNotice) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setCartNotice(null);
    }, 2400);

    return () => window.clearTimeout(timeout);
  }, [cartNotice]);

  const cartItemsDetailed = useMemo(() => {
    return state.cart
      .map((item) => {
        const product = products.find((entry) => entry.slug === item.slug);
        if (!product) {
          return null;
        }
        return {
          ...product,
          quantity: item.quantity,
          lineTotal: Number((product.price * item.quantity).toFixed(2))
        };
      })
      .filter(Boolean);
  }, [state.cart]);

  const cartCount = cartItemsDetailed.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = Number(
    cartItemsDetailed.reduce((total, item) => total + item.lineTotal, 0).toFixed(2)
  );

  const addToCart = (slug, quantity = 1) => {
    const product = products.find((entry) => entry.slug === slug);

    setState((current) => {
      const existing = current.cart.find((item) => item.slug === slug);
      if (existing) {
        return {
          ...current,
          cart: current.cart.map((item) =>
            item.slug === slug ? { ...item, quantity: item.quantity + quantity } : item
          )
        };
      }

      return {
        ...current,
        cart: [...current.cart, { slug, quantity }]
      };
    });

    if (product) {
      setCartNotice({
        id: Date.now(),
        title: "Sepete eklendi",
        message: `${product.name} sepetinize eklendi.`,
        quantity
      });
    }
  };

  const dismissCartNotice = () => {
    setCartNotice(null);
  };

  const updateCartQuantity = (slug, quantity) => {
    setState((current) => ({
      ...current,
      cart: current.cart
        .map((item) => (item.slug === slug ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    }));
  };

  const removeFromCart = (slug) => {
    setState((current) => ({
      ...current,
      cart: current.cart.filter((item) => item.slug !== slug)
    }));
  };

  const registerUser = (payload) => {
    const user = {
      id: `U-${Date.now()}`,
      ...payload,
      createdAt: new Date().toISOString()
    };

    setState((current) => ({
      ...current,
      user
    }));

    return user;
  };

  const createOrder = (payload) => {
    const shippingCost = cartSubtotal > 0 ? 149.9 : 0;
    const order = {
      id: `SIP-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: "Sipariş oluşturuldu",
      items: cartItemsDetailed,
      subtotal: cartSubtotal,
      shippingCost,
      total: Number((cartSubtotal + shippingCost).toFixed(2)),
      customer: state.user,
      ...payload
    };

    setState((current) => ({
      ...current,
      orders: [order, ...current.orders],
      cart: []
    }));

    return order;
  };

  const value = {
    hydrated,
    user: state.user,
    orders: state.orders,
    cartItemsDetailed,
    cartCount,
    cartSubtotal,
    cartNotice,
    addToCart,
    dismissCartNotice,
    updateCartQuantity,
    removeFromCart,
    registerUser,
    createOrder
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);

  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }

  return context;
}
