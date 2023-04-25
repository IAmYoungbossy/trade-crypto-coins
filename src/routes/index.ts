import passport from "passport";
import { Router } from "express";
import index_get from "../controllers/indexController";

const indexRouter = Router();
const authenticateUser = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});

// Gets home page
indexRouter.get("/", index_get);

// Gets user account or redirect to home
indexRouter.post("/", authenticateUser);

export default indexRouter;
