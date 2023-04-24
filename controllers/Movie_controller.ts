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
    const newMovie : completeMovie[][] = req.body;
    try{     
        if(newMovie[0] === null){
            return res.status(404).json({message: "Movies body cannot be null"})
        }
        let populate : completeMovie[] = [];
         for(let i = 0; i < newMovie.length; i ++){
            populate = populate.concat(newMovie[i]);
       }  
       let bug : null | any = null
       for(let i = 0; i < populate.length; i++){
        if(!populate[i]?.title && populate[i]?.name){
            populate[i]["title"] = populate[i]?.name
        }
        if(!populate[i]?.backdrop_path && populate[i]?.poster_path){
            populate[i]["backdrop_path"] = populate[i]?.poster_path
        }

        if(!populate[i]?.title || !populate[i]?.overview  || !populate[i]?.vote_average || !populate[i]?.poster_path || !populate[i]?.backdrop_path){
            bug = populate[i];
          populate.splice(populate.indexOf(bug),1);
        }
       }
      
       
        const response : lengthOfMoviesResponse = await movie_services.amountOfMovies(populate);
        if(!response.error){
            return res.status(200).json(response);
        }
        if(response.error && response.length === -1){
            console.log("Entre en el segundo");
            
            const responseOfPopulation : lengthOfMoviesResponse = await movie_services.populateMovie(populate)
            if(!responseOfPopulation.error){
                return res.status(201).json({message: "Sucessfully populate movie Model"});
            }
            return res.status(400).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to add a new movie"});
    }
}

export const getAll = async(req: Request, res: Response) => {
    try{
        const response : selectMoviesResponse = await movie_services.allMovies();
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to add a new movie"});
    }
}

export const lastOne = async(req: Request, res: Response) => {
   /*  const name : string = req.params.title; */
    try{
        const response : getSingleMovie = await movie_services.getLastMovie();
        if(!response.error){
            return res.status(200).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to find selected movie"});
    }
}


export const deleteSelectedMovie = async(req: Request, res: Response) => {
   /*  const name : string = req.params.title; */
    try{
        const response : simpleResponse = await movie_services.deleteAll();
        if(!response.error){
            return res.status(200).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to find selected movie"});
    }
}