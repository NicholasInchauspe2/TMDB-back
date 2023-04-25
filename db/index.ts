import mongoose from "mongoose";

async function dbConnection() {
    try{
        await mongoose.connect("mongodb+srv://NicolasInchauspe2:Testing@tmdb-back.syxig9b.mongodb.net/test", {
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