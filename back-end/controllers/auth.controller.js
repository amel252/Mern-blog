import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// 3: importé et utilisé ici
import { errorHandler } from "../utils/erros.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (username === "" || email === "" || password === "") {
        next(errorHandler(400, "Tous les champs sont requis"));
    }
    // si y a pas de de msg d'erreur je vais hasher le mdp :
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json("Inscription réussie");
    } catch (error) {
        next(error);
    }
};
