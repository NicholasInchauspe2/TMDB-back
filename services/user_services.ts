import { User } from "../models/User";
import { newUser, completeUser } from "../models/User";
import { simpleResponse } from "../config/interfaces";

export default class user_services {
    static async createUser(newAccount: newUser): Promise<{ error: boolean, message: string}>{
        try{
            const registerUser : completeUser = await User.create(newAccount);
            return{error: false, message: "Successfully save user in the database"};
        }catch(err: unknown){
            if(err instanceof Error){
                return {error: true, message: err.message};
            }
            return{error: true, message: "Unknown Error, failed to save user in the database"};
        }
    }
}