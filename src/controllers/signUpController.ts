import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";

export const sign_up_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => res.render("sign-up-form");

export const sign_up_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    const result = await user.save();
    res.redirect("/");
  }
);
