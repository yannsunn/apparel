import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/lib/types/product'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  
  // Actions
  addItem: (product: Product, sizeId: string, colorId: string, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
  
  // Computed values
  totalItems: () => number
  subtotal: () => number
  tax: () => number
  shipping: () => number
  total: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, sizeId, colorId, quantity = 1) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => 
              item.productId === product.id && 
              item.sizeId === sizeId && 
              item.colorId === colorId
          )

          if (existingItemIndex >= 0) {
            // Update existing item quantity
            const updatedItems = [...state.items]
            updatedItems[existingItemIndex].quantity += quantity
            return { items: updatedItems }
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `${product.id}-${sizeId}-${colorId}`,
              productId: product.id,
              product,
              sizeId,
              colorId,
              quantity,
              price: product.price
            }
            return { items: [...state.items, newItem] }
          }
        })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        
        set((state) => ({
          items: state.items.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }))
      },

      setCartOpen: (open) => {
        set({ isOpen: open })
      },

      totalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      subtotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0)
      },

      tax: () => {
        const subtotal = get().subtotal()
        return Math.round(subtotal * 0.1) // 10% tax
      },

      shipping: () => {
        const subtotal = get().subtotal()
        return subtotal >= 10000 ? 0 : 500 // Free shipping over ¥10,000
      },

      total: () => {
        return get().subtotal() + get().tax() + get().shipping()
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // Only persist items
    }
  )
)