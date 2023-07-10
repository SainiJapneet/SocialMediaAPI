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
    userName:{
        type: String
    }
})

export default mongoose.models.Posts || mongoose.model("Posts",postModel);