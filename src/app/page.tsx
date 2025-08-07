import { getProducts } from '@/lib/products';
import { ProductCard } from '@/components/ProductCard';

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8 font-headline">
        Our Products
      </h1>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
