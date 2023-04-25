import { Request, Response, NextFunction } from "express";
import Transaction from "../models/transactionModel";

const user_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.currentUser._id) res.redirect("/");
  const userId = res.locals.currentUser._id;

  const [pending, completed] = await Promise.all([
    Transaction.find({
      user: userId,
      status: "pending",
    }),
    Transaction.find({
      user: userId,
      status: ["cancelled", "approved"],
    }),
  ]);
  console.log(pending, completed);

  res.render("user", { pending, completed });
};

export default user_get;
