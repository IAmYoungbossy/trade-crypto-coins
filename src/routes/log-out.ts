import { Router } from "express";
import log_out_get from "../controllers/logOutController";

const logOutRoute = Router();

logOutRoute.get("/", log_out_get);

export default logOutRoute;
