import express from "express";
import User from "../models/userModel.mjs";
import Post from "../models/postModel.mjs";
import Comment from "../models/commentModel.mjs"
import secretKey from "./config.mjs";

const route = express.Router();

route.post('/register', async (request, response) => {
    try {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      console.log("Hashed Password: " + hashedPassword);
  
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        age: request.body.age,
        address: request.body.address,
      });
  
      const result = await user.save();
      response.status(200).send({
        message: "Created new User",
        result,
      });
    } catch (error) {
      response.status(500).send({
        message: "User not created",
        error,
      });
    }
  });
  
  //Sign In
  route.post("/login", async (request, response) => {
    try {
      const user = await User.findOne({ email: request.body.email });
      console.log(user);
  
      const passwordMatch = await bcrypt.compare(request.body.password, user.password);
      console.log(passwordMatch);
  
      if (!passwordMatch) {
        return response.status(400).send({
          message: "Password doesn't match"
        });
      }
  
      const token = jwt.sign({
        userId: user._id,
        userEmail: user.email,
        userAge: user.age,
        userAddress: user.address
      }, secretKey, { expiresIn: "12h" });
  
      response.status(200).send({
        message: "Logged In",
        email: user.email,
        token
      });
    } catch (error) {
      response.status(400).send({
        message: "Email not found",
        error
      });
    }
  });

  //getUserByID
route.get("/getUser/:id", async (request, response) => {
    try{
      const id = request.params.id;
      const user = await User.findById(id);
      response.json(user);
      console.log("User with id : " + id);
      console.log(user);
    }catch(error){
      response.status(500).json({message: error.message});
    }
  })
  
  //updateUserByID
  route.patch("/updateUser/:id",async (request,response)=>{
    try{
      const id = request.params.id;
      const updatedUser = request.body;
      const options = {new : true};
      const result = await User.findByIdAndUpdate(id , updatedUser, options);
      response.send(result);
      console.log("Updated User");
      console.log(result);
    }catch(error){
      response.status(500).json({message : error.message});
    }
  })
  
  //deleteUserByID
  route.delete("/deleteUser/:id",async (request,response)=>{
    try{
      const id = request.params.id;
      const userDelete = await User.findByIdAndRemove(id);
      response.send(userDelete);
      console.log("Deleted User");
      console.log(userDelete);
    }catch(error){
      response.status(500).json({message : error.message});
    }
  })

  export default route;
  