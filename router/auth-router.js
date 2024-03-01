const express = require("express");
const authcontrollers =require('../controllers/auth-controller');
const {signupSchema,loginSchema}= require('../validators/auth-validator');
const validate=require('../middlewares/validate-middleware');
const authMiddleware= require('../middlewares/auth-Middleware')

const router = express.Router();

router.route("/").get(authcontrollers.home);

router.route("/register").post(validate(signupSchema),authcontrollers.register);

router.route("/login").post(validate(loginSchema),authcontrollers.login);
// router.get('/about',(req,res)=>{
//     res.status(200).send('This is about using router');
// });
router.route('/user').get(authMiddleware,authcontrollers.user);

module.exports= router;

