import bcrypt from "bcryptjs";
import User from "../models/userModel";
import asyncHandler from "express-async-handler";
import { Response, Request, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Renders sign up page
export const sign_up_get = (req: Request, res: Response) => {
  const STYLE = "login";
  const SUB_STYLE = "login_style";
  res.render("sign-up-form", {
    style: STYLE,
    login_style: SUB_STYLE,
  });
};

// Sends details of sign up form to db
export const sign_up_post = [
  body("email", "Must provide an email address.")
    .trim()
    .isLength({ min: 7 })
    .withMessage("Must have at least 7 characters")
    .escape(),
  body("username", "Must provide a username.")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Must have at least 3 characters")
    .escape(),
  body("password", "Must provide a password.")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Must have at least 6 characters")
    .escape(),
  body("last_name", "Must provide your last name.")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Must have at least 1 characters")
    .escape(),
  body("first_name", "Must provide your last name.")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Must have at least 1 characters")
    .escape(),
  body("phone_numner")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ min: 7 })
    .withMessage("Must have at least 7 characters")
    .escape(),

  // Process request after validation and sanitization.
  asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const {
        email,
        username,
        password,
        last_name,
        first_name,
        phone_numner,
      } = req.body;

      // Create a user instance with escaped and trimmed data.
      const newUserInstance = (password: string) =>
        new User({
          email,
          username,
          last_name,
          first_name,
          phone_numner,
          password: password,
        });

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Dynamic stylesheet file names.
        const STYLE = "login";
        const error = errors.array();
        const STYLE2 = "login_style";

        const user = newUserInstance(password);

        // Options object to pass to view template.
        const options = {
          user,
          error,
          style: STYLE,
          login_style: STYLE2,
        };

        /** There are errors. Render the form again *
         ** with sanitized values/error messages ****/
        res.render("sign-up-form", options);

        return;
      } else {
        // Hash the password using bcrypt
        bcrypt.hash(
          password,
          10,
          async (err, hashedPassword) => {
            // Handle the error
            if (err) return next(err);

            // Create a new user with the hashed password
            const user = newUserInstance(hashedPassword);

            // Save the user to the database
            await user.save();

            // Redirect to the homepage
            res.redirect("/");
          }
        );
      }
    }
  ),
];
