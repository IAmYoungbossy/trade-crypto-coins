import { Router } from "express";
import user_get, {
  delete_tranx,
  user_buy_post,
  user_details_get,
} from "../controllers/userController";

// App instance
const userRoute = Router();

// GET user account.
userRoute.get("/:id", user_get);

// Post user buy page
userRoute.post("/:id/buy", user_buy_post);

// Post delete transaction
userRoute.post("/delete/:id", delete_tranx);

// Get user details page from db
userRoute.get("/:id/details", user_details_get);

export default userRoute;
