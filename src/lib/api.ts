import { Book } from "@/types";

const API_BASE = "/api";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ error: "Unknown error" }));
    throw new ApiError(response.status, error.error || "Request failed");
  }

  return response.json();
}

// Book API functions
export const bookApi = {
  //   getAll: (filters: BookFilters = {}) => {
  //     const params = new URLSearchParams();
  //     Object.entries(filters).forEach(([key, value]) => {
  //       if (value !== undefined) params.append(key, String(value));
  //     });
  //     return apiRequest<{ books: Book[]; pagination: any }>(`/books?${params}`);
  //   },

  //   getById: (id: string) => apiRequest<Book>(`/books/${id}`),

  create: (data: Book) =>
    apiRequest<Book>("/books", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  //   update: (id: string, data: UpdateBookData) =>
  //     apiRequest<Book>(`/books/${id}`, {
  //       method: 'PUT',
  //       body: JSON.stringify(data),
  //     }),

  delete: (id: string) =>
    apiRequest<{ success: boolean }>(`/books/${id}`, {
      method: "DELETE",
    }),
};

// Test database connection
export const testDatabase = () => apiRequest<any>("/test-db");
export const testDatabaseQuery = () => apiRequest<any>("/books");
