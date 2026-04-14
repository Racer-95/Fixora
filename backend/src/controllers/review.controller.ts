// ─────────────────────────────────────────────
//  FIXORA — Review Controller
// ─────────────────────────────────────────────
import type { Request, Response } from "express";
import { reviewService } from "../services/review.service.js";
import type { CreateReviewDTO, UpdateReviewDTO } from "../types/dto.types.js";

const param = (v: string | string[]): string => (Array.isArray(v) ? v[0]! : v);

/** POST /api/reviews — Customer.giveReview() / Review.addReview() */
export const addReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: CreateReviewDTO = req.body;
    const review = await reviewService.addReview(req.user!.id, data);
    res.status(201).json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** PATCH /api/reviews/:id — Review.editReview() */
export const editReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: UpdateReviewDTO = req.body;
    const review = await reviewService.editReview(req.user!.id, param(req.params["id"]!), data);
    res.json({ success: true, data: review });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** DELETE /api/reviews/:id — Review.deleteReview() */
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    await reviewService.deleteReview(req.user!.id, param(req.params["id"]!));
    res.json({ success: true, message: "Review deleted successfully." });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

/** GET /api/reviews/provider/:providerId */
export const getProviderReviews = async (req: Request, res: Response): Promise<void> => {
  try {
    const reviews = await reviewService.getProviderReviews(param(req.params["providerId"]!));
    res.json({ success: true, data: reviews });
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};
