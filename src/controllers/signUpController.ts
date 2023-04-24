import bcrypt from "bcryptjs";
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
    const username = req.body.username;
    const password = req.body.password;

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        // Handle the error
        return next(err);
      }

      // Create a new user with the hashed password
      const user = new User({
        username: username,
        password: hashedPassword,
      });

      // Save the user to the database
      const result = await user.save();

      // Redirect to the homepage
      res.redirect("/");
    });
  }
);
