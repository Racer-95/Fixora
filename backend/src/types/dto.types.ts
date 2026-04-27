// ─────────────────────────────────────────────
//  FIXORA — Request / Response DTOs
//  Data Transfer Objects for all API endpoints.
//  Keeps controller signatures clean and typed.
// ─────────────────────────────────────────────

import type { BookingStatus, PaymentMethod, UserRole } from "./entities.types.js";

// ── Auth ─────────────────────────────────────
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
    _id: string;
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

// ── Booking ───────────────────────────────────
export interface CreateBookingDTO {
  providerId: string;
  serviceId: string;
  scheduledTime: string; // ISO date string from client
}

export interface UpdateBookingStatusDTO {
  status: BookingStatus;
}

// ── Service ───────────────────────────────────
export interface CreateServiceDTO {
  name: string;
  category: string;
  basePrice: number;
  city: string;
}

export interface UpdateServiceDTO {
  name?: string;
  category?: string;
  basePrice?: number;
  city?: string;
}

// ── Review ────────────────────────────────────
export interface CreateReviewDTO {
  bookingId: string;
  rating: number;        // 1–5
  comment: string;
}

export interface UpdateReviewDTO {
  rating?: number;
  comment?: string;
}

// ── Payment ───────────────────────────────────
export interface CreatePaymentDTO {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
}

// ── Generic API response wrapper ──────────────
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// ── Paginated list response ───────────────────
export interface PaginatedResponse<T = unknown> {
  success: boolean;
  data: T[];
  total: number;
  page: number;
  limit: number;
}
