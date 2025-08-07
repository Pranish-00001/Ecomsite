'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Bot } from 'lucide-react';

import { useCart } from '@/context/CartContext';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

export function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/admin/dashboard', label: 'Admin' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          
          <span className="font-bold hidden sm:inline-block">E-com Store</span>
        </Link>
        <nav className="flex items-center space-x-4 lg:space-x-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="/cart" aria-label="Open shopping cart">
            <Button variant="ghost" size="icon">
              <div className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full p-1 text-xs"
                  >
                    {cartCount}
                  </Badge>
                )}
              </div>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
