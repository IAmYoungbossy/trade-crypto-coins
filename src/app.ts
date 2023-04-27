import path from "path";
import helmet from "helmet";
import dotenv from "dotenv";
import multer from "multer";
import logger from "morgan";
import express from "express";
import passport from "passport";
import compression from "compression";
import session from "express-session";
import cookieParser from "cookie-parser";
import RateLimit from "express-rate-limit";

import userRoute from "./routes/users";
import errorHandler, {
  catchErrorAndForward,
} from "./controllers/errorController";
import adminRouter from "./routes/admin";
import indexRouter from "./routes/index";
import logOutRoute from "./routes/log-out";
import signUpRoute from "./routes/sign-up";
import LocalStrategy from "./middlewares/localStrategy";
import setCurrentUserObjToLocal from "./helpers/helpers";
import deserializeUserObj from "./middlewares/deserialize";
import serializeUserForSession from "./middlewares/serialize";

dotenv.config();
process.env.NODE_ENV = "production";

const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

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
app.use(limiter);
app.use(helmet());
app.use(compression());
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
app.use("/log-out", logOutRoute);
app.use("/sign-up", signUpRoute);

// Forward error to err handler
app.use(catchErrorAndForward);

// error handler
app.use(errorHandler);

export default app;
