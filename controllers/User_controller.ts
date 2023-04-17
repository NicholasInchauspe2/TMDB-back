import express, { Response, Request } from "express";
import { newUser, logIn } from "../models/User";
import { simpleResponse, singleUserResponse } from "../config/interfaces";
import user_services from "../services/user_services";


export const register = async(req: Request, res: Response) => {
    const newAccount : newUser = req.body;
    try{
        const response : simpleResponse = await user_services.createUser(newAccount);
        if(!response.error){
            return res.status(201).json(response.message);
        }
        return res.status(400).json(response.message);
    }catch(err: unknown){
        return res.status(400).json({message: "Failed to register the user in the database"});
    }
}

export const logUser = async(req: Request, res: Response) => {
    const logUser : logIn = req.body;
    try{
        const response : singleUserResponse = await user_services.logInUser(logUser);
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(401).json(response.message);
    }catch(err){
        return res.status(400).json({message: "Failed to log the user"});
    }
}

export const validateToken = async(req: Request, res: Response) => {
    const { token } : { token?: string } = req.query;
    try{
        if(typeof token !== "string"){ return res.status(400).json({message: "Invalid Token data type"});};
        const response : singleUserResponse = await user_services.validateUser(token);
        if(!response.error){
            return res.status(200).json(response.data);
        }
        return res.status(400).json(response.message);
    }catch(err){
        return res.status(404).json({message: "Failed to validate user"});
    } 
}