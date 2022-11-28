const userdata = require("../model/user")
var jwt = require('jsonwebtoken');

exports.update = (req,res) =>{
    const token = req.body.userToken
    const userid = jwt.decode(token)
    if(!userid){
        return res.status(400)
    }else{
        userdata.findById(userid.userid).then(userInfo => {
            if(userInfo){
                userdata.findByIdAndUpdate(userid.userid,{
                    $set:{
                        name : req.body.name || userInfo.name,
                        pet : req.body.pet || userInfo.pet
                    }
                }, {new: true} ).then(user => {
                    return res.status(200).json({data:user,response:"success"});
                })
            }
            else{
                return res.json({data:"error",response:"fail"})
            }
        })
    }
}