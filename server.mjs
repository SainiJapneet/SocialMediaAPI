import express from "express";
import routes from "./routes/routes.mjs";
import dbConnect from "./models/dbConnect.mjs"

const port = 8080;
const app = express();

dbConnect();

app.use(express.json());
app.use('/api',routes);
app.use(express.urlencoded({extended: true}));
app.listen(port, ()=> {
    console.log("Server initiated on port " + port);
});