import { Document, Schema, Model, model } from "mongoose";

export interface completeMovie{
     id:number
    _id: string;
    title?: string;
    name?:string;
    overview: string;
    vote_average: number;
    createdAt: number;
    adult: boolean;
    poster_path: string;
    backdrop_path: string;
    media_type?: string;
}

interface movieInterface extends Document{
    id:number
    _id: string;
    title: string;
    overview: string;
    vote_average: number;
    adult: boolean;
    createdAt: number;
    poster_path: string;
    backdrop_path: string;
    media_type?: string;
}

const movieSchema : Schema<movieInterface> = new Schema({
    id:{type: Number, required: true},
    media_type:{type: String},
    title: {type: String, required: true},
    createdAt: {type: Number, default: Date.now(), required: true},
    overview: {type: String, required: true},
    vote_average: {type: Number, required: true},
    adult: {type: Boolean, required: true},
    poster_path: {type: String, required: true},
    backdrop_path: {type: String, required: true},
})

const Movie : Model<movieInterface> = model<movieInterface>("movie", movieSchema);

export { Movie }