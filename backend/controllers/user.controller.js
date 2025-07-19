import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import user from "../models/user.model.js";
import User from "../models/user.model.js";

export const test = (req, res) => {
    res.json({ message: "Api valide" });
};

// Function update
export const updateUser = async (req, res, next) => {
    // user existant
    if (req.user.id !== req.params.userId) {
        return next(
            errorHandler(
                403,
                "tu n'a pas l'autoristaion de faire la mise à jour "
            )
        );
    }
    if (req.body.password) {
        if (req.body.password.length < 6) {
            return next(
                errorHandler(
                    400,
                    "le mot de passe doit contenir au moins 6 caractéres"
                )
            );
        }
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // taille de l'username
    if (req.body.username) {
        if (req.body.username.length < 7 || req.body.username.length > 20) {
            return next(
                errorHandler(
                    400,
                    "le nom de l'utilisateur doit contenir moins de 20 caractéres"
                )
            );
        }
    }
    // si usename contient un espace
    if (req.body.username.includes(" ")) {
        return next(
            errorHandler(
                400,
                "le nom de l'utilisateur ne doit pas contenir des espaces"
            )
        );
    }
    // si usename est != de req
    if (req.body.username !== req.body.username.toLowerCase()) {
        return next(
            errorHandler(400, "le nom de l'utilisateur  doit etre en miniscule")
        );
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
            errorHandler(
                400,
                "le nom de l'utilisateur  doit contenir des lettres et les chiffres"
            )
        );
    }
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set: {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture,
                },
            },
            { new: true }
        );
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
