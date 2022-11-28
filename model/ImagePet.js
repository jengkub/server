const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PetURL =new Schema({
    id:{
        type:Schema.ObjectId
    },
    name:{
        type:String,
        require:true
    },
    url:{
        type:String,
        require:true
    },
})

module.exports= mongoose.model("petImages",PetURL)