import AppError from "../utils/appError";
import { NextFunction, Request, Response } from "express";

const routeHandler = (req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Cannot find ${req.originalUrl} on the server!`, 404)
  );
};

export default routeHandler;
