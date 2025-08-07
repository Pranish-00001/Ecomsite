import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { AddToCartForm } from '@/components/AddToCartForm';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
      <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          unoptimized
          data-ai-hint={`${product.name.split(' ')[0].toLowerCase()} product`}
        />
      </div>
      <div className="space-y-6">
        <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
        <p className="text-3xl font-semibold text-primary">${product.price.toFixed(2)}</p>
        <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>
        <AddToCartForm product={product} />
      </div>
    </div>
  );
}
