import { fetchProductById, fetchProducts } from "@/lib/api";
import ProductDetailClient from "@/components/product/ProductDetailClient";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/config";
import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const product = await fetchProductById(Number(params.id));
    if (!product) {
      return {
        title: `Product Not Found | ${SITE_CONFIG.name}`,
        description: "Product details page",
      };
    }

    const title = `${product.title} | ${SITE_CONFIG.name}`;
    const description = product.description;
    const url = `${SITE_CONFIG.url}/product/${product.id}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url,
      },
      alternates: {
        canonical: url,
      },
    };
  } catch {
    return {
      title: `Product Details | ${SITE_CONFIG.name}`,
      description: "Product details page",
      alternates: {
        canonical: `${SITE_CONFIG.url}/product/${params.id}`,
      },
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

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": product.images || [product.thumbnail],
    "description": product.description,
    "sku": `GG-${product.id}`,
    "mpn": `GG-${product.id}`,
    "brand": {
      "@type": "Brand",
      "name": product.brand || SITE_CONFIG.name,
    },
    "offers": {
      "@type": "Offer",
      "url": `${SITE_CONFIG.url}/product/${product.id}`,
      "priceCurrency": "INR",
      "price": product.price * 83,
      "priceValidUntil": "2027-12-31",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  };

  return (
    <>
      <JsonLd schema={productSchema} />
      <ProductDetailClient product={product} similarProducts={similarProducts} />
    </>
  );
}
