import type { Request, Response } from "express";
import { authService } from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  try {
    const token = await authService.register(
      req.body.name,
      req.body.email,
      req.body.password
    );

    res.json({ success: true, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await authService.login(
      req.body.email,
      req.body.password
    );

    res.json({ success: true, token });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};