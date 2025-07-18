import jwt from "jsonwebtoken";
import { errorHandler } from "./errors.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return next(errorHandler(401, "Vous n'etes pas autorisé"));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return next(errorHandler(401, "vous n'etes pas autorisé"));
        }
        req.user = user;
        next();
    });
};
