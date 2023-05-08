import { Router } from "express";
import login_get from "../controllers/loginController";
import { authenticateUser } from "../controllers/authenticateUser";

const loginRouter = Router();

// loginRouter.get("/", login_get);

// Gets user account or redirect to home
loginRouter.post("/", authenticateUser);

export default loginRouter;
