import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel";
import { Request, Response, NextFunction } from "express";

// Renders user page
const user_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

// Renders buy form page
export const user_buy_get = (req: Request, res: Response) => {
  const STYLE = "login";
  const id = req.params.id;
  if (!res.locals.currentUser) res.redirect("/");
  res.render("buy", { id, style: STYLE });
};

// Sends buy form details to db and render user page
export const user_buy_post = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { amount, walletAddress, crypto } = req.body;
    const transaction = new Transaction({
      amount,
      crypto,
      user: id,
      walletAddress,
      paymentScreenshot: req.file?.filename,
    });
    await transaction.save();
    res.redirect(`/user/${id}`);
  }
);

// Renders a single transaction page
export const user_details_get = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const transaction = await Transaction.findById(id);

    if (!transaction) res.redirect(`/user/${id}`);

    res.render("payment-details", {
      transaction,
      style: "admin",
    });
  }
);

export default user_get;
