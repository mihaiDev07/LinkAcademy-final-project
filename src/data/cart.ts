import { apiRequest } from './api';

import type { CreateCartRequest } from '../types/CreateCartRequest';
import type { CreateCartResponse } from '../types/CreateCartResponse';

export function createCart(data: CreateCartRequest) {
  return apiRequest<CreateCartResponse>('/carts', {
    method: 'POST',
    body: data,
  });
}
