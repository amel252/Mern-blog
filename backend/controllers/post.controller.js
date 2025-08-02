import Post from "../models/post.model.js";
import { errorHandler } from "../utils/errors.js";
import mongoose from "mongoose";

export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(
            errorHandler(403, "Vous n'avez pas le droit de publier un article ")
        );
    }
    if (!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Tous les champs sont requis"));
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

export const getPosts = async (req, res, next) => {
    try {
        // Si on a un postId dans la query, on récupère juste ce post précis
        if (req.query.postId) {
            // Vérifier que l'ID est valide
            if (!mongoose.Types.ObjectId.isValid) {
                return next(errorHandler(400, " ID de l'article invalide"));
            }
            const post = await Post.findById(req.query.postId);
            if (!post) {
                return next(errorHandler(404, "Article non trouvé"));
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

            ...(req.query.postId && { _id: req.query.postId }),

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
        // console.log(posts);
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
        return next(errorHandler(400, "ID de l'article invalide"));
    }
    //  if (!req.user.isAdmin || req.user.id !== req.params.userId)
    if (!req.user.isAdmin && req.user.id !== userId) {
        return next(
            errorHandler(
                403,
                "vous n'avez pas le droit de supprimer cet article"
            )
        );
    }
    try {
        await Post.findByIdAndDelete(req.params.postId);
        res.status(200).json("l'article a été supprimé");
    } catch (error) {
        next(error);
    }
};
//
// export const updatePost = async (req, res, next) => {
//     console.log("postId:", req.params.postId);
//     console.log("userId:", req.params.userId);

//     const { postId, userId } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(postId)) {
//         return next(errorHandler(400, "ID de l'article invalide"));
//     }
//     //
//     if (!req.user.isAdmin && req.user.id !== userId) {
//         return next(
//             errorHandler(
//                 403,
//                 " vous n'avez pas le droit de supprimer cet article "
//             )
//         );
//     }

//     try {
//         const updatedPost = await Post.findByIdAndUpdate(
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
//         if (!updatedPost) {
//             return next(errorHandler(404, "Article non trouvé"));
//         }
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         next(error);
//     }
// };
export const updatePost = async (req, res, next) => {
    console.log("postId:", req.params.postId);
    console.log("userId:", req.params.userId);

    const { postId, userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return next(errorHandler(400, "Invalid post ID"));
    }

    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
        return next(
            errorHandler(403, "You are not allowed to update this post")
        );
    }
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            //  req.params.postId,
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
        res.status(200).json(updatedPost);
    } catch (error) {
        next(error);
    }
};
