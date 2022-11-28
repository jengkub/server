const pet = require("../model/Pet")
const userdata = require("../model/user")
var jwt = require('jsonwebtoken');

exports.predic = (req,res) => {
    const token = req.body.userToken
    const userid = jwt.decode(token)
    var {salary,style,habit} = req.body //รับค่าจากการตอบคำถาม
    userdata.findById(userid.userid).then(data => {
        if (data.pet){
            const UserPet = data.pet
            pet.find({type:UserPet}).then(test => {
                if(test[0]){
                    const pipeline = [
                        {
                            '$match': {
                                style: style, 
                                type: test[0].type,
                                habit:habit,
                                salary: {$lte: Number(salary)}
                            }
                        }
                    ]
                    pet.aggregate(pipeline,function( err, data ) {
                        if ( err ){throw err}
                        else{
                            if(data[0]){
                                return res.status(200).json({success:true,data:data});
                            }
                            else{
                                return res.json({success:false,data:["not found"]})
                            }
                        }
                    })
                }
                else
                {
                    const pipeline = [
                        {
                            '$match': {
                                style: style, 
                                habit:habit,
                                salary: {$lte: Number(salary)}
                            }
                        }
                    ]
                    pet.aggregate(pipeline,function( err, data ) {
                        if ( err ){throw err}
                        else{
                            if(data[0]){
                                return res.status(200).json({success:true,data:data});
                            }
                            else{
                                return res.json({success:false,data:["not found"]})
                            }
                        }
                    })
                }
            })
        }
    })
}