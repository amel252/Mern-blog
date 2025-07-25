import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd0Id0Gh7x0ZrS0s3GMT6vOa3l0pye8P_hPA&s",
        },
        category: {
            type: String,
            default: "uncategorized",
        },
        slug: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true,
    }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
