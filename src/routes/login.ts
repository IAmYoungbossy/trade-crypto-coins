import { Router } from "express";
import login_get from "../controllers/loginController";
import { authenticateUser } from "../controllers/authenticateUser";

const loginRouter = Router();

// GET login page
loginRouter.get("/", login_get);

// POST authenticate then redirect to user account
loginRouter.post("/", authenticateUser);

export default loginRouter;
