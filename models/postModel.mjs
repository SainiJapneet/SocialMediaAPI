import mongoose from "mongoose";

const postModel = new mongoose.Schema({
    title:{
        type: String
    },
    content:{
        type: String
    },
    tags:{
        type: String
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "socialUser",
        required: true
    },
    userName:{
        type: String
    }
})

export default mongoose.models.Posts || mongoose.model("Posts",postModel);