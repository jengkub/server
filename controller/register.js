const userdata = require("../model/user")
const bcrypt = require('bcryptjs');
const saltRounds = 10;

exports.register = (req,res)=>{
    //นำข้อมูลมาใช้
    var password = req.body.password
    switch(true){
        case !req.body.name:
            return res.json({error:"error",data:"need name"})
        case !req.body.username:
            return res.json({error:"error",data:"need Username"})
        case !password:
            return res.json({error:"error",data:"need password"})
    }
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            password=hash;
            const data = {
                name:req.body.name,
                username:req.body.username,
                password:password,
                pet:req.body.pet || "-",
            }
            userdata.create(data,(err)=>{
                if(err) {
                    return res.json({error:"error",data:"already have this username"})
                }
                return res.status(200).json({data:data})
            })
        });
    });
}