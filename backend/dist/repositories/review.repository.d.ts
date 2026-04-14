import { BaseRepository } from "./base.repository.js";
import { IReviewDocument } from "../models/review.model.js";
declare class ReviewRepository extends BaseRepository<IReviewDocument> {
    constructor();
    /** Get all reviews for a provider */
    findByProvider(providerId: string): Promise<IReviewDocument[]>;
    /** Check if a review already exists for a booking */
    findByBooking(bookingId: string): Promise<IReviewDocument | null>;
    /**
     * Compute average rating for a provider.
     * Uses MongoDB aggregation pipeline for efficiency.
     */
    getAverageRating(providerId: string): Promise<number>;
}
export declare const reviewRepository: ReviewRepository;
export {};
//# sourceMappingURL=review.repository.d.ts.map