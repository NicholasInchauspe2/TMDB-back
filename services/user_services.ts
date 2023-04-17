import { User } from "../models/User";
import { newUser, completeUser, logIn, SimpleUser } from "../models/User";
import { validateTokenResponse } from "../config/interfaces";
import { validateToken, generateToken } from "../config/token"

export default class user_services {
    static async createUser(newAccount: newUser): Promise<{ error: boolean, message: string}>{
        try{
            const registerUser : completeUser = await User.create(newAccount);
           const token = generateToken(registerUser);
           console.log(token)
            return{error: false, message: "Successfully save user in the database"};
        }catch(err: unknown){
            if(err instanceof Error){
                return {error: true, message: err.message};
            }
            return{error: true, message: "Unknown Error, failed to save user in the database"};
        }
    }

    static async logInUser(logUser: logIn): Promise<{ error: boolean, message: string, data: SimpleUser | null}>{
        try{
            const loggedUser = await User.findOne({"email": logUser.email});
            if(!loggedUser){ return{error: true, message: "Failed to find the user by email", data: null}};
            const validateUser : {user: boolean} = await loggedUser.validatePassword(logUser.password)
            if(!validateUser.user){return{error: true, message:" Failed to validate password", data: null}};
            const { _id, name, email } = loggedUser
            return{error: false, message: "Succesfully log in the user", data: {_id, name, email} };
        }catch(err: unknown){
            if(err instanceof Error){
                return{error: true, message: err.message, data: null};
            }
            return{error: true, message: "Unknown Error, failed to log in the user", data: null};
        }
    }

    static async validateUser(token: string): Promise<{ error: boolean, message: string, data: SimpleUser | null}>{
        try{
            const response : validateTokenResponse = await validateToken(token);
            if(response.payload){
                return{error: false, message:"Successfully validate user", data: response.payload.user};
            }
            return{error: true, message: "Failed to validate user", data: null};
        }catch(err: unknown){
            if(err instanceof Error){
                return{error: true, message: err.message, data: null};
            }
            return {error: true, message: "Unknown Error, failed to validate user", data: null};
        }
    }
}