import { Request, Response, NextFunction } from "express";

const user_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.currentUser) res.redirect("/");
  res.render("user");
};

export default user_get;
