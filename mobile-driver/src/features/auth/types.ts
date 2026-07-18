export interface AuthState { isAuthenticated: boolean; user: AuthUser | null; accessToken: string | null; refreshToken: string | null; }
export interface AuthUser { id: string; fullName: string; email: string; phone: string; role: 'passenger' | 'driver'; photoUrl?: string; }
export interface LoginResponse { userId: string; fullName: string; email: string; role: 'passenger' | 'driver'; accessToken: string; refreshToken: string; expiresIn: number; tokenType: string; }
