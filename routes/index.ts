import express from "express";
import { Router} from "express";
import UserRoutes from "./User"
import MovieRoutes from "./Movie"
 
const index : Router = express.Router();

index.use("/user", UserRoutes);
index.use("/movie", MovieRoutes);

export default index;