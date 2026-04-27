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

import { userRepository } from "../repositories/user.repository.js";

export const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await userRepository.findById(req.user!.id);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found." });
      return;
    }
    res.json({ 
      success: true, 
      data: { 
        _id: user._id.toString(), 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
};