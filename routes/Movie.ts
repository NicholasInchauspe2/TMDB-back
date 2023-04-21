import { Router } from "express";
import express from "express";
import { addMovie, getLengthOfMovies, lastOne, deleteSelectedMovie } from "../controllers/Movie_controller";

const router : Router = express.Router();

router.post("/add", addMovie);

router.post("/length", getLengthOfMovies);

router.get("/all/:amount/:page");

router.get("/lastOne", lastOne);

router.delete("/one/:title", deleteSelectedMovie);

export default router;