import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

class AuthService {
  async register(name: string, email: string, password: string) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("User exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed });

    return this.generateToken(user._id.toString());
  }

  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const match = await bcrypt.compare(password, user.password || "");
    if (!match) throw new Error("Invalid credentials");

    return this.generateToken(user._id.toString());
  }

  private generateToken(userId: string) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });
  }
}

export const authService = new AuthService(); // singleton