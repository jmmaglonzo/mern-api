import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

interface CastError extends AppError {
  name: string;
  value: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";
  let message = err.message || "Internal Server Error";

  if (err.name === "Validation Error") {
    statusCode = 400;
    status = "fail";
    message = "Field required";
  }

  if (err.name === "CastError") {
    const error = err as CastError;
    statusCode = 400;
    status = "fail";
    message = `Invalid User ID ${error.value} not found!`;
  }

  if (err.code === 11000) {
    statusCode = 400;
    status = "fail";
    message = "Duplicate field value entered ";
  }

  res.status(statusCode).json({
    status,
    message,
  });
};

export default errorHandler;
