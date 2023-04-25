import express, { Application } from "express";
import cors from "cors";
import dbConnection from "./db/index";
import { User, UserInterface } from "./models/User";
import { Movie } from "./models/Movie";
import index from "./routes/index";


const app : Application = express();

dbConnection()

app.use(express.static("public"));

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE", "OPTIONS", "PUT"],
    credentials: true,
  }));

app.use(express.json());

app.use("/api", index);

const port = 3001;

app.listen(port, () => {
    console.log("TMDB API listening on port ", port);
});


