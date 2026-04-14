import type { Request, Response } from "express";
/** POST /api/reviews — Customer.giveReview() / Review.addReview() */
export declare const addReview: (req: Request, res: Response) => Promise<void>;
/** PATCH /api/reviews/:id — Review.editReview() */
export declare const editReview: (req: Request, res: Response) => Promise<void>;
/** DELETE /api/reviews/:id — Review.deleteReview() */
export declare const deleteReview: (req: Request, res: Response) => Promise<void>;
/** GET /api/reviews/provider/:providerId */
export declare const getProviderReviews: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=review.controller.d.ts.map