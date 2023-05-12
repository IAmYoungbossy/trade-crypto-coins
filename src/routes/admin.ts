import { Router } from "express";
import {
  admin_get,
  admin_pending_get,
  admin_approved_get,
  admin_cancelled_get,
  admin_approved_post,
  admin_cancelled_post,
  admin_undo_post,
} from "../controllers/adminController";

const adminRouter = Router();

// Gets admin dashboard
adminRouter.get("/", admin_get);
adminRouter.get("/pending", admin_pending_get);
adminRouter.get("/approved", admin_approved_get);
adminRouter.get("/cancelled", admin_cancelled_get);

// Approves a transaction
adminRouter.post(
  "/approve-transaction/:id",
  admin_approved_post
);

// Undo a transaction
adminRouter.post("/undone-transaction/:id", admin_undo_post);

// Cancels a transaction
adminRouter.post(
  "/cancel-transaction/:id",
  admin_cancelled_post
);

export default adminRouter;
