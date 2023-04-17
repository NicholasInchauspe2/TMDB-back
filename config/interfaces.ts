import { SimpleUser, Payload } from "../models/User";


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