import express, { Response, Request } from "express";
import { completeMovie } from "../models/Movie";

export const addMovie = async(req: Request, res: Response) => {
    const newMovie : completeMovie = req.body;
}