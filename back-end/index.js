// si on veux créer une route , server  => on doit avoir express
// si on veux créer un model => on doit avoir mongoose
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
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
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Serveur ok sur le port 3000");
});
// lire les routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// 2- creation de middleware
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal server";
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// });
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});
