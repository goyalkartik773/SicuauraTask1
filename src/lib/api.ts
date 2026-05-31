import { Product, Category, FilterState, ProductsApiResponse } from "../types";
import { PRODUCTS_PER_PAGE } from "./constants";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`https://dummyjson.com${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API request failed for path: ${path} with status: ${res.status}`);
  return res.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const data = await apiFetch<unknown>('/products/categories');
  
  if (Array.isArray(data)) {
    return data.map((cat: unknown) => {
      if (typeof cat === 'string') {
        return {
          slug: cat,
          name: cat
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' '),
          url: `https://dummyjson.com/products/category/${cat}`
        };
      }
      const obj = cat as { slug?: string; name?: string; url?: string };
      return {
        slug: obj.slug || '',
        name: obj.name || '',
        url: obj.url || `https://dummyjson.com/products/category/${obj.slug || ''}`
      };
    });
  }
  
  throw new Error('Invalid categories response format from API');
}

export async function fetchProducts(filters?: Partial<FilterState>): Promise<ProductsApiResponse> {
  const q = filters?.q || '';
  const category = filters?.category || 'all';
  const minPrice = filters?.minPrice ?? 0;
  const maxPrice = filters?.maxPrice ?? 5000;
  const sortBy = filters?.sortBy || 'default';
  const page = filters?.page || 1;

  let path = '/products';
  if (category !== 'all') {
    path = `/products/category/${category}`;
  } else if (q) {
    path = `/products/search`;
  }
  
  const params = new URLSearchParams();
  params.set('limit', '0');
  if (q && category === 'all') {
    params.set('q', q);
  }
  
  const data = await apiFetch<{ products: Product[] }>(`${path}?${params.toString()}`);
  let products = data.products;
  
  if (category !== 'all' && q) {
    const searchLower = q.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(searchLower) || 
      p.description.toLowerCase().includes(searchLower) ||
      (p.brand && p.brand.toLowerCase().includes(searchLower))
    );
  }
  
  products = products.filter(p => {
    const priceINR = p.price * 83;
    return priceINR >= minPrice && priceINR <= maxPrice;
  });
  
  if (sortBy === 'price-asc') {
    products.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    products.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    products.sort((a, b) => b.rating - a.rating);
  }
  
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

export async function fetchProductById(id: number): Promise<Product> {
  return apiFetch<Product>(`/products/${id}`);
}

export async function fetchFeaturedProducts(): Promise<Product[]> {
  const data = await apiFetch<{ products: Product[] }>('/products?limit=8');
  return data.products;
}
