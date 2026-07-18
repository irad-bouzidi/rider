export interface ApiResponse<T> { success: boolean; data: T; error?: ApiError; meta?: PaginationMeta; }
export interface ApiError { code: string; message: string; details?: Record<string, string[]>; }
export interface PaginationMeta { page: number; pageSize: number; totalItems: number; totalPages: number; }
export interface PaginatedResponse<T> { items: T[]; meta: PaginationMeta; }
