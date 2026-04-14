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
class ReviewService {
    /** Customer.giveReview() / Review.addReview() */
    async addReview(customerId, data) {
        // Validate booking exists and belongs to customer
        const booking = await bookingRepository.findById(data.bookingId);
        if (!booking)
            throw new Error("Booking not found.");
        if (booking.customerId.toString() !== customerId)
            throw new Error("Unauthorized.");
        if (booking.status !== "completed")
            throw new Error("Can only review completed bookings.");
        // Ensure no duplicate review
        const existing = await reviewRepository.findByBooking(data.bookingId);
        if (existing)
            throw new Error("You have already reviewed this booking.");
        const review = await reviewRepository.create({
            bookingId: data.bookingId,
            customerId,
            providerId: booking.providerId.toString(),
            rating: data.rating,
            comment: data.comment,
        });
        // Update provider's average rating after new review
        await this.syncProviderRating(booking.providerId.toString());
        return review;
    }
    /** Review.editReview() */
    async editReview(customerId, reviewId, data) {
        const review = await reviewRepository.findById(reviewId);
        if (!review)
            throw new Error("Review not found.");
        if (review.customerId.toString() !== customerId)
            throw new Error("Unauthorized.");
        const updated = await reviewRepository.updateById(reviewId, { ...data });
        await this.syncProviderRating(review.providerId.toString());
        return updated;
    }
    /** Review.deleteReview() */
    async deleteReview(customerId, reviewId) {
        const review = await reviewRepository.findById(reviewId);
        if (!review)
            throw new Error("Review not found.");
        if (review.customerId.toString() !== customerId)
            throw new Error("Unauthorized.");
        await reviewRepository.deleteById(reviewId);
        await this.syncProviderRating(review.providerId.toString());
    }
    /** Get all reviews for a provider */
    async getProviderReviews(providerId) {
        return reviewRepository.findByProvider(providerId);
    }
    /**
     * Recalculate and persist provider's average rating.
     * Called after any review mutation.
     */
    async syncProviderRating(providerId) {
        const avg = await reviewRepository.getAverageRating(providerId);
        await userRepository.updateById(providerId, { rating: avg });
    }
}
// Singleton export
export const reviewService = new ReviewService();
//# sourceMappingURL=review.service.js.map