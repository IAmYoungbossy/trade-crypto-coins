import { Request, Response, NextFunction } from "express";
import Transaction from "../models/transactionModel";

const user_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(res.locals.currentUser);

  if (!res.locals.currentUser) res.redirect("/");
  else {
    const userId = res.locals.currentUser._id;

    const [pending, completed] = await Promise.all([
      Transaction.find({
        user: userId,
        status: "pending",
      }),
      Transaction.find({
        user: userId,
        status: { $in: ["approved", "cancelled"] },
      }),
    ]);

    res.render("user", { pending, completed });
  }
};

export default user_get;
