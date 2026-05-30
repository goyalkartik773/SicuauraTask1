export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  images: string[];
  category: string;
  rating: number;
  discountPercentage: number;
  stock: number;
  description: string;
  brand?: string;
  tags?: string[];
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'rating' | 'default';

export interface FilterState {
  q: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  sortBy: SortOption;
  page: number;
}

export interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
