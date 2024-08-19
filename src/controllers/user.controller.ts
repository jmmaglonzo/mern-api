import User from "../models/user";
import AppError from "../utils/appError";
import asyncHandler from "../utils/asyncHandler";
import { NextFunction, Request, Response } from "express";

export const getUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json(users);
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("Resource not found!", 404));
    }

    res.status(200).json(user);
  }
);

export const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    const createUser = await User.create(body);

    res.status(201).json(createUser);
  }
);

export const updateUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const body = req.body;

    const update = await User.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return next(new AppError("Resource not found!", 404));
    }

    res.status(200).json(update);
  }
);

export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return next(new AppError("Resource not found!", 404));
    }

    res.status(204).json({
      data: null,
    });
  }
);
