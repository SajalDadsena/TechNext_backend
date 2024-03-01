const User = require("../models/user-model")
const bcrypt = require("bcryptjs");



const home= async(req,res)=>{
    try{
        res.status(200).send('This is home using router and controller');
    }
    catch(error){
        res.status(400).send({msg:"page not found"});
    }

};

const register= async(req,res)=>{
    try{
        console.log(req.body);
        const {username,email,phone,password}=req.body;

        const userExists= await User.findOne({email: email});

        if(userExists){
            return res.status(400).json({message:"email already exists"});
        }

        //SECURING PASSWORD WITH BCRYPT

        // const saltRound =10;
        // const hash_password= await bcrypt.hash(password, saltRound);
        // const userCreated=await User.create({username,email,phone,password:hash_password}); 
        
        
        const userCreated=await User.create({username,email,phone,password}); 



        // // JSON WEB TOKEN FOR AUTHENTICATION AND AUTHORIZATION
        res.status(201).json({
            // msg:userCreated,
            msg:"Registration Successful",
            token: await userCreated.generateToken(),
            userId: userCreated._id.toString(),});
    }
    catch(error){
        console.log(error);
        // res.status(500).json("internal server error");
        next(error);
    }

};

const login = async(req,res)=>{

    try{
        const {email,password}=req.body;

        const userExists= await User.findOne({email});

        if(!userExists){
            return res.status(400).json({message:"Invalid Credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password,userExists.password);

        if(isPasswordValid)
        {
            
            res.status(200).json({message:"Login Successful", token: await userExists.generateToken(), userId: userExists._id.toString()});

        }
        else{
            res.status(401).json({message:"Invalid name or password"});
        }


    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({msg:"internal server error"});
    }

}

//USER LOGIC - to send user data

const user =async(req,res)=>{
    try{
        const userData=req.user;
        // console.log(userData);

        return res.status(200).json({userData});
    }
    catch(error)
    {
        console.log("error from the user route",error);
    }
}

module.exports={home,register,login,user};