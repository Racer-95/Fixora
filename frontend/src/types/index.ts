export type UserRole = "customer" | "provider" | "admin";

export interface IService {
  _id: string;
  providerId: string | { _id: string; name: string; rating?: number; availability?: boolean };
  name: string;
  category: string;
  basePrice: number;
  city: string;
  createdAt: Date;
  rating?: number;
  reviewsCount?: number;
  imageUrl?: string;
}

export type BookingStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface IBooking {
  _id: string;
  customerId: string;
  providerId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: IUser;
}
