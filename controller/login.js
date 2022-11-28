const userdata = require("../model/user")
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.login = (req,res) => {
    var {username,password} = req.body
    switch(true){
        case !username:
            return res.json({error:"error",data:"need Username"})
        case !password:
            return res.json({error:"error",data:"need password"})
    }
    userdata.findOne({username}).then(user => {
        if(!user){
            return res.json({error:"error",data:"not have this user"})
        }else{
            bcrypt.compare(password,user.password).then(result =>{
                if(!result){
                    return res.json({error:"error",data:"Wrong password"})
                }else{
                    const token = jwt.sign({userid:user._id},process.env.TOKENSECRET)
                    return res.status(200).json({token,user})
                }
            })
        }
    })
}