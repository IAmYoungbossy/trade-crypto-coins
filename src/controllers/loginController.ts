import { Request, Response } from "express";

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
      title: "Snappy Exchange",
      login_sub_style: "login_sub_style",
    });
  }
};

export default login_get;
