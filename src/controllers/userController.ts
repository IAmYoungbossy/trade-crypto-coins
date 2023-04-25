import { Request, Response, NextFunction } from "express";
import Transaction from "../models/transactionModel";

const user_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.currentUser._id) res.redirect("/");
  const userId = res.locals.currentUser._id;

  const [approved, pending, completed] = await Promise.all([
    Transaction.find({
      user: userId,
      status: "approved",
    }),
    Transaction.find({
      user: userId,
      status: "pending",
    }),
    Transaction.find({
      user: userId,
      status: ["cancelled", "approved"],
    }).limit(5),
  ]);
  console.log(pending, approved, completed);

  res.render("user", { approved, pending, completed });
};

export default user_get;
