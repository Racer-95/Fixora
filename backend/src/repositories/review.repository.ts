// ─────────────────────────────────────────────
//  FIXORA — Review Repository
//  Extends BaseRepository with review-specific queries
// ─────────────────────────────────────────────
import { BaseRepository } from "./base.repository.js";
import { Review, IReviewDocument } from "../models/review.model.js";

class ReviewRepository extends BaseRepository<IReviewDocument> {
  constructor() {
    super(Review);
  }

  /** Get all reviews for a provider */
  async findByProvider(providerId: string): Promise<IReviewDocument[]> {
    return this.model
      .find({ providerId })
      .populate("customerId", "name")
      .sort({ createdAt: -1 })
      .exec();
  }

  /** Check if a review already exists for a booking */
  async findByBooking(bookingId: string): Promise<IReviewDocument | null> {
    return this.model.findOne({ bookingId }).exec();
  }

  /**
   * Compute average rating for a provider.
   * Uses MongoDB aggregation pipeline for efficiency.
   */
  async getAverageRating(providerId: string): Promise<number> {
    const result = await this.model.aggregate([
      { $match: { providerId } },
      { $group: { _id: "$providerId", avgRating: { $avg: "$rating" } } },
    ]);
    return result.length > 0 ? parseFloat(result[0].avgRating.toFixed(1)) : 0;
  }
}

// Singleton export
export const reviewRepository = new ReviewRepository();
