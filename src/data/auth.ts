import { apiRequest } from './api';

import type { LoginRequest } from '../types/LoginRequest';
import type { LoginResponse } from '../types/LoginResponse';
import type { RegisterRequest } from '../types/RegisterRequest';
import type { RegisterResponse } from '../types/RegisterResponse';

export function login(data: LoginRequest) {
  return apiRequest<LoginResponse>('/auth/login', {
    method: 'POST',
    body: data,
  });
}

export function register(data: RegisterRequest) {
  return apiRequest<RegisterResponse>('/users', {
    method: 'POST',
    body: data,
  });
}
