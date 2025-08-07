import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';

export default function ConfirmationPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold mt-6 font-headline">Order Confirmed!</CardTitle>
          <CardDescription className="text-lg mt-2">
            Thank you for your purchase.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You will receive an email confirmation shortly. Your order is being processed and will be shipped soon.
          </p>
          <Button asChild className="mt-8" size="lg">
            <Link href="/">Continue Shopping</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
