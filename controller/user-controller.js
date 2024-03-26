import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req,res,next)=>{
    let users;
    try{
        users = await  User.find();
    }catch (err){
       return console.log(err);
    }

    if(!users){
        return res.status(404).json({message:"No user found"});
    }
    return res.status(200).json({users});

}

export const signup = async (req,res,next)=>{
    const {username,email,password} = req.body;
    let existingUser;

    try{

        existingUser = User.findOne({email});

    }catch(err){
        return console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User Already existing"});
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hashSync(password,salt);
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    try{

        await user.save();

    }catch (err){
       return console.log(err);
    }

    return res.status(201).json({user});

}


export const login = async (req,res,next) =>{
    const {email,password} = req.body;
    let existingUser;
    try{

        existingUser = await User.findOne({email},null);
    }catch (err){
        return console.log(err);
    }

    if(!existingUser){
        return res.status(404).json({message:"User with that email is not available"});
    }

    const isPasswordCorrect = await bcrypt.compareSync(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message:"Password is not correct"});
    }
    return res.status(200).json({message:"Login successfully"});

}