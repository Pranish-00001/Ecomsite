import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.id}`} className="group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1">
        <CardHeader>
          <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              unoptimized
              data-ai-hint={`${product.name.split(' ')[0].toLowerCase()} product`}
            />
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardTitle className="text-lg font-headline">{product.name}</CardTitle>
          <CardDescription className="mt-2">{product.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <p className="text-xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
