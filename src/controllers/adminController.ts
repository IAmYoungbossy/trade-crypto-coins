import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel";
import { Response, Request, NextFunction } from "express";

export const admin_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [pending, approved, cancelled] = await Promise.all([
      await Transaction.find({ status: "pending" }).populate(
        "user"
      ),
      await Transaction.find({ status: "approved" }).populate(
        "user"
      ),
      await Transaction.find({ status: "cancelled" }).populate(
        "user"
      ),
    ]);
    console.log(pending);
    if (!res.locals.currentUser) res.redirect("/");

    res.render("admin", {
      pending,
      approved,
      cancelled,
      style: "admin",
    });
  }
);

export const admin_approved_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await Transaction.findById(
      req.params.id
    );
    if (!transaction) {
      res.status(404).send("Transaction not found");
      return;
    }
    transaction.status = "approved";
    await transaction.save();
    res.redirect("/admin");
  }
);

export const admin_cancelled_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await Transaction.findById(
      req.params.id
    );
    if (!transaction) {
      res.status(404).send("Transaction not found");
      return;
    }
    transaction.status = "cancelled";
    await transaction.save();
    res.redirect("/admin");
  }
);
