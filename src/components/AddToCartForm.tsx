'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface AddToCartFormProps {
  product: Product;
}

export function AddToCartForm({ product }: AddToCartFormProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart(product, quantity);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4">
      <div className="flex items-center border rounded-md">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(quantity - 1)}
          disabled={quantity <= 1}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={e => handleQuantityChange(parseInt(e.target.value, 10))}
          className="w-16 text-center border-0 focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          min="1"
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-10 w-10"
          onClick={() => handleQuantityChange(quantity + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button type="submit" size="lg">
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>
    </form>
  );
}
