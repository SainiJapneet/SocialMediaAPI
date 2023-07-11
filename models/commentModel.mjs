import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "socialUser",
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: true
    },
    userName:{
        type: String
    },
    post:{
        type: String
    }
})

export default mongoose.models.Comments || mongoose.model("Comments",commentModel)