// si on veux créer une route , server  => on doit avoir express
// si on veux créer un model => on doit avoir mongoose
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connection reussie avec la BD");
    })
    .catch((err) => {
        console.log(err);
    });

// lire le server:
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Serveur ok sur le port 3000");
});
// lire les routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
