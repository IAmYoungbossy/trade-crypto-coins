import express from "express";
import user_get from "../controllers/userController";

const userRoute = express.Router();

/* GET user account. */
userRoute.get("/:id", user_get);

export default userRoute;
