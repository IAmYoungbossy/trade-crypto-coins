import { Router } from "express";
import index_get from "../controllers/indexController";

const indexRouter = Router();

// Gets home page
indexRouter.get("/", index_get);

export default indexRouter;
