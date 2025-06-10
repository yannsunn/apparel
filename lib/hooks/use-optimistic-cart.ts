'use client'

import { useOptimistic, useTransition, startTransition } from 'react'
import { useCartStore } from '@/lib/store/cart'
import { Product } from '@/lib/types/product'

export function useOptimisticCart() {
  const cart = useCartStore()
  const [isPending, startTransition] = useTransition()
  
  // React 19 useOptimistic for ultra-fast UI updates
  const [optimisticItems, setOptimisticItems] = useOptimistic(
    cart.items,
    (state, newItem: { type: 'add' | 'remove' | 'update', payload: any }) => {
      switch (newItem.type) {
        case 'add':
          const existingIndex = state.findIndex(
            item => 
              item.productId === newItem.payload.productId &&
              item.sizeId === newItem.payload.sizeId &&
              item.colorId === newItem.payload.colorId
          )
          
          if (existingIndex >= 0) {
            return state.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + newItem.payload.quantity }
                : item
            )
          } else {
            return [...state, {
              id: `${newItem.payload.productId}-${newItem.payload.sizeId}-${newItem.payload.colorId}`,
              ...newItem.payload
            }]
          }
          
        case 'remove':
          return state.filter(item => item.id !== newItem.payload.id)
          
        case 'update':
          return state.map(item =>
            item.id === newItem.payload.id
              ? { ...item, quantity: newItem.payload.quantity }
              : item
          )
          
        default:
          return state
      }
    }
  )

  const addToCartOptimistic = (product: Product, sizeId: string, colorId: string, quantity: number = 1) => {
    // Immediate optimistic update
    setOptimisticItems({
      type: 'add',
      payload: {
        productId: product.id,
        product,
        sizeId,
        colorId,
        quantity,
        price: product.price
      }
    })

    // Actual state update with transition
    startTransition(() => {
      cart.addItem(product, sizeId, colorId, quantity)
    })
  }

  const removeFromCartOptimistic = (itemId: string) => {
    setOptimisticItems({
      type: 'remove',
      payload: { id: itemId }
    })

    startTransition(() => {
      cart.removeItem(itemId)
    })
  }

  const updateQuantityOptimistic = (itemId: string, quantity: number) => {
    setOptimisticItems({
      type: 'update',
      payload: { id: itemId, quantity }
    })

    startTransition(() => {
      cart.updateQuantity(itemId, quantity)
    })
  }

  return {
    items: optimisticItems,
    isPending,
    totalItems: () => optimisticItems.reduce((sum, item) => sum + item.quantity, 0),
    subtotal: () => optimisticItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    addToCart: addToCartOptimistic,
    removeFromCart: removeFromCartOptimistic,
    updateQuantity: updateQuantityOptimistic,
    clearCart: cart.clearCart,
    toggleCart: cart.toggleCart,
    setCartOpen: cart.setCartOpen,
    isOpen: cart.isOpen
  }
}