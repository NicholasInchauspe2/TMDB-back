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

    static async amountOfMovies(populate : Array<completeMovie>): Promise <{ error: boolean, message: string, length: number}>{
        try{
         const allMovies = await Movie.find();
         if(!allMovies[0]){
            console.log("entra aca")
            return{error: true, message: "No movies to search", length: -1}
         }
         if(new Date(allMovies[0].createdAt).getDate() !== new Date().getDate()){
             const DeleteResult : DeleteDocumentResponse = await Movie.deleteMany();
            if(DeleteResult.deletedCount === 0){return{error: true, message:"Failed to find the movie in the database",  length: 0}};
            await Movie.insertMany(populate);
            return {error: false, message: "Successfully inserted movies on the db", length: 0};
        }
         return {error: false, message: "Succesfully check if movies model is working", length: allMovies.length};
        }catch(err){
         if(err instanceof Error){
             return {error: true, message: "No movies on the database", length: 0};
         }
         return{error: true, message: "Unknown Error, No movies to check for", length: 0};
        }
 }

 static async populateMovie(populate : Array<completeMovie>): Promise <{ error: boolean, message: string, length: number}>{
    try{
         const movies : Array<completeMovie> = await Movie.insertMany(populate);
            return {error: false, message: "Successfully inserted movies on the db", length: 0};
        }
        catch(err){
             if(err instanceof Error){
                 return {error: true, message: "Could populate database", length: 0};
             }
             return{error: true, message: "Unknown Error, failed to populate database", length: 0};
            }
 }


 static async allMovies(): Promise <{ error: boolean, message: string, data: Record<string, completeMovie[]> | null}>{
    try{
     const allMovies  = await Movie.find();
     let objectsOfArrays : Record<string, completeMovie[]> = {};
     for(let i = 0; i < 8; i++){
        if(!allMovies[20] && allMovies[0]){
            objectsOfArrays[`${i}`] = allMovies.splice(0, allMovies.length);
        }else if(allMovies[20] && allMovies[0]){
            objectsOfArrays[`${i}`] = allMovies.splice(0,20);
        }
     }
     return {error: false, message: "Successfully get selected movies from the database", data: objectsOfArrays};
    }catch(err){
     if(err instanceof Error){
         return {error: true, message: err.message, data: null};
     }
     return{error: true, message: "Unknown Error, failed to create a new movie", data: null};
    }
}

 static async getLastMovie(): Promise <{ error: boolean, message: string }>{
    try{
     const selectedMovie : completeMovie | null = await Movie.findOne().sort({createdAt: -1})
     if(selectedMovie?.createdAt){
        if(new Date(selectedMovie?.createdAt).getDate() !== new Date().getDate()){
            const DeleteResult : DeleteDocumentResponse = await Movie.deleteMany();
            if(DeleteResult.deletedCount === 0){return{error: true, message:"Failed to find the movie in the database"}};
            return {error: false, message: "Successfully delete selected movie from database"};
        }
     }
     if(selectedMovie === null){return{error: true, message:"Failed to get movie"}};
   /*   console.log(new Date(selectedMovie.createdAt))  */
     return {error: false, message: "Successfully check movies date"};
    }catch(err){
     if(err instanceof Error){
         return {error: true, message: err.message};
     }
     return{error: true, message: "Unknown Error, failed to get selected movie"};
    }
}

static async deleteAll(): Promise <{ error: boolean, message: string }>{
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