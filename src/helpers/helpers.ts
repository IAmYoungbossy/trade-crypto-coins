import { Request, Response, NextFunction } from "express";

const setCurrentUserObjToLocal = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.locals.currentUser = req.user;
  next();
};

export default setCurrentUserObjToLocal;
