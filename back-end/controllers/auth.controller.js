import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (!username || username === "" || email === "" || password === "") {
        return res.status(400).json({ message: "tous le champs sont requis" });
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
        res.status(500).json({ message: error.message });
    }
};
