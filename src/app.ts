import path from "path";
import multer from "multer";
import logger from "morgan";
import express from "express";
import passport from "passport";
import session from "express-session";
import cookieParser from "cookie-parser";

import errorHandler, {
  catchErrorAndForward,
} from "./controllers/errorController";
import userRoute from "./routes/users";
import loginRouter from "./routes/login";
import adminRouter from "./routes/admin";
import indexRouter from "./routes/index";
import logOutRoute from "./routes/log-out";
import signUpRoute from "./routes/sign-up";
import LocalStrategy from "./middlewares/localStrategy";
import setCurrentUserObjToLocal from "./helpers/helpers";
import deserializeUserObj from "./middlewares/deserialize";
import serializeUserForSession from "./middlewares/serialize";

// Initialize express app
const app = express();

// Uploaded file storage
const storage = multer.diskStorage({
  destination: path.join(__dirname, "public", "images"),
  filename: (req, file, cb) =>
    cb(
      null,
      `${file.originalname}_${Date.now()}${path.extname(
        file.originalname
      )}`
    ),
});

const upload = multer({ storage });

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
app.use(express.static(path.resolve(__dirname, "public")));

// Makes logged in user object available throughout the app
app.use(setCurrentUserObjToLocal);

app.use(upload.single("paymentScreenshot"));

// Routes
app.use("/", indexRouter);
app.use("/user", userRoute);
app.use("/admin", adminRouter);
app.use("/login", loginRouter);
app.use("/log-out", logOutRoute);
app.use("/sign-up", signUpRoute);

// Forward error to err handler
app.use(catchErrorAndForward);

// error handler
app.use(errorHandler);

export default app;
