import type {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import HttpStatusCode from "../constans/http";
import { ZodError } from "zod";
import AppError from "../utils/appError";
import { clearAuthCookies, refreshPath } from "../utils/cookies";

const handleZodError = (err: ZodError, res: Response) => {
  const errors = err.errors.map((e) => ({
    path: e.path.join("."),
    message: e.message,
  }));

  return res.status(HttpStatusCode.BAD_REQUEST).json({
    message: err.message,
    errors,
  });
};

const handleAppError = (err: AppError, res: Response) => {
  return res.status(err.statusCode).json({
    message: err.message,
    errorCode: err.errorCode,
  });
};

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(`Error at ${req.path}`, err);

  if (req.path === refreshPath) {
    clearAuthCookies(res);
  }

  if (err instanceof ZodError) {
    return handleZodError(err, res);
  }
  if (err instanceof AppError) {
    return handleAppError(err, res);
  }

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: "Something went wrong",
  });
}
