const userdata = require("../model/user")
var jwt = require('jsonwebtoken');
const Favorite = require("../model/favorite")

exports.Delete = (req,res) =>{
    const token = req.body.userToken
    const username = req.body.username
    const userid = jwt.decode(token)
    if(!userid){
        return res.status(400)
    }else{
        userdata.findById(userid.userid).then(userInfo => {
            if(userInfo){
                userdata.findByIdAndDelete(userid.userid)
                .then(user => {
                    return res.status(200).json("Finish");
                })
            }
            else{
                return res.json("delete fail")
            }
        })
        Favorite.find({username}).then(info => {
            if(info[0])
            {
                Favorite.remove({username},(err)=>
                {
                if(err)
                {
                    return res.json(err)
                }
                else{
                    console.log("here")
                }
            })
            }
            else
            {
                console.log("hello")
            }
        })
    }
}
