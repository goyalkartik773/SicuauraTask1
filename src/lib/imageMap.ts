const CATEGORY_IMAGES: Record<string, string[]> = {
  beauty: [
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=90',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=90',
    'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=90',
    'https://images.unsplash.com/photo-1583241475880-083f84372725?w=800&q=90',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=90',
    'https://images.unsplash.com/photo-1631214524020-3c69d1c6b0a1?w=800&q=90',
  ],
  fragrances: [
    'https://images.unsplash.com/photo-1541643600914-78b084683702?w=800&q=90',
    'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=800&q=90',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&q=90',
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=90',
  ],
  'womens-dresses': [
    'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?w=800&q=90',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=90',
    'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=90',
    'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=800&q=90',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=800&q=90',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=90',
  ],
  'womens-jewellery': [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=90',
    'https://images.unsplash.com/photo-1573408301185-9519f94815d4?w=800&q=90',
    'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=800&q=90',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=90',
    'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&q=90',
  ],
  'womens-bags': [
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=90',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=90',
    'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=90',
    'https://images.unsplash.com/photo-1601924638867-3a6de6b7a500?w=800&q=90',
  ],
  'womens-watches': [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=90',
    'https://images.unsplash.com/photo-1617206240240-24ab1e685a89?w=800&q=90',
    'https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?w=800&q=90',
  ],
  'mens-shirts': [
    'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=90',
    'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=90',
    'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=90',
    'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=800&q=90',
  ],
  'mens-shoes': [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90',
    'https://images.unsplash.com/photo-1608231387042-66d1773d3028?w=800&q=90',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800&q=90',
  ],
  'mens-watches': [
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=90',
    'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=90',
    'https://images.unsplash.com/photo-1548171916-c8fd5d32a4b3?w=800&q=90',
  ],
  tops: [
    'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=90',
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=90',
    'https://images.unsplash.com/photo-1562572159-4efd90232744?w=800&q=90',
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&q=90',
  ],
  'skin-care': [
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=90',
    'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&q=90',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=90',
  ],
  furniture: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=90',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&q=90',
    'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&q=90',
  ],
  groceries: [
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=90',
    'https://images.unsplash.com/photo-1506617420156-8e4536971650?w=800&q=90',
  ],
  laptops: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&q=90',
    'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&q=90',
  ],
  sunglasses: [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=90',
    'https://images.unsplash.com/photo-1577803645773-f96470509666?w=800&q=90',
  ],
}

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=90',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=90',
  'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=90',
  'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=90',
]

// Returns a consistent HD image for a product based on category + id
export function getProductImage(product: {
  id: number
  category: string
  thumbnail: string
}): string {
  const categoryImages = CATEGORY_IMAGES[product.category] || FALLBACK_IMAGES
  const index = product.id % categoryImages.length
  return categoryImages[index]
}

// Returns array of HD images for product detail gallery (4 images)
export function getProductGallery(product: {
  id: number
  category: string
  images: string[]
}): string[] {
  const categoryImages = CATEGORY_IMAGES[product.category] || FALLBACK_IMAGES
  return Array.from({ length: 4 }, (_, i) =>
    categoryImages[(product.id + i) % categoryImages.length]
  )
}
