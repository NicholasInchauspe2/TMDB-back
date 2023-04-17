import express from "express";
import { Router} from "express";
import UserRoutes from "./User"

const index : Router = express.Router();

index.use("/user", UserRoutes);



export default index;