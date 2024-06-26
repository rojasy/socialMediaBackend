import express from 'express';
import mongoose from 'mongoose';
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";

const app = express();

app.use(express.json());

app.use("/api/user",router);
app.use("/api/blog",blogRouter);

mongoose.connect(
    "mongodb+srv://admin:TcaCXP1PeQu5j5Xv@cluster0.jb3vknp.mongodb.net/socialMedia?retryWrites=true&w=majority&appName=Cluster0").
then(()=>app.listen(5001)).
then(()=>console.log("connected to localhost port 5001")).catch((err)=>console.log(err));

