import mongoose from "mongoose";

const commentModel = new mongoose.Schema({
    content: {
        type: String
    }
})

export default mongoose.models.Comments || mongoose.model("Comments",commentModel)