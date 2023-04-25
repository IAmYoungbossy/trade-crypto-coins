import { Request, Response, NextFunction } from "express";

const index_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.locals.currentUser)
    res.redirect(
      `/user/${res.locals.currentUser._id.toString()}`
    );
  else res.render("index");
};

export default index_get;
