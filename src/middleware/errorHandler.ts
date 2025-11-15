/**
 * AI-generated code by factory.ai Droid
 * Error handling middleware for EOTConnect
 */
import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", error);

  // Sequelize validation errors
  if (error.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: error.errors?.map((err: any) => err.message) || [],
    });
  }

  // Sequelize unique constraint errors
  if (error.name === "SequelizeUniqueConstraintError") {
    return res.status(409).json({
      error: "Resource already exists",
      details: error.errors?.map((err: any) => `${err.path} must be unique`) || [],
    });
  }

  // JWT errors
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Invalid token" });
  }

  if (error.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token expired" });
  }

  // Default server error
  res.status(error.status || 500).json({
    error: error.message || "Internal server error",
  });
};