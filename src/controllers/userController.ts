import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel";
import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

// Renders user page
const user_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
        style: "login",
        errorForm: false,
        tableStyle: "table",
      });
    }
  }
);

// Sends buy form details to db and render user page
export const user_buy_post = [
  body("crypto")
    .trim()
    .isLength({ min: 3 })
    .withMessage("Crypto Symbol must have at least 3 characters")
    .escape(),

  body("amount")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Amount must have a number")
    .isNumeric()
    .withMessage("Amount must have a number")
    .escape(),

  body("walletAddress")
    .trim()
    .isBtcAddress()
    .withMessage("Wallet Address Should be a BTC wallet address")
    .escape(),

  asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id;
    const { amount, walletAddress, crypto } = req.body;
    const transaction = new Transaction({
      amount,
      crypto,
      user: id,
      walletAddress,
      paymentScreenshot: req.file?.filename,
    });
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const error = errors.array();

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

      res.locals.errorForm = true;
      // Options object to pass to view template.
      const options = {
        id,
        title,
        error,
        pending,
        completed,
        transaction,
        style: "login",
        errorForm: true,
        tableStyle: "table",
      };

      /** There are errors. Render the form again *
       ** with sanitized values/error messages ****/
      res.render("user", options);

      return;
    } else {
      await transaction.save();
      res.locals.errorForm = true;
      res.redirect(`/user/${id}`);
    }
  }),
];

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
