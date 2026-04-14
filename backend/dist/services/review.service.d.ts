import type { IReviewDocument } from "../models/review.model.js";
import type { CreateReviewDTO, UpdateReviewDTO } from "../types/dto.types.js";
declare class ReviewService {
    /** Customer.giveReview() / Review.addReview() */
    addReview(customerId: string, data: CreateReviewDTO): Promise<IReviewDocument>;
    /** Review.editReview() */
    editReview(customerId: string, reviewId: string, data: UpdateReviewDTO): Promise<IReviewDocument>;
    /** Review.deleteReview() */
    deleteReview(customerId: string, reviewId: string): Promise<void>;
    /** Get all reviews for a provider */
    getProviderReviews(providerId: string): Promise<IReviewDocument[]>;
    /**
     * Recalculate and persist provider's average rating.
     * Called after any review mutation.
     */
    private syncProviderRating;
}
export declare const reviewService: ReviewService;
export {};
//# sourceMappingURL=review.service.d.ts.map