import express, { Response, Request } from "express";
import { completeMovie } from "../models/Movie";
import { simpleResponse, lengthOfMoviesResponse, getSingleMovie, selectMoviesResponse } from "../config/interfaces"
import movie_services from "../services/movie_services";

export const addMovie = async(req: Request, res: Response) => {
    const newMovie : Array<completeMovie> = req.body;
    try{
        const response : simpleResponse = await movie_services.createNewMovie(newMovie);
        if(!response.error){
            return res.status(200).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to add a new movie"});
    }
}

export const getLengthOfMovies = async(req: Request, res: Response) => {
    try{
        const response : lengthOfMoviesResponse = await movie_services.amountOfMovies();
        if(!response.error){
            return res.status(200).json(response);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to add a new movie"});
    }
}

export const getAllSelectedMovies = async(req: Request, res: Response) => {
    const amount : number = Number(req.params.amount);
    const page : number = Number(req.params.page);
    try{
        const response : selectMoviesResponse = await movie_services.foundSelectMovies(amount, page);
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to add a new movie"});
    }
}

export const getSelectedMovie = async(req: Request, res: Response) => {
    const name : string = req.params.title;
    try{
        const response : getSingleMovie = await movie_services.getByTitle(name);
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to find selected movie"});
    }
}


export const deleteSelectedMovie = async(req: Request, res: Response) => {
    const name : string = req.params.title;
    try{
        const response : simpleResponse = await movie_services.deleteByTitle(name);
        if(!response.error){
            return res.status(200).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to find selected movie"});
    }
}