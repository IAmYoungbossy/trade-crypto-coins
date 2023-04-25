import { Router } from "express";
import {
  admin_get,
  admin_approved_post,
  admin_cancelled_post,
} from "../controllers/adminController";

const adminRouter = Router();

// Gets admin dashboard
adminRouter.get("/", admin_get);

// Approves a transaction
adminRouter.post(
  "/approve-transaction/:id",
  admin_approved_post
);

// Cancels a transaction
adminRouter.post(
  "/cancel-transaction/:id",
  admin_cancelled_post
);

export default adminRouter;
