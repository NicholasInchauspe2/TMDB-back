import { Router } from "express";
import express from "express";
import { register, logUser, validateToken } from "../controllers/User_controller";

const router : Router = express.Router();

router.post("/register", register);

router.post("/login", logUser);

router.get("/validate", validateToken);

export default router;