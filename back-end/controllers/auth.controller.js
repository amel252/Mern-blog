import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
// 3: importé et utilisé ici
import { errorHandler } from "../utils/erros.js";
import jwt from "jsonwebtoken";

// function inscription
export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    console.log(req.body);

    if (
        !username ||
        !email ||
        !password ||
        username === "" ||
        email === "" ||
        password === ""
    ) {
        next(errorHandler(400, "Tous les champs sont requis"));
    }

    // S il n'y a pas de message d erreur je vais hasher le mdp
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        await newUser.save();
        res.status(201).json("Inscription reussie");
    } catch (error) {
        next(error);
    }
};
// function de connexion
export const signin = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password || email === "" || password === "") {
        return next(400, "Tous les champs sont requis");
    }
    try {
        // Cherche l'utilisateur par email
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(400, "Utilisateur non trouvé"));
        }

        // Compare les mots de passe
        const validPassword = bcryptjs.compareSync(
            password,
            validUser.password
        );
        if (!validPassword) {
            return next(errorHandler(400, "Mot de passe invalide"));
        }

        // Création du token JWT
        const token = jwt.sign(
            { id: validUser._id }, // payload
            process.env.JWT_SECRET // clé secrète à stocker dans .env
        );
        //remove password
        const { password: pass, ...rest } = validUser._doc;
        res.status(200)
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .json(rest);
    } catch (error) {
        next(error);
    }
};
// connexion google ne se base pas sur le modele mais display de firebase
export const google = async (req, res, next) => {
    const {email, name, googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user) {
            const token = jwt.sign(
                {id:user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET
            );
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token', token, {
                httpOnly: true,
            }).json(rest)
        } else {
             const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
          email,
          password: hashedPassword,
          profilePicture:googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
        }
    }catch(error){
       next(error)
    }
}