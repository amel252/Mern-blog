import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/errors.js";
import User from "../models/user.model.js";

// fonction de test
export const test = (req, res) => {
    res.status(200).json({ message: "API valide" });
};

// Function update info utilisateur
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
                    "le nom de l'utilisateur doit contenir entre 7 et 20 caractères."
                )
            );
        }
    }
    // si usename contient un espace
    if (req.body.username && req.body.username.includes(" ")) {
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
        const updatedUser = await User.findByIdAndUpdate(
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
        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
// ---------------function delete utilisateur
export const deleteUser = async (req, res, next) => {
    if (!req.user.isAdmin && req.user._id !== req.params.userId) {
        return next(
            errorHandler(
                403,
                "vous n'ets pas autorisé a supprimer l'utilisateur "
            )
        );
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json("l'utilisateur a été supprimé");
    } catch (error) {
        next(error);
    }
};

//-------------------------------------------------------------------------------------
// function pour récupérer les utilisateurs
export const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(
            errorHandler(
                403,
                "Vous n'avez pas la permission de voir les utilisateurs"
            )
        );
    }
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === "asc" ? 1 : -1;

        const users = await User.find()
            .sort({ createdAt: sortDirection })
            .skip(startIndex)
            .limit(limit);
        const userWithoutPassword = users.map((user) => {
            const { password, ...rest } = user._doc;
            return rest;
        });
        const totalUsers = await User.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );
        const lastMonthUsers = await User.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        // on récupere les users sans password
        res.status(200).json({
            users: userWithoutPassword,
            totalUsers,
            lastMonthUsers,
        });
    } catch (error) {
        next(error);
    }
};

//

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return next(errorHandler(404, "Utilisateur non trouvé"));
        }
        const { password, ...rest } = user._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
};
