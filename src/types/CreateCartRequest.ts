export type CreateCartRequest = {
  userId: number;
  products: {
    id: number;
    quantity: number;
  }[];
};
