import { Movie, completeMovie } from "../models/Movie";
import { DeleteDocumentResponse } from "../config/interfaces";


export default class movie_services {
    static async createNewMovie(newMovie : Array<completeMovie>): Promise <{ error: boolean, message: string}>{
           try{
            await Movie.insertMany(newMovie);
            return {error: false, message: "Successfully created a movie in the database"};
           }catch(err){
            if(err instanceof Error){
                return {error: true, message: err.message};
            }
            return{error: true, message: "Unknown Error, failed to create a new movie"};
           }
    }

    static async amountOfMovies(): Promise <{ error: boolean, message: string, length: number}>{
        try{
         const allMovies : Array<completeMovie> = await Movie.find();
         const amount = allMovies.length;
         return {error: false, message: "Successfully get all movies from the database", length: amount};
        }catch(err){
         if(err instanceof Error){
             return {error: true, message: err.message, length: 0};
         }
         return{error: true, message: "Unknown Error, failed to create a new movie", length: 0};
        }
 }

 static async foundSelectMovies(amount: number, page: number): Promise <{ error: boolean, message: string, data: Array<completeMovie> | null}>{
    try{
     const allMovies : Array<completeMovie> = await Movie.find();
     const response = allMovies.splice((page - 1) * amount, amount);
     return {error: false, message: "Successfully get selected movies from the database", data: response};
    }catch(err){
     if(err instanceof Error){
         return {error: true, message: err.message, data: null};
     }
     return{error: true, message: "Unknown Error, failed to create a new movie", data: null};
    }
}

 static async getByTitle(name: string): Promise <{ error: boolean, message: string, data: completeMovie | null}>{
    try{
     const selectedMovie : completeMovie | null = await Movie.findOne({"title": name});
     if(selectedMovie === null){return{error: true, message:"Failed to get movie", data: null}};
     return {error: false, message: "Successfully found selected movie from the database", data: selectedMovie};
    }catch(err){
     if(err instanceof Error){
         return {error: true, message: err.message, data:  null };
     }
     return{error: true, message: "Unknown Error, failed to get selected movie", data: null};
    }
}

static async deleteAll(name: string): Promise <{ error: boolean, message: string }>{
    try{
     const DeleteResult : DeleteDocumentResponse = await Movie.deleteMany();
     if(DeleteResult.deletedCount === 0){return{error: true, message:"Failed to find the movie in the database"}};
     return {error: false, message: "Successfully delete selected movie from database"};
    }catch(err){
     if(err instanceof Error){
         return {error: true, message: err.message};
     }
     return{error: true, message: "Unknown Error, failed to deleted selected movie"};
    }
}
}