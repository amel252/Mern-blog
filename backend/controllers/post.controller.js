// import Post from "../models/post.model.js";
// import { errorHandler } from "../utils/errors.js";
// import mongoose from "mongoose";

// export const create = async (req, res, next) => {
//     if (!req.user.isAdmin) {
//         return next(
//             errorHandler(403, "Vous n'avez pas le droit de publier un article ")
//         );
//     }
//     if (!req.body.title || !req.body.content) {
//         return next(errorHandler(400, "Tous les champs sont requis"));
//     }
//     // on crée un espace entre les mots puis le tiret
//     const slug = req.body.title
//         .split(" ")
//         .join("-")
//         .toLowerCase()
//         .replace(/[^a-zA-Z0-9-]/g, "");

//     const newPost = new Post({
//         ...req.body,
//         slug,
//         userId: req.user.id,
//     });
//     try {
//         const savePost = await newPost.save();
//         res.status(201).json(savePost);
//     } catch (error) {
//         next(error);
//     }
// };

// export const getPosts = async (req, res, next) => {
//     try {
//         // Validation du postId
//         if (
//             req.query.postId &&
//             !mongoose.Types.ObjectId.isValid(req.query.postId)
//         ) {
//             return next(errorHandler(400, "Invalid post ID"));
//         }

//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.order === "asc" ? 1 : -1;

//         // Création du filtre dynamique
//         const filter = {
//             ...(req.query.userId && { userId: req.query.userId }),
//             ...(req.query.category && { category: req.query.category }),
//             ...(req.query.slug && { slug: req.query.slug }),
//             ...(req.query.postId && { _id: req.query.postId }),
//             ...(req.query.searchTerm && {
//                 $or: [
//                     {
//                         title: {
//                             $regex: req.query.searchTerm,
//                             $options: "i",
//                         },
//                     },
//                 ],
//             }),
//         };

//         // Requête principale avec filtres, tri, pagination
//         const posts = await Post.find(filter)
//             .sort({ updatedAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit);

//         // Total posts filtrés
//         const totalPosts = await Post.countDocuments(filter);

//         const now = new Date();
//         const oneMonthAgo = new Date(
//             now.getFullYear(),
//             now.getMonth() - 1,
//             now.getDate()
//         );

//         // Nombre de posts du dernier mois
//         const lastMonthPosts = await Post.countDocuments({
//             createdAt: { $gte: oneMonthAgo },
//         });

//         res.status(200).json({
//             posts,
//             totalPosts,
//             lastMonthPosts,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

// export const deletePost = async (req, res, next) => {
//     if (!req.user.isAdmin && req.user.id !== req.params.userId) {
//         return res.status(403).json({
//             message: "Vous n'êtes pas autorisé",
//         });
//     }
//     try {
//         await Post.findByIdAndDelete(req.params.postId);
//         res.status(200).json({
//             message: "L'article a été supprimé avec succès",
//         });
//     } catch (error) {
//         // next(error);
//         console.error("Erreur serveur lors de la suppression :", error);
//         return res.status(500).json({
//             message: "Erreur serveur lors de la suppression",
//         });
//     }
// };

// // update article
// export const updatePost = async (req, res, next) => {
//     const { postId, userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(postId)) {
//         return next(errorHandler(400, "Invalid post ID"));
//     }

//     if (req.user.id !== req.params.userId && !req.user.isAdmin) {
//         return next(errorHandler(403, "Vous n'etes pas auto"));
//     }
//     try {
//         const updatePost = await Post.findByIdAndUpdate(
//             // req.params.postId,
//             postId,
//             {
//                 $set: {
//                     title: req.body.title,
//                     content: req.body.content,
//                     image: req.body.image,
//                     category: req.body.category,
//                 },
//             },
//             { new: true }
//         );
//         if (!updatePost) {
//             return next(errorHandler(404, "Article non trouvé"));
//         }
//         res.status(200).json(updatePost);
//     } catch (error) {
//         next(error);
//     }
// };
import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errors.js";
import mongoose from "mongoose";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, "You are not allowed to create a post"));
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Please provide all required fields"));
    }
    const slug = req.body.title
        .split(" ")
        .join("-")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9-]/g, "");
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        next(error);
    }
};

// export const getPosts = async (req, res, next) => {
//     try {
//         const startIndex = parseInt(req.query.startIndex) || 0;
//         const limit = parseInt(req.query.limit) || 9;
//         const sortDirection = req.query.order === "asc" ? 1 : -1;
//         const posts = await Post.find({
//             ...(req.query.userId && { userId: req.query.userId }),
//             ...(req.query.category && { category: req.query.category }),
//             ...(req.query.slug && { slug: req.query.slug }),
//             ...(req.query.postId && { _id: req.query.postId }),
//             ...(req.query.searchTerm && {
//                 $or: [
//                     { title: { $regex: req.query.searchTerm, $options: "i" } },
//                     {
//                         content: {
//                             $regex: req.query.searchTerm,
//                             $options: "i",
//                         },
//                     },
//                 ],
//             }),
//         })
//             .sort({ updatedAt: sortDirection })
//             .skip(startIndex)
//             .limit(limit);

//         const totalPosts = await Post.countDocuments();

//         const now = new Date();

//         const oneMonthAgo = new Date(
//             now.getFullYear(),
//             now.getMonth() - 1,
//             now.getDate()
//         );

//         const lastMonthPosts = await Post.countDocuments({
//             createdAt: { $gte: oneMonthAgo },
//         });

//         res.status(200).json({
//             posts,
//             totalPosts,
//             lastMonthPosts,
//         });
//     } catch (error) {
//         next(error);
//     }
// };

export const getPosts = async (req, res, next) => {
    try {
        // Si on a un postId dans la query, on récupère juste ce post précis
        if (req.query.postId) {
            // Vérifier que l'ID est valide
            if (!mongoose.Types.ObjectId.isValid(req.query.postId)) {
                return next(errorHandler(400, "Invalid post ID"));
            }
            const post = await Post.findById(req.query.postId);
            if (!post) {
                return next(errorHandler(404, "Post not found"));
            }
            // Retourner le post dans un tableau (comme avant)
            return res.status(200).json({
                posts: [post],
                totalPosts: 1,
                lastMonthPosts: 0, // ou calculer si besoin
            });
        }

        // Sinon, ta logique habituelle pour chercher plusieurs posts
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.order === "asc" ? 1 : -1;

        const posts = await Post.find({
            ...(req.query.userId && { userId: req.query.userId }),
            ...(req.query.category && { category: req.query.category }),
            ...(req.query.slug && { slug: req.query.slug }),
            ...(req.query.searchTerm && {
                $or: [
                    { title: { $regex: req.query.searchTerm, $options: "i" } },
                    {
                        content: {
                            $regex: req.query.searchTerm,
                            $options: "i",
                        },
                    },
                ],
            }),
        })
            .sort({ updatedAt: sortDirection })
            .skip(startIndex)
            .limit(limit);

        const totalPosts = await Post.countDocuments();

        const now = new Date();

        const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            now.getDate()
        );

        const lastMonthPosts = await Post.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        });
        console.log(posts);
        res.status(200).json({
            posts,
            totalPosts,
            lastMonthPosts,
        });
    } catch (error) {
        next(error);
    }
};
////
export const deletePost = async (req, res, next) => {
    console.log("postId:", req.params.postId);
    console.log("userId:", req.params.userId);

    const { postId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return next(errorHandler(400, "Invalid post ID"));
    }

    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(
            errorHandler(403, "You are not allowed to delete this post")
        );
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("The post has been deleted");
    } catch (error) {
        next(error);
    }
};
export const updatePost = async (req, res, next) => {
    const { postId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return next(errorHandler(400, "Invalid post ID"));
    }

    if (!req.user.isAdmin && req.user.id !== userId) {
        return next(
            errorHandler(403, "You are not allowed to update this post")
        );
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            {
                $set: {
                    title: req.body.title,
                    content: req.body.content,
                    category: req.body.category,
                    image: req.body.image,
                },
            },
            { new: true }
        );
        if (!updatedPost) {
            return next(errorHandler(404, "Post not found"));
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};

// export const updatePost = async (req, res, next) => {
//     console.log("postId:", req.params.postId);
//     console.log("userId:", req.params.userId);

//     const { postId, userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(postId)) {
//         return next(errorHandler(400, "Invalid post ID"));
//     }

//     if (!req.user.isAdmin || req.user.id !== req.params.userId) {
//         return next(
//             errorHandler(403, "You are not allowed to update this post")
//         );
//     }
//     try {
//         const updatedPost = await Post.findByIdAndUpdate(
//             //  req.params.postId,
//             postId,
//             {
//                 $set: {
//                     title: req.body.title,
//                     content: req.body.content,
//                     category: req.body.category,
//                     image: req.body.image,
//                 },
//             },
//             { new: true }
//         );
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         next(error);
//     }
// };
