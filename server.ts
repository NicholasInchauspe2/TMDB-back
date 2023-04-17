import express, { Application } from "express";
import cors from "cors";
import dbConnection from "./db/index";
import { User, UserInterface } from "./models/User";
import index from "./routes/index";


const app : Application = express();

dbConnection()

app.use(express.static("public"));

app.use(cors());

app.use(express.json());

app.use("/api", index);

const port = 3001;

app.listen(port, () => {
    console.log("TMDB API listening on port ", port);
});


const createUser = async () => {
 const usuario = await User.create( {
        name: "Administrador General",
        email: "admin@example.com",
        password: "testing",
      }); 
      usuario.save();
}

createUser();