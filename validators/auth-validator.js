const {z} =require("zod");

const loginSchema=z.object({
    email:z
    .string({required_error:"Email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(3,{message:"Email must be atleast 3 characters"})
    .max(255,{message:"Email must not be more than 255 characters"}),
    password:z
    .string({required_error:"Password is required"})
    .min(8,{message:"Password must be atleast 8 characters"})
    .max(255,{message:"Password must not be more than 255 characters"}),
})
const signupSchema = loginSchema.extend({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be atleast 3 characters"})
    .max(255,{message:"Name must not be more than 255 characters"}),
   
    phone:z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{message:"Phone must be atleast 10 characters"})
    .max(20,{message:"Phone must not be more than 20 characters"}),
   
});

module.exports= {loginSchema,signupSchema};