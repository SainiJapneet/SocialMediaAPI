import express from "express";
import bcrypt from "bcrypt";
import User from "../models/userModel.mjs";
import Post from "../models/postModel.mjs";
import jwt from "jsonwebtoken";
import Comment from "../models/commentModel.mjs"
import secretKey from "./config.mjs";
import authorization from "./authorization.mjs";

const route = express.Router();

route.post('/register', async (request, response) => {
    try {
      const hashedPassword = await bcrypt.hash(request.body.password, 10);
      console.log("Hashed Password: " + hashedPassword);
  
      const user = new User({
        name: request.body.name,
        userName: request.body.userName,
        email: request.body.email,
        password: hashedPassword,
      });
      const result = await user.save();
      response.status(200).send({
        message: "Created new User \n" + result,
      });
    } catch (error) {
      response.status(500).send({
        message: "User not created ",
        error: error.message,
        
      });
    }
  });
  
  //Sign In
  route.post("/login", async (request, response) => {
    try {
      const user = await User.findOne({ email: request.body.email.toLowerCase().trim() });
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
        name: user.name,
        userName: user.userName
      }, secretKey, { expiresIn: "12h" });
  
      response.status(200).send({
        message: "Logged In",
        email: user.email,
        token
      });
    } catch (error) {
      response.status(400).send({
        message: "Email not found",
        error: error.message
      });
    }
  });

  //getUser
  route.get("/getUser", async (request, response) => {
    try{
      const user = await User.find();
      response.json(user);
      console.log("List of users : ");
      console.log(user);
    }catch(error){
      response.status(500).json({message: error.message});
    }
  })

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

  //addPost
  route.post("/addPost", authorization,async (request, response)=>{
    const post = Post({
        title: request.body.title,
        content: request.body.content,
        tags: request.body.tags,
        userId: request.user.userId,
        userName: request.user.userName
    })
    try{
        const newPost = await post.save();
        response.status(200).json(newPost);
        console.log("New post created");
        console.log(newPost)
    }catch(error){
        response.status(500).json({message : error.message});
    }
  });

  //getPost
  route.get("/getPost",async (request, response)=>{
    try{
      const post = await Post.find();
      response.json(post);
      console.log("All posts");
      console.log(posts);
    }catch(error){
      response.status(500).json({message: error.message});
    }
  })

  //getPostByID
  route.get("/getPost/:id", async (request, response) =>{
    try{
      const id = request.params.id;
      const post = await Post.findById(id);
      response.json(post);
      console.log("Post with id : " + id);
      console.log(post);
    }catch(error){
      response.status(500).json({message: error.message});
    }
  })

  //updatePost
  route.patch("/updatePost/:id",async (request,response)=>{
    try{
      const id = request.params.id;
      const newPost = request.body;
      const options = {new : true};
      const result = await Post.findByIdAndUpdate(id, newPost, options);
      response.send(result);
      console.log("Updated Post");
      console.log(result);
    }catch(error){
      response.status(500).json({message : error.message});
    }
  })

  //deletePost
  route.delete("/deletePost/:id",async (request,response)=>{
    try{
      const id = request.params.id;
      const deletePost = await Post.findByIdAndRemove(id);
      response.send(deletePost);
      console.log("Deleted Post : ");
      console.log(deletePost);
    }catch(error){
      response.status(500).json({message : error.message});
    }
  })

  export default route;