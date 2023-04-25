import { Request, Response, NextFunction } from "express";

const index_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.currentUser) {
    if (res.locals.currentUser.role === "user") {
      res.redirect(
        `/user/${res.locals.currentUser._id.toString()}`
      );
    }
    if (res.locals.currentUser.role === "admin") {
      res.redirect("/admin");
    }
  } else res.render("index");
};

export default index_get;
