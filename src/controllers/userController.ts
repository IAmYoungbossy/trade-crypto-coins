import { Request, Response, NextFunction } from "express";

const user_get = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.send("respond with a resource");
};

export default user_get;
