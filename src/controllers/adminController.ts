import asyncHandler from "express-async-handler";
import Transaction from "../models/transactionModel";
import { Response, Request, NextFunction } from "express";

// Get admin dashboard
export const admin_get = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!res.locals.currentUser) res.redirect("/");

  res.redirect("/admin/pending");
};

export const admin_pending_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const pending = await Transaction.find({
      status: "pending",
    }).populate("user");

    if (!res.locals.currentUser) res.redirect("/");

    res.render("admin", {
      pending,
      style: "admin",
      tableStyle: "table",
      details_modal: "details_modal",
      title: "Admin Dashboard | Pending",
    });
  }
);

export const admin_approved_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const approved = await Transaction.find({
      status: "approved",
    }).populate("user");

    if (!res.locals.currentUser) res.redirect("/");

    res.render("admin", {
      approved,
      style: "admin",
      tableStyle: "table",
      details_modal: "details_modal",
      title: "Admin Dashboard | Approved",
    });
  }
);

export const admin_cancelled_get = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const cancelled = await Transaction.find({
      status: "cancelled",
    }).populate("user");

    if (!res.locals.currentUser) res.redirect("/");

    res.render("admin", {
      cancelled,
      style: "admin",
      tableStyle: "table",
      details_modal: "details_modal",
      title: "Admin Dashboard | Cancelled",
    });
  }
);

// POST approved transaction and render admin dashboard
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

// POST undo a transaction and render admin dashboard
export const admin_undo_post = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const transaction = await Transaction.findById(
      req.params.id
    );
    if (!transaction) {
      res.status(404).send("Transaction not found");
      return;
    }
    await transaction.save();
    if (transaction.status === "approved") {
      transaction.status = "pending";
      await transaction.save();
      res.redirect("/admin/approved");
    } else {
      transaction.status = "pending";
      await transaction.save();
      res.redirect("/admin/cancelled");
    }
  }
);

// POST cancelled transaction and render admin dashboard
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
