import { Request, Response, NextFunction } from "express";

const index_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.render("index");
};

export default index_get;
