const Contact = require('../models/contact-model');

const contactFrom = async(req,res)=>{
    try{
        console.log(req.body);
        const response = req.body;
        await Contact.create(response);

        return res.status(200).json({msg:"Message sent successfully"});
    }
    catch(error)
    {
        return res.status(500).json({msg:"Message not sent"});

    }
};

module.exports=contactFrom;