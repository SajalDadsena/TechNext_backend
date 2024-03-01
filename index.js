require("dotenv").config();
const cors = require("cors");
const express= require('express');
const authRoute= require('./router/auth-router');
const contactRoute= require('./router/contact-router');
const serviceRoute= require('./router/service-router');
const app =express();
const connectDB= require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");

const corsOptions={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials:true,
}
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth',authRoute);
app.use('/api/form',contactRoute);
app.use('/api/data',serviceRoute);
app.use(errorMiddleware);


// app.get('/',(req,res)=>{
//     res.status(200).send('Welcome');
// })

// app.get('/about',(req,res)=>{
//     res.status(200).send('Welcome to about');
// })

const PORT=3000;

connectDB().then(()=>{


app.listen(PORT,()=>{
    console.log(`Listening at port ${PORT}`)
})

});