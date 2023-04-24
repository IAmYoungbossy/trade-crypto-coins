import express from "express";
import user_get from "../controllers/userController";

const router = express.Router();

/* GET user account. */
router.get("/", user_get);

export default router;
