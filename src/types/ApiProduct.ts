export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  inStock?: boolean;
  discount?: number;
}
