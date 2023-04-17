import jwt, { JwtPayload } from "jsonwebtoken";
const SECRET : string = "DMG-01";
import { Payload, SimpleUser } from "../models/User";

export const generateToken = async(payload: SimpleUser): Promise<{ token: string | null, message: string}> => {
    try{
        const token : string = jwt.sign({user: payload}, SECRET, {expiresIn: "2d"});
        return { token, message: "Succesfully generate token"};
    }catch(err: unknown){
        if(err instanceof Error){
            return{token: null, message: err.message};
        }
        return{token: null, message: "Unknown Error, failed to generate token"};
    }
}

export const validateToken = async(token: string): Promise<{ payload: Payload | null, token: string, message: string}> => {
    try{
        const payload = jwt.verify(token, SECRET) as Payload;
        return {payload, token, message: "Succesfully validate token"};
    }catch(err: unknown){
        if(err instanceof Error){
            return{token, payload: null, message: err.message};
        }
        return{token, message: "Unknown Error, failed to generate token", payload: null};
    }
}
