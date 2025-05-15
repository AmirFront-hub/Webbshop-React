import { create } from 'zustand';

export const useCartStore = create(set => ({
  cart: [],
  setCart: (cart) => set({ cart }),
  updateQuantity: (id, delta) =>
    set(state => ({
      cart: state.cart.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    }))
}));