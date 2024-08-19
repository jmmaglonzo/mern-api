import { NextFunction, Response, Request } from "express";

const asyncHandler =
  (fn: Function) =>
  async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
