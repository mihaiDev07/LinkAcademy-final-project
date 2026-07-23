import { apiRequest } from './api';

import type { Product } from '../types/Product';
import type { ApiProduct } from '../types/ApiProduct';

import productImages from './productImages';

function normalizeProduct(product: ApiProduct, index = 0): Product {
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

  return data.map((product, index) => normalizeProduct(product, index));
}

export async function getProduct(id: number): Promise<Product> {
  const data = await apiRequest<ApiProduct>(`/products/${id}`);

  return normalizeProduct(data);
}
// export async function createProduct(
//   product: Omit<Product, 'id'>,
// ): Promise<Product> {
//   const data = await apiRequest<ApiProduct>('/products', {
//     method: 'POST',
//     body: product,
//   });

//   return normalizeProduct(data);
// }

// export async function updateProduct(
//   id: number,
//   product: Product,
// ): Promise<Product> {
//   const data = await apiRequest<ApiProduct>(`/products/${id}`, {
//     method: 'PUT',
//     body: product,
//   });

//   return normalizeProduct(data);
// }

// export async function deleteProduct(id: number): Promise<void> {
//   await apiRequest<void>(`/products/${id}`, {
//     method: 'DELETE',
//   });
// }
