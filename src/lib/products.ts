import type { Product, ApiProduct } from '@/lib/types';
import 'server-only';

let cachedProducts: Product[] | null = null;

async function fetchProductsFromApi(): Promise<Product[]> {
  if (cachedProducts) {
    return cachedProducts;
  }
  
  try {
    const url = 'https://api.freeapi.app/api/v1/public/randomproducts?page=1&limit=10';
    const options = { method: 'GET', headers: { accept: 'application/json' }, cache: 'no-store' as RequestCache };
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    if (data && data.data && data.data.data && Array.isArray(data.data.data)) {
      const transformedProducts: Product[] = data.data.data.map((p: ApiProduct) => ({
        id: p.id.toString(),
        name: p.title,
        description: p.description.length > 50 ? p.description.substring(0, 50) + '...' : p.description,
        price: p.price,
        image: p.images && p.images.length > 0 ? p.images[0] : 'https://placehold.co/600x400.png',
        fullDescription: p.description,
      }));
      cachedProducts = transformedProducts;
      return transformedProducts;
    } else {
      console.error('Unexpected API response structure:', data);
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return []; 
  }
}


export const getProducts = async (): Promise<Product[]> => {
  return await fetchProductsFromApi();
};

export const getProductById = async (id: string): Promise<Product | undefined> => {
  const products = await fetchProductsFromApi();
  return products.find(p => p.id === id);
};
