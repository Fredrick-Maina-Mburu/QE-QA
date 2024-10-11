import express, { Express, Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Validation middleware
const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
     res.status(400).json({ errors: errors.array() });
  }
  next();
};

export { validateRequest }