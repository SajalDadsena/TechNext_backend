const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware= async(req,res,next)=>{
    const token=req.header("Authorization");
    if(!token)
    {
        return await res.status(401).json({msg:"Unauthorized HTTP"});
    }
    // console.log(token);
    const jwtToken= token.replace("Bearer"," ").trim();
    // console.log(jwtToken);
    try
    {
        const isVerfied=jwt.verify(jwtToken,process.env.JWT_SECRET_KEY);
                                                                    //password ni chiye
        const userData= await User.findOne({email:isVerfied.email}).select({password:0,});

        req.user=userData;
        req.token=token;
        req.userID=userData._id;

        // console.log(userData);


        next();
    }
    catch(error)
    {
        console.log("error from auth-middleware",error)
    }
};

module.exports= authMiddleware;