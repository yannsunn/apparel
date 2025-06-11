import { Product, Category, Size, Color } from '../types/product'

export const categories: Category[] = [
  { id: '1', name: 'トップス', slug: 'tops' },
  { id: '2', name: 'ボトムス', slug: 'bottoms' },
  { id: '3', name: 'アウター', slug: 'outerwear' },
  { id: '4', name: 'アクセサリー', slug: 'accessories' },
]

export const sizes: Size[] = [
  { id: '1', name: 'エクストラスモール', code: 'XS', order: 1 },
  { id: '2', name: 'スモール', code: 'S', order: 2 },
  { id: '3', name: 'ミディアム', code: 'M', order: 3 },
  { id: '4', name: 'ラージ', code: 'L', order: 4 },
  { id: '5', name: 'エクストララージ', code: 'XL', order: 5 },
  { id: '6', name: 'ダブルエクストララージ', code: 'XXL', order: 6 },
]

export const colors: Color[] = [
  { id: '1', name: '黒', code: 'BLK', hex: '#000000' },
  { id: '2', name: '白', code: 'WHT', hex: '#FFFFFF' },
  { id: '3', name: 'ネイビー', code: 'NVY', hex: '#1F2937' },
  { id: '4', name: 'グレー', code: 'GRY', hex: '#6B7280' },
  { id: '5', name: 'ベージュ', code: 'BEI', hex: '#D4B896' },
  { id: '6', name: 'ブラウン', code: 'BRN', hex: '#8B4513' },
]

export const products: Product[] = [
  {
    id: '1',
    name: 'プレミアムコットンTシャツ',
    description: 'オーガニックコットン100%使用の、柔らかく快適な着心地のプレミアムTシャツ。クラシックフィットで日常使いに最適です。',
    price: 2980,
    originalPrice: 3980,
    currency: 'JPY',
    images: ['/images/products/tshirt-1.jpg', '/images/products/tshirt-2.jpg'],
    category: categories[0],
    sizes: sizes.slice(0, 5),
    colors: [colors[0], colors[1], colors[2]],
    stock: [
      { sizeId: '2', colorId: '1', quantity: 15, sku: 'TSH-BLK-S' },
      { sizeId: '3', colorId: '1', quantity: 20, sku: 'TSH-BLK-M' },
      { sizeId: '4', colorId: '1', quantity: 18, sku: 'TSH-BLK-L' },
      { sizeId: '2', colorId: '2', quantity: 12, sku: 'TSH-WHT-S' },
      { sizeId: '3', colorId: '2', quantity: 25, sku: 'TSH-WHT-M' },
      { sizeId: '4', colorId: '2', quantity: 15, sku: 'TSH-WHT-L' },
    ],
    brand: 'アーバンベーシックス',
    tags: ['コットン', 'カジュアル', 'ベーシック', 'サステナブル'],
    featured: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'スリムフィットデニムジーンズ',
    description: '日本製プレミアムデニムを使用したモダンスリムフィットジーンズ。ストレッチ素材で一日中快適に着用できます。',
    price: 8900,
    originalPrice: 12900,
    currency: 'JPY',
    images: ['/images/products/jeans-1.jpg', '/images/products/jeans-2.jpg'],
    category: categories[1],
    sizes: sizes.slice(1, 5),
    colors: [colors[0], colors[2], colors[3]],
    stock: [
      { sizeId: '2', colorId: '1', quantity: 10, sku: 'JNS-BLK-S' },
      { sizeId: '3', colorId: '1', quantity: 15, sku: 'JNS-BLK-M' },
      { sizeId: '4', colorId: '1', quantity: 12, sku: 'JNS-BLK-L' },
      { sizeId: '3', colorId: '3', quantity: 20, sku: 'JNS-NVY-M' },
      { sizeId: '4', colorId: '3', quantity: 18, sku: 'JNS-NVY-L' },
    ],
    brand: 'デニムカンパニー',
    tags: ['デニム', 'スリムフィット', 'ストレッチ', '日本製'],
    featured: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'ライトウェイト ウィンドブレーカー',
    description: '天候の変化に対応する撥水加工のウィンドブレーカー。ジップポケットと調整可能なフードを備えています。',
    price: 12800,
    currency: 'JPY',
    images: ['/images/products/windbreaker-1.jpg', '/images/products/windbreaker-2.jpg'],
    category: categories[2],
    sizes: sizes.slice(1, 6),
    colors: [colors[0], colors[2], colors[4]],
    stock: [
      { sizeId: '2', colorId: '1', quantity: 8, sku: 'WND-BLK-S' },
      { sizeId: '3', colorId: '1', quantity: 12, sku: 'WND-BLK-M' },
      { sizeId: '4', colorId: '1', quantity: 10, sku: 'WND-BLK-L' },
      { sizeId: '5', colorId: '1', quantity: 6, sku: 'WND-BLK-XL' },
    ],
    brand: 'ウェザープロ',
    tags: ['ウィンドブレーカー', '撥水', '軽量', 'アウトドア'],
    featured: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-25'),
  },
  {
    id: '4',
    name: 'Classic Oxford Shirt',
    description: 'Timeless oxford shirt made from premium cotton. Perfect for both casual and formal occasions.',
    price: 6900,
    originalPrice: 8900,
    currency: 'JPY',
    images: ['/images/products/oxford-1.jpg', '/images/products/oxford-2.jpg'],
    category: categories[0],
    sizes: sizes.slice(0, 5),
    colors: [colors[1], colors[2], colors[3]],
    stock: [
      { sizeId: '2', colorId: '2', quantity: 14, sku: 'OXF-WHT-S' },
      { sizeId: '3', colorId: '2', quantity: 20, sku: 'OXF-WHT-M' },
      { sizeId: '4', colorId: '2', quantity: 16, sku: 'OXF-WHT-L' },
      { sizeId: '3', colorId: '3', quantity: 18, sku: 'OXF-NVY-M' },
    ],
    brand: 'Classic Style',
    tags: ['oxford', 'formal', 'cotton', 'business'],
    featured: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-28'),
  },
  {
    id: '5',
    name: 'Canvas Sneakers',
    description: 'Comfortable canvas sneakers with vulcanized rubber sole. A versatile choice for everyday wear.',
    price: 5900,
    currency: 'JPY',
    images: ['/images/products/sneakers-1.jpg', '/images/products/sneakers-2.jpg'],
    category: categories[3],
    sizes: [
      { id: '7', name: '25cm', code: '25', order: 1 },
      { id: '8', name: '26cm', code: '26', order: 2 },
      { id: '9', name: '27cm', code: '27', order: 3 },
      { id: '10', name: '28cm', code: '28', order: 4 },
    ],
    colors: [colors[0], colors[1], colors[2]],
    stock: [
      { sizeId: '7', colorId: '1', quantity: 10, sku: 'SNK-BLK-25' },
      { sizeId: '8', colorId: '1', quantity: 15, sku: 'SNK-BLK-26' },
      { sizeId: '9', colorId: '1', quantity: 12, sku: 'SNK-BLK-27' },
      { sizeId: '7', colorId: '2', quantity: 20, sku: 'SNK-WHT-25' },
      { sizeId: '8', colorId: '2', quantity: 25, sku: 'SNK-WHT-26' },
    ],
    brand: 'Street Kicks',
    tags: ['sneakers', 'canvas', 'casual', 'comfortable'],
    featured: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-30'),
  },
  {
    id: '6',
    name: 'Leather Belt',
    description: 'Genuine leather belt with brushed metal buckle. A classic accessory that complements any outfit.',
    price: 4500,
    currency: 'JPY',
    images: ['/images/products/belt-1.jpg', '/images/products/belt-2.jpg'],
    category: categories[3],
    sizes: [
      { id: '11', name: '80cm', code: '80', order: 1 },
      { id: '12', name: '85cm', code: '85', order: 2 },
      { id: '13', name: '90cm', code: '90', order: 3 },
      { id: '14', name: '95cm', code: '95', order: 4 },
    ],
    colors: [colors[0], colors[5]],
    stock: [
      { sizeId: '11', colorId: '1', quantity: 15, sku: 'BLT-BLK-80' },
      { sizeId: '12', colorId: '1', quantity: 20, sku: 'BLT-BLK-85' },
      { sizeId: '13', colorId: '1', quantity: 18, sku: 'BLT-BLK-90' },
      { sizeId: '11', colorId: '6', quantity: 12, sku: 'BLT-BRN-80' },
      { sizeId: '12', colorId: '6', quantity: 15, sku: 'BLT-BRN-85' },
    ],
    brand: 'Leather Works',
    tags: ['leather', 'belt', 'accessory', 'classic'],
    featured: false,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-02-01'),
  }
]

export function getProductById(id: string): Product | undefined {
  return products.find(product => product.id === id)
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter(product => product.category.id === categoryId)
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    product.brand.toLowerCase().includes(lowerQuery)
  )
}