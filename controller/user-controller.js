import User from "../models/User.js";

export const getAllUser = async (req,res,next)=>{
    let users;
    try{
        users = await  User.find();
    }catch (err){
        console.log(err);
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

        existingUser = await User.findOne({email});

    }catch(err){
        console.log(err);
    }

    if(existingUser){
        return res.status(400).json({message: "User Already existing"});
    }
    const user = User({
        username,
        email,
        password
    });

    try{

        await user.save();

    }catch (err){
        console.log(err);
    }

    return res.status(201).json({user});

}