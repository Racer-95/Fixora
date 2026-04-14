import type { BookingStatus, PaymentMethod, UserRole } from "./entities.types.js";
export interface RegisterDTO {
    name: string;
    email: string;
    password: string;
    role?: UserRole;
    /** Provider-only fields */
    skills?: string[];
    availability?: boolean;
}
export interface LoginDTO {
    email: string;
    password: string;
}
export interface AuthResponseDTO {
    success: boolean;
    token: string;
    user: {
        id: string;
        name: string;
        email: string;
        role: UserRole;
    };
}
export interface UpdateProfileDTO {
    name?: string;
    skills?: string[];
    availability?: boolean;
}
export interface CreateBookingDTO {
    providerId: string;
    serviceId: string;
    scheduledTime: string;
}
export interface UpdateBookingStatusDTO {
    status: BookingStatus;
}
export interface CreateServiceDTO {
    name: string;
    category: string;
    basePrice: number;
    latitude: number;
    longitude: number;
}
export interface UpdateServiceDTO {
    name?: string;
    category?: string;
    basePrice?: number;
    latitude?: number;
    longitude?: number;
}
export interface CreateReviewDTO {
    bookingId: string;
    rating: number;
    comment: string;
}
export interface UpdateReviewDTO {
    rating?: number;
    comment?: string;
}
export interface CreatePaymentDTO {
    bookingId: string;
    amount: number;
    method: PaymentMethod;
}
export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}
export interface PaginatedResponse<T = unknown> {
    success: boolean;
    data: T[];
    total: number;
    page: number;
    limit: number;
}
//# sourceMappingURL=dto.types.d.ts.map