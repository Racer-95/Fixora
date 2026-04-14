// ─────────────────────────────────────────────
//  FIXORA — Auth Controller  (MODIFIED)
//  Now uses typed DTOs and returns AuthResponseDTO.
// ─────────────────────────────────────────────
import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import type { RegisterDTO, LoginDTO } from "../types/dto.types.js";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: RegisterDTO = req.body;
    const result = await authService.register(data);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const data: LoginDTO = req.body;
    const result = await authService.login(data);
    res.json(result);
  } catch (err: any) {
    res.status(400).json({ success: false, error: err.message });
  }
};

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  res.json({ success: true, data: req.user });
};