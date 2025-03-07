import type { Request, Response, NextFunction } from "express";

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

const asyncHandler =
  (fn: AsyncController): AsyncController =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
