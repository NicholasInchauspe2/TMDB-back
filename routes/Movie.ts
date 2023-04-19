import { Router } from "express";
import express from "express";
import { addMovie, getLengthOfMovies, getSelectedMovie, deleteSelectedMovie } from "../controllers/Movie_controller";

const router : Router = express.Router();

router.post("/add", addMovie);

router.get("/length", getLengthOfMovies);

router.get("/all/:amount/:page");

router.get("/one/:title", getSelectedMovie);

router.delete("/one/:title", deleteSelectedMovie);

export default router;