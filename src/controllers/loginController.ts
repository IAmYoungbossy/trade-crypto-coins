import asyncHandler from "express-async-handler";
import { authenticateUser } from "./authenticateUser";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// GET the home page which is login page
const login_get = (req: Request, res: Response) => {
  if (res.locals.currentUser) {
    if (res.locals.currentUser.role === "user") {
      res.redirect(
        `/user/${res.locals.currentUser._id.toString()}`
      );
    }
    if (res.locals.currentUser.role === "admin") {
      res.redirect("/admin");
    }
  } else {
    res.render("index", {
      style: "login",
      tableStyle: "table",
      title: "CoineX",
      login_sub_style: "login_sub_style",
    });
  }
};

export const login_post = [
  body("username")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Username must have at least 3 characters")
    .escape(),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must have at least 6 characters")
    .escape(),

  asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { username, password } = req.body;
      const loginDetails = { username, password };

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      const error = errors.array();

      // Options object to pass to view template.
      const options = {
        error,
        loginDetails,
        style: "login",
        title: "CoineX",
        login_sub_style: "login_sub_style",
      };

      if (!errors.isEmpty()) {
        /** There are errors. Render the form again *
         ** with sanitized values/error messages ****/
        res.render("index", options);

        return;
      } else next();
    }
  ),
  authenticateUser,
];

export default login_get;
