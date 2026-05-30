'use client';

import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { Product } from '@/types';
import { getDiscountedPrice } from '@/lib/utils';

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: number; size: string; color: string } }
  | { type: 'REMOVE_ITEM_BY_ID'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; size: string; color: string; quantity: number } }
  | { type: 'UPDATE_QUANTITY_BY_ID'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  items: CartItem[];
  cart: CartItem[];
  addItem: (product: Product | CartItem, size?: string, color?: string, quantity?: number) => void;
  removeItem: (id: number, size?: string, color?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string, color?: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  totalDiscount: number;
  finalTotal: number;
  couponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
} | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIdx = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingIdx > -1) {
        const nextItems = [...state.items];
        nextItems[existingIdx].quantity += action.payload.quantity;
        return { items: nextItems };
      }

      return { items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM': {
      return {
        items: state.items.filter(
          (item) =>
            !(
              item.product.id === action.payload.id &&
              item.size === action.payload.size &&
              item.color === action.payload.color
            )
        ),
      };
    }

    case 'REMOVE_ITEM_BY_ID': {
      return {
        items: state.items.filter((item) => item.product.id !== action.payload.id),
      };
    }

    case 'UPDATE_QUANTITY': {
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    }

    case 'UPDATE_QUANTITY_BY_ID': {
      return {
        items: state.items.map((item) =>
          item.product.id === action.payload.id
            ? { ...item, quantity: Math.max(1, action.payload.quantity) }
            : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [couponApplied, setCouponApplied] = useState(false);
  const [state, dispatch] = useReducer(cartReducer, { items: [] }, () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('gg_cart');
      if (stored) {
        try {
          return { items: JSON.parse(stored) };
        } catch {
          return { items: [] };
        }
      }
    }
    return { items: [] };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('gg_cart', JSON.stringify(state.items));
  }, [state.items]);

  // Load coupon from localStorage if saved
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCoupon = localStorage.getItem('gg_coupon_applied');
      if (savedCoupon === 'true') {
        setCouponApplied(true);
      }
    }
  }, []);

  const addItem = (
    productOrItem: Product | CartItem,
    size?: string,
    color?: string,
    quantity: number = 1
  ) => {
    if ('product' in productOrItem) {
      dispatch({ type: 'ADD_ITEM', payload: productOrItem });
    } else {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          product: productOrItem,
          size: size || 'M',
          color: color || 'Default',
          quantity,
        },
      });
    }
  };

  const removeItem = (id: number, size?: string, color?: string) => {
    if (size && color) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
    } else {
      dispatch({ type: 'REMOVE_ITEM_BY_ID', payload: { id } });
    }
  };

  const updateQuantity = (id: number, quantity: number, size?: string, color?: string) => {
    if (size && color) {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY_BY_ID', payload: { id, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    setCouponApplied(false);
    localStorage.removeItem('gg_coupon_applied');
  };

  const applyCoupon = (code: string) => {
    if (code.toUpperCase() === 'SAVE10') {
      setCouponApplied(true);
      localStorage.setItem('gg_coupon_applied', 'true');
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    localStorage.removeItem('gg_coupon_applied');
  };

  // Computed Values
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = state.items.reduce((sum, item) => {
    const discounted = getDiscountedPrice(item.product.price, item.product.discountPercentage);
    return sum + discounted * item.quantity;
  }, 0);

  const totalDiscount = state.items.reduce((sum, item) => {
    const discounted = getDiscountedPrice(item.product.price, item.product.discountPercentage);
    const savings = item.product.price - discounted;
    return sum + savings * item.quantity;
  }, 0);

  const couponDiscount = couponApplied ? subtotal * 0.1 : 0;
  
  // Free Shipping on orders above ₹2000 INR
  const subtotalINR = subtotal * 83;
  const shippingINR = subtotalINR >= 2000 || itemCount === 0 ? 0 : 99;
  const shippingUSD = shippingINR / 83;

  const finalTotal = subtotal - couponDiscount + shippingUSD;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cart: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        totalDiscount,
        finalTotal,
        couponApplied,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
