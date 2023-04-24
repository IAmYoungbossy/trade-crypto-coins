import { Router } from "express";
import passport from "passport";

const logInRoute = Router();

logInRoute.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

export default logInRoute;
