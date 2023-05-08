import { Router } from "express";
import index_get from "../controllers/indexController";
import { authenticateUser } from "../controllers/authenticateUser";

const indexRouter = Router();

// Gets home page
indexRouter.get("/", index_get);

indexRouter.post("/", authenticateUser);

export default indexRouter;
