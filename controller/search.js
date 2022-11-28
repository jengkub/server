const pet = require("../model/Pet")
const peturl = require("../model/ImagePet")

exports.search = (req,res) => {
    const {type} = req.body
    var {min,max} = req.body
    if(max === ""){
        max = "99999999"
    }
    const pipeline1 = [
        {
            '$match': {
                'salary': {
                '$gt': Number(min), 
                '$lte': Number(max)
                }
            }
        }
    ]
    pet.aggregate(pipeline1,function( err, data ) {
        if ( err ){throw err}
        if(!data[0]){
            return res.json({success:false,data:["not found"]})
        }
        else{
            if(type){
                const pipeline2 = [
                    {
                        '$match': {
                            salary: {
                            '$gt': Number(min), 
                            '$lte': Number(max)
                            },
                            type:type
                        }
                    }
                ]
                pet.aggregate(pipeline2,function( err, ComAnimal ) {
                    if ( err ){throw err}
                    else{
                        return res.status(200).json({success:true,data:ComAnimal});
                    }
                })
            }
            else{
                return res.status(200).json({success:true,data:data});
            }
        }
    })
}