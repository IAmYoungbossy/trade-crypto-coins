import { Request, Response, NextFunction } from "express";
import Transaction from "../models/transactionModel";

const user_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const TABLE_STYLE = "table";
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
    const title = `Dashboard | ${res.locals.currentUser.first_name}`;
    res.render("user", {
      title,
      pending,
      completed,
      tableStyle: TABLE_STYLE,
    });
  }
};

export default user_get;
