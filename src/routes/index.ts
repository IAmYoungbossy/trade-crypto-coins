import express from "express";
import index_get from "../controllers/indexController";

const router = express.Router();

/* GET home page. */
router.get("/", index_get);

export default router;
