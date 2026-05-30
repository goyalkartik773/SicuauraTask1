export const PRODUCTS_PER_PAGE = 12;

export const PRICE_RANGE = { min: 0, max: 5000 };

export interface CategoryInfo {
  slug: string;
  name: string;
  icon: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { slug: 'all', name: 'All Products', icon: 'LayoutGrid' },
  { slug: 'beauty', name: 'Beauty', icon: 'Sparkles' },
  { slug: 'fragrances', name: 'Fragrances', icon: 'Sparkles' },
  { slug: 'furniture', name: 'Furniture', icon: 'Armchair' },
  { slug: 'groceries', name: 'Groceries', icon: 'ShoppingBag' },
  { slug: 'home-decoration', name: 'Home Decoration', icon: 'Home' },
  { slug: 'kitchen-accessories', name: 'Kitchen Accessories', icon: 'ChefHat' },
  { slug: 'laptops', name: 'Laptops', icon: 'Laptop' },
  { slug: 'mens-shirts', name: 'Men\'s Shirts', icon: 'Shirt' },
  { slug: 'mens-shoes', name: 'Men\'s Shoes', icon: 'Footprints' },
  { slug: 'mens-watches', name: 'Men\'s Watches', icon: 'Watch' },
  { slug: 'mobile-accessories', name: 'Mobile Accessories', icon: 'Smartphone' },
  { slug: 'womens-bags', name: 'Women\'s Bags', icon: 'Briefcase' },
  { slug: 'womens-dresses', name: 'Women\'s Dresses', icon: 'Sparkles' },
  { slug: 'womens-jewellery', name: 'Women\'s Jewellery', icon: 'Gem' },
  { slug: 'womens-shoes', name: 'Women\'s Shoes', icon: 'Footprints' },
  { slug: 'womens-watches', name: 'Women\'s Watches', icon: 'Watch' },
  { slug: 'tops', name: 'Tops', icon: 'Shirt' },
  { slug: 'sunglasses', name: 'Sunglasses', icon: 'Glasses' },
  { slug: 'sports-accessories', name: 'Sports Accessories', icon: 'Dumbbell' },
  { slug: 'skin-care', name: 'Skin Care', icon: 'Heart' },
];
