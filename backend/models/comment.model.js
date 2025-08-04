import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        likes: {
            type: Array,
            default: [],
        },
        // on met 0 aprés ca va augmenté
        numberOfLikes: {
            type: Number,
            default: 0,
        },
    },
    { timeseries: true }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
