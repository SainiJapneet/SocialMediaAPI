import jwt from "jsonwebtoken";
import secretKey from "./config.mjs";

async function authorization(request, response, next){
    try{
        const token = request.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, secretKey);
        request.user = decodedToken;
        next();
    }catch(error){
        response.status(400).json("Not authorized to perform this action")
    }
}
export default authorization;