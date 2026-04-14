// ─────────────────────────────────────────────
//  FIXORA — Review Service
//
//  PATTERN: Service Layer
//  Implements Customer UML methods:
//    giveReview() → addReview()
//    editReview()
//    deleteReview()
//
//  After adding a review, updates provider's avg rating.
// ─────────────────────────────────────────────
import { reviewRepository } from "../repositories/review.repository.js";
import { userRepository } from "../repositories/user.repository.js";
import { bookingRepository } from "../repositories/booking.repository.js";
import type { IReviewDocument } from "../models/review.model.js";
import type { CreateReviewDTO, UpdateReviewDTO } from "../types/dto.types.js";

class ReviewService {

  /** Customer.giveReview() / Review.addReview() */
  async addReview(customerId: string, data: CreateReviewDTO): Promise<IReviewDocument> {
    // Validate booking exists and belongs to customer
    const booking = await bookingRepository.findById(data.bookingId);
    if (!booking) throw new Error("Booking not found.");
    if (booking.customerId.toString() !== customerId) throw new Error("Unauthorized.");
    if (booking.status !== "completed") throw new Error("Can only review completed bookings.");

    // Ensure no duplicate review
    const existing = await reviewRepository.findByBooking(data.bookingId);
    if (existing) throw new Error("You have already reviewed this booking.");

    const review = await reviewRepository.create({
      bookingId:  data.bookingId,
      customerId,
      providerId: booking.providerId.toString(),
      rating:     data.rating,
      comment:    data.comment,
    } as any);

    // Update provider's average rating after new review
    await this.syncProviderRating(booking.providerId.toString());

    return review;
  }

  /** Review.editReview() */
  async editReview(customerId: string, reviewId: string, data: UpdateReviewDTO): Promise<IReviewDocument> {
    const review = await reviewRepository.findById(reviewId);
    if (!review) throw new Error("Review not found.");
    if (review.customerId.toString() !== customerId) throw new Error("Unauthorized.");

    const updated = await reviewRepository.updateById(reviewId, { ...data } as Record<string, unknown>);
    await this.syncProviderRating(review.providerId.toString());
    return updated!;
  }

  /** Review.deleteReview() */
  async deleteReview(customerId: string, reviewId: string): Promise<void> {
    const review = await reviewRepository.findById(reviewId);
    if (!review) throw new Error("Review not found.");
    if (review.customerId.toString() !== customerId) throw new Error("Unauthorized.");

    await reviewRepository.deleteById(reviewId);
    await this.syncProviderRating(review.providerId.toString());
  }

  /** Get all reviews for a provider */
  async getProviderReviews(providerId: string): Promise<IReviewDocument[]> {
    return reviewRepository.findByProvider(providerId);
  }

  /**
   * Recalculate and persist provider's average rating.
   * Called after any review mutation.
   */
  private async syncProviderRating(providerId: string): Promise<void> {
    const avg = await reviewRepository.getAverageRating(providerId);
    await userRepository.updateById(providerId, { rating: avg });
  }
}

// Singleton export
export const reviewService = new ReviewService();
