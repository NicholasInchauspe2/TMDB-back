import { Router, Request, Response } from "express";
import express from "express";
import { register } from "../controllers/User_controller";

const router : Router = express.Router();

router.post("/register", register);

export default router;