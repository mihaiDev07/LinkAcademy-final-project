import { apiRequest } from './api';

import type { Product } from '../types/Product';
import type { ApiProduct } from '../types/ApiProduct';

import productImages from './productImages';

function normalizeProduct(product: ApiProduct): Product {
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: productImages[(product.id - 1) % productImages.length],
    inStock: product.inStock ?? true,
    discount: product.discount ?? 0,
  };
}

export async function getProducts(): Promise<Product[]> {
  const data = await apiRequest<ApiProduct[]>('/products');

  return data.map((product) => normalizeProduct(product));
}

export async function getProduct(id: number): Promise<Product> {
  const data = await apiRequest<ApiProduct>(`/products/${id}`);

  return normalizeProduct(data);
}
