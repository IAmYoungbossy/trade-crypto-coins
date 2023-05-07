import bcrypt from "bcryptjs";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";

// Renders sign up page
export const sign_up_get = (req: Request, res: Response) => {
  const STYLE = "login";
  const SUB_STYLE = "login_sub_style";
  res.render("sign-up-form", {
    style: STYLE,
    login_sub_style: SUB_STYLE,
  });
};

// Sends details of sign up form to db
export const sign_up_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      email,
      username,
      password,
      last_name,
      first_name,
      phone_numner,
    } = req.body;

    // Hash the password using bcrypt
    bcrypt.hash(password, 10, async (err, hashedPassword) => {
      if (err) {
        // Handle the error
        return next(err);
      }

      // Create a new user with the hashed password
      const user = new User({
        email,
        username,
        last_name,
        first_name,
        phone_numner,
        password: hashedPassword,
      });

      // Save the user to the database
      const result = await user.save();

      // Redirect to the homepage
      res.redirect("/");
    });
  }
);
