'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Product } from '@/types';

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
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; size: string; color: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const CartContext = createContext<{
  cart: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number, size: string, color: string) => void;
  updateQuantity: (id: number, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
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

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
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

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: number, size: string, color: string) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { id, size, color } });
  const updateQuantity = (id: number, size: string, color: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, size, color, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ cart: state.items, addItem, removeItem, updateQuantity, clearCart }}>
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
