import express, { Response, Request } from "express";
import { newUser } from "../models/User";
import { simpleResponse } from "../config/interfaces";
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