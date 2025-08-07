export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  fullDescription: string;
}

export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  brand: string;
  category: string;
  stock: number;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}
