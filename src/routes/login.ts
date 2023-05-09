import { Router } from "express";
import login_get, {
  login_post,
} from "../controllers/loginController";

// App instance
const loginRouter = Router();

// GET login page
loginRouter.get("/", login_get);

// POST authenticate user
loginRouter.post("/", login_post);

export default loginRouter;
