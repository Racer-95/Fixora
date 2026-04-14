// ─────────────────────────────────────────────
//  FIXORA — Entity Type Contracts
//  Mirrors the UML Class Diagram exactly.
//  All domain interfaces live here.
// ─────────────────────────────────────────────

export type UserRole = "customer" | "provider" | "admin";

/**
 * Base User — shared by Customer, Provider, Admin (inheritance from UML)
 */
export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;

  // UML methods represented as service-layer calls
  login(): Promise<string>; // returns JWT
  updateProfile(data: Partial<IUser>): Promise<IUser>;
}

/**
 * Customer extends User
 * UML: searchService(type), bookService(provider), viewBookings(), giveReview()
 */
export interface ICustomer extends IUser {
  role: "customer";
  searchService(type: string): Promise<IService[]>;
  bookService(providerId: string, serviceId: string): Promise<IBooking>;
  viewBookings(): Promise<IBooking[]>;
  giveReview(bookingId: string, review: Partial<IReview>): Promise<IReview>;
}

/**
 * Provider extends User
 * UML: skills, rating (float), availability (bool)
 * UML methods: acceptBooking(), rejectBooking(), updateStatus()
 */
export interface IProvider extends IUser {
  role: "provider";
  skills: string[];
  rating: number;
  availability: boolean;
  acceptBooking(bookingId: string): Promise<IBooking>;
  rejectBooking(bookingId: string): Promise<IBooking>;
  updateStatus(bookingId: string, status: BookingStatus): Promise<IBooking>;
}

/**
 * Admin extends User
 * UML: manageUsers(), approveProvider(), handleDisputes(), removeUser(userId)
 */
export interface IAdmin extends IUser {
  role: "admin";
  manageUsers(): Promise<IUser[]>;
  approveProvider(providerId: string): Promise<IProvider>;
  handleDisputes(bookingId: string): Promise<void>;
  removeUser(userId: string): Promise<void>;
}

// ─────────────────────────────────────────────
//  Booking
// ─────────────────────────────────────────────
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

  // UML methods — handled by BookingService
  createBooking(): Promise<IBooking>;
  cancelBooking(): Promise<IBooking>;
  updateStatus(status: BookingStatus): Promise<IBooking>;
}

// ─────────────────────────────────────────────
//  Service (work offering by a Provider)
// ─────────────────────────────────────────────
export interface IService {
  _id: string;
  providerId: string;
  name: string;
  category: string;
  basePrice: number;
  location: ILocation;
  createdAt: Date;

  createService(): Promise<IService>;
  updateService(data: Partial<IService>): Promise<IService>;
  deleteService(): Promise<void>;
}

// ─────────────────────────────────────────────
//  Review (1-to-many from Booking)
// ─────────────────────────────────────────────
export interface IReview {
  _id: string;
  bookingId: string;
  customerId: string;
  providerId: string;
  rating: number;
  comment: string;
  createdAt: Date;

  addReview(): Promise<IReview>;
  editReview(data: Partial<IReview>): Promise<IReview>;
  deleteReview(): Promise<void>;
}

// ─────────────────────────────────────────────
//  Location (ER diagram entity)
// ─────────────────────────────────────────────
export interface ILocation {
  latitude: number;
  longitude: number;
}

// ─────────────────────────────────────────────
//  Payment (ER diagram entity)
// ─────────────────────────────────────────────
export type PaymentMethod = "card" | "upi" | "cash" | "wallet";
export type PaymentStatus = "pending" | "completed" | "failed" | "refunded";

export interface IPayment {
  _id: string;
  bookingId: string;
  amount: number;
  status: PaymentStatus;
  method: PaymentMethod;
  createdAt: Date;
}
