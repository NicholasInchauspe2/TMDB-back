import { Router } from "express";
import express from "express";
import { addMovie, getLengthOfMovies, lastOne, deleteSelectedMovie, getAll } from "../controllers/Movie_controller";

const router : Router = express.Router();

router.post("/add", addMovie);

router.post("/length", getLengthOfMovies);

router.get("/all", getAll);

router.get("/lastOne", lastOne);

router.delete("/one/:title", deleteSelectedMovie);

export default router;