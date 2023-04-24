import path from "path";
import logger from "morgan";
import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

import errorHandler, {
  catchErrorAndForward,
} from "./controllers/errorController";
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
import signUpRoute from "./routes/sign-up";
import LocalStrategy from "./passportConfig/localStrategy";
import deserializeUserObj from "./passportConfig/deserialize";
import serializeUserForSession from "./passportConfig/serialize";
import logInRoute from "./routes/log-in";

const app = express();

// view engine setup
app.set("views", path.resolve("src", "views"));
app.set("view engine", "pug");

// Session
app.use(
  session({
    secret: "cats",
    resave: false,
    saveUninitialized: true,
  })
);
passport.use(LocalStrategy);
passport.serializeUser(serializeUserForSession);
passport.deserializeUser(deserializeUserObj);
app.use(passport.initialize());
app.use(passport.session());

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("src", "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/log-in", logInRoute);
app.use("/sign-up", signUpRoute);

// Forward error to err handler
app.use(catchErrorAndForward);

// error handler
app.use(errorHandler);

export default app;
