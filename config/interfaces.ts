import { SimpleUser, Payload } from "../models/User";
import { completeMovie } from "../models/Movie";


export interface simpleResponse {
    error: boolean;
    message: string
}


export interface singleUserResponse {
    error: boolean;
    message: string;
    data: SimpleUser | null;
}

export interface validateTokenResponse {
    payload: Payload | null;
    token: string;
    message: string;
}


export interface lengthOfMoviesResponse {
    error: boolean;
    message: string;
    length: number;
}

export interface getSingleMovie {
    error: boolean;
    message: string;
    data: completeMovie | null;
}


export interface selectMoviesResponse {
    error: boolean;
    message: string;
    data: Array<completeMovie> | null;
}

export interface DeleteDocumentResponse {
    deletedCount: number;
 }
 


