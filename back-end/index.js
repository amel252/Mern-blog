// si on veux créer une route , server  => on doit avoir express
// si on veux créer un model => on doit avoir mongoose
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connection reussie avec la BD");
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.listen(3000, () => {
    console.log("Serveur ok sur le port 3000");
});
