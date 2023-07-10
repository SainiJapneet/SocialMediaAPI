import jwt from "jsonwebtoken";
import secretKey from "./config.mjs";
import User from "../models/userModel.mjs"

async function authorization(request, response, next){
    try{
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        const userId = decodedToken.userId;
        const user = await User.findById(userId);

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        request.user = user;
        next();
    }catch(error){
        response.status(400).json("Not authorized to perform this action")
    }
}
export default authorization;