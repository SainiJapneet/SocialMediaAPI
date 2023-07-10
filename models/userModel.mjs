import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String
    },
    userName:{
        type: String,
        unique: [true,"Please use a unique username"],
        required: [true, "Email is a required field"]
    },
    email:{
        type: String,
        unique: [true,"Please use a unique username"],
        required: [true, "Email is a required field"],
        index: true
    },
    password:{
        type: String,
        required: [true, "Password is a required field"]
    }
});

export default mongoose.models.socialUser || mongoose.model("socialUser",userSchema)