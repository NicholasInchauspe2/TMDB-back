import mongoose from "mongoose";

async function dbConnection() {
    try{
        await mongoose.connect("mongodb://localhost/test", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as any);
        console.log("TMDB ON TYPESCRIPT ON");
    }
    catch(err: unknown){
        if(err instanceof Error){
            return err.message;
        }
        return "Unknown error, Failed to init DB TYPESCRIPT";
    }
    
}

export default dbConnection;