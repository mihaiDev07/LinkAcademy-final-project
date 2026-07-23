import type { ApiRequestOptions } from '../types/ApiRequestOptions';

const BASE_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: options.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(API_KEY ? { 'x-api-key': API_KEY } : {}),
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = 'Request failed';

    try {
      const error = await response.json();
      console.error('API Error:', error);
      errorMessage = error.error ?? error.message ?? errorMessage;
    } catch {
      console.error('API Error:', response.statusText);
    }

    throw new Error(errorMessage);
  }

  return response.json() as Promise<T>;
}
