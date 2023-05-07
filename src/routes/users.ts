import express from "express";
import user_get, {
  user_buy_get,
  user_buy_post,
  user_details_get,
} from "../controllers/userController";

// App instance
const userRoute = express.Router();

// GET user account.
userRoute.get("/:id", user_get);

// Get user buy page
userRoute.get("/:id/buy", user_buy_get);

// Post user buy page
userRoute.post("/:id/buy", user_buy_post);

// Get user details page
userRoute.get("/:id/details", user_details_get);

export default userRoute;
