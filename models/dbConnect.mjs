import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnect(){
    const connectionString = process.env.DB_URL;
    mongoose.connect(connectionString, {
        useNewUrlPareder: true,
        useUnifiedTopology: true,
        writeConcern: {
            w: "majority",
            wtimeout: 0
        }  
        }).then(()=>{
            console.log("DB connected");
        }).catch((error)=>{
            console.log("DB connection failed : " + error)
        })
}

export default dbConnect;