export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  currency: string
  images: string[]
  category: Category
  sizes: Size[]
  colors: Color[]
  stock: StockInfo[]
  brand: string
  tags: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
}

export interface Size {
  id: string
  name: string
  code: string
  order: number
}

export interface Color {
  id: string
  name: string
  code: string
  hex: string
}

export interface StockInfo {
  sizeId: string
  colorId: string
  quantity: number
  sku: string
}

export interface CartItem {
  id: string
  productId: string
  product?: Product
  sizeId: string
  colorId: string
  quantity: number
  price: number
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  createdAt: Date
  updatedAt: Date
}