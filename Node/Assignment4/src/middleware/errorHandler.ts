
import { Request, Response, NextFunction } from "express";

// Error handling middleware
function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  res.status(500).json({
    message: err.message || 'Internal Server Error',
  });
}
export { errorHandler }