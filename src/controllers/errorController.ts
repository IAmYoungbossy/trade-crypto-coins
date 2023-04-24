import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import createHttpError from "http-errors";

export const catchErrorAndForward = (
  req: Request,
  res: Response,
  next: NextFunction
) => next(createHttpError(404));

const errorHandler = ((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
}) as ErrorRequestHandler;

export default errorHandler;
