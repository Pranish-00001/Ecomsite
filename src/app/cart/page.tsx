'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center space-y-4 py-16">
        <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground" />
        <h1 className="text-2xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 gap-12 items-start">
      <div className="lg:col-span-2">
        <h1 className="text-3xl font-bold mb-6 font-headline">Your Cart ({cartCount})</h1>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-6 p-6">
                  <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" data-ai-hint={`${item.name.split(' ')[1].toLowerCase()} ${item.name.split(' ')[0].toLowerCase()}`} />
                  </div>
                  <div className="flex-grow grid sm:grid-cols-3 gap-4 items-center">
                    <div>
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center border rounded-md w-fit">
                       <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                         <Minus className="h-4 w-4" />
                       </Button>
                       <Input value={item.quantity} className="w-12 h-8 text-center border-0 focus-visible:ring-0" readOnly />
                       <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                         <Plus className="h-4 w-4" />
                       </Button>
                    </div>
                    <div className="flex items-center justify-end gap-4">
                      <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
                      <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <Card className="sticky top-24">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild size="lg" className="w-full">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
