const pet = require("../model/Pet")
const peturl = require("../model/ImagePet")
const petData = require("../model/DataPet")
var jwt = require('jsonwebtoken');

exports.info = (req,res) => {
    const {name} = req.body
    peturl.find({name:name}).then(animal =>{
        if(!animal[0]){
            return res.json({result:"not found that "})
        }
        else{
            petData.find({name:name}).then(Datapet => {
                if(!Datapet[0]){
                    return res.json({result:"not found that "})
                }
                else{
                    const pipeline = [
                        {
                        '$match': {
                            'name': name
                        }
                        }, {
                        '$addFields': {
                            'hard':Datapet[0].hard,
                            'environment':Datapet[0].environment,
                            'time':Datapet[0].time,
                            'url': animal[0].url
                        }
                        }
                    ]
                    pet.aggregate(pipeline,function( err, data ) {
                        if ( err ){throw err}
                        else{
                            return res.status(200).json(data[0]);
                        }
                    })
                }
            })
        }
    })
}