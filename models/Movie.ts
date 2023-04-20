import { Document, Schema, Model, model } from "mongoose";

export interface completeMovie{
    title: string;
/*     genresList: Array<string>; */
    overview: string;
    vote_average: number;
    adult: boolean;
    poster_path: string;
    backdrop_path: string;
}

interface movieInterface extends Document{
    _id: string;
    title: string;
/*     genresList: Array<string>; */
    overview: string;
    vote_average: number;
    adult: boolean;
    createdAt: number;
    poster_path: string;
    backdrop_path: string;
}

const movieSchema : Schema<movieInterface> = new Schema({
    title: {type: String, required: true},
/*     genresList: {type: [String], required: true}, */
    createdAt: {type: Number, default: Date.now(), required: true},
    overview: {type: String, required: true},
    vote_average: {type: Number, required: true},
    adult: {type: Boolean, required: true},
    poster_path: {type: String, required: true},
    backdrop_path: {type: String, required: true}
})

const Movie : Model<movieInterface> = model<movieInterface>("movie", movieSchema);

export { Movie }