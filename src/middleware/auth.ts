/**
 * AI-generated code by factory.ai Droid
 * JWT authentication middleware for EOTConnect
 */
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models";

export interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "changeme") as any;
    
    // Verify user still exists
    const user = await User.findByPk(decoded.sub);
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = {
      id: user.id,
      email: user.email,
    };
    
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// export { AuthRequest };