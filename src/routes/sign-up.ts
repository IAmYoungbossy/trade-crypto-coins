import { Router } from "express";
import {
  sign_up_get,
  sign_up_post,
} from "../controllers/signUpController";

const signUpRoute = Router();

// Gets Sign Up Form
signUpRoute.get("/", sign_up_get);

// Posts Sign Up Form details
signUpRoute.post("/", sign_up_post);

export default signUpRoute;
