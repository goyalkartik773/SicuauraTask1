import { fetchProductById, fetchProducts } from '@/lib/api';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props) {
  try {
    const product = await fetchProductById(Number(params.id));
    return {
      title: product ? `${product.title} | GG Fashion` : 'Product Not Found',
      description: product ? product.description : 'Product details page',
    };
  } catch {
    return {
      title: 'Product Details | GG Fashion',
      description: 'Product details page',
    };
  }
}

export default async function ProductPage({ params }: Props) {
  let product;
  try {
    product = await fetchProductById(Number(params.id));
  } catch {
    notFound();
  }

  if (!product) notFound();

  const { products: similar } = await fetchProducts({
    category: product.category,
    page: 1,
  });
  
  const similarProducts = similar.filter((p) => p.id !== product.id).slice(0, 4);

  return <ProductDetailClient product={product} similarProducts={similarProducts} />;
}
