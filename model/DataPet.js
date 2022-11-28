const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PetData =new Schema({
    id:{
        type:Schema.ObjectId
    },
    name:{
        type:String,
        require:true
    },
    hard:{
        type:String,
        require:true
    },
    environment:{
        type:String,
        require:true
    },
    time:{
        type:String,
        require:true
    },
})

module.exports= mongoose.model("petData",PetData)