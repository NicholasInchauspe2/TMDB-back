import { Document, Schema, Model, model } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export interface Payload extends JwtPayload {
    user: SimpleUser
}

export interface SimpleUser  {
    _id: string;
    name: string;
    email: string;
}


export interface UserInterface extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    salt: string;
}

const userSchema : Schema<UserInterface> = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    salt: { type: String},
});

userSchema.pre("save", async function(this: UserInterface, next){
        const user = this;
        const salt = bcrypt.genSaltSync(9);
        user.salt = salt;
        const hashedPass = await bcrypt.hash(user.password, salt);
        user.password = hashedPass;
        next();
});
 
userSchema.methods.validatePassword = async function(this: UserInterface, password: string): Promise<{user: boolean}> {
   const input = await bcrypt.hash(password, this.salt);
   return {user: input === this.password};
} 

const User: Model <UserInterface> = model<UserInterface>("User", userSchema);

export { User };