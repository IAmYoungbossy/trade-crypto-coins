import { Request, Response, NextFunction } from "express";

// Logs out any signed in user
const log_out_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect("/");
  });
};

export default log_out_get;
