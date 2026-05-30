import { Product, Category, FilterState, ProductsApiResponse } from "../types";
import { PRODUCTS_PER_PAGE } from "./constants";

const BASE_URL = 'https://dummyjson.com';

/**
 * Fetch all product categories from DummyJSON.
 * Standardizes both new (object array) and older (string array) API versions.
 */
export async function fetchCategories(): Promise<Category[]> {
  const url = `${BASE_URL}/products/categories`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  
  if (Array.isArray(data)) {
    return data.map((cat: unknown) => {
      if (typeof cat === 'string') {
        return {
          slug: cat,
          name: cat
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          url: `${BASE_URL}/products/category/${cat}`
        };
      }
      const obj = cat as { slug?: string; name?: string; url?: string };
      return {
        slug: obj.slug || '',
        name: obj.name || '',
        url: obj.url || `${BASE_URL}/products/category/${obj.slug || ''}`
      };
    });
  }
  
  throw new Error('Invalid categories response format');
}

/**
 * Fetch products using optional category, search query, price ranges, and sort options.
 * Utilizes in-memory filters for robust combined query + category search and price-bounding (INR conversion).
 */
export async function fetchProducts(filters?: Partial<FilterState>): Promise<ProductsApiResponse> {
  const q = filters?.q || '';
  const category = filters?.category || 'all';
  const minPrice = filters?.minPrice ?? 0;
  const maxPrice = filters?.maxPrice ?? 5000;
  const sortBy = filters?.sortBy || 'default';
  const page = filters?.page || 1;

  // We fetch matching items from the appropriate category or search endpoint.
  // Using limit=0 retrieves all items matching the category or search, allowing us
  // to apply correct price ranges and sorting before paginating.
  let url = `${BASE_URL}/products`;
  
  if (category !== 'all') {
    url = `${BASE_URL}/products/category/${category}`;
  } else if (q) {
    url = `${BASE_URL}/products/search`;
  }
  
  const urlObj = new URL(url);
  urlObj.searchParams.set('limit', '0');
  
  if (q && category === 'all') {
    urlObj.searchParams.set('q', q);
  }
  
  const res = await fetch(urlObj.toString(), { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  let products = data.products as Product[];
  
  // 1. If a category is selected and a query is also provided, filter by search query in-memory
  if (category !== 'all' && q) {
    const searchLower = q.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      p.brand?.toLowerCase().includes(searchLower)
    );
  }
  
  // 2. Filter by price range (INR conversion)
  products = products.filter(p => {
    const priceINR = p.price * 83;
    return priceINR >= minPrice && priceINR <= maxPrice;
  });
  
  // 3. Sort products
  if (sortBy === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  }
  
  // 4. Paginate the resulting collection
  const total = products.length;
  const skip = (page - 1) * PRODUCTS_PER_PAGE;
  const paginatedProducts = products.slice(skip, skip + PRODUCTS_PER_PAGE);
  
  return {
    products: paginatedProducts,
    total,
    skip,
    limit: PRODUCTS_PER_PAGE
  };
}

/**
 * Fetch a single product by its unique ID.
 */
export async function fetchProductById(id: number): Promise<Product> {
  const url = `${BASE_URL}/products/${id}`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch product by ID ${id}: ${res.status} ${res.statusText}`);
  }
  
  return await res.json();
}

/**
 * Fetch featured products (limits output to 8 items).
 */
export async function fetchFeaturedProducts(): Promise<Product[]> {
  const url = `${BASE_URL}/products?limit=8`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  
  if (!res.ok) {
    throw new Error(`Failed to fetch featured products: ${res.status} ${res.statusText}`);
  }
  
  const data = await res.json();
  return data.products as Product[];
}
