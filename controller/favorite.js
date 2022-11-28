const Favorite = require("../model/favorite")

exports.favorites = (req,res) => {
    const data = {
        username:req.body.username,
        petName:req.body.petName,
        type:req.body.type,
    }
    Favorite.find(data).then(info => {
        if(!info[0]){
            Favorite.create(data,(err)=>{
                if(err){
                    return res.json(err)
                }
                return res.status(200).json({success: true ,data:"favorite finish"})
            })
        }
        else{
            return res.status(200).json({success: false ,data:"already favorite this pet"})
        }
    })
}

exports.Disfavorites = (req,res) => {
    const data = {
        username:req.body.username,
        petName:req.body.petName,
        type:req.body.type
    }
    Favorite.find(data).then(info => {
        if(info[0])
        {
            Favorite.remove(data,(err)=>
                {
                if(err)
                {
                    return res.json(err)
                }
                return res.status(200).json({success: true ,data:"deleted"})
            })
        }
        else
        {
            return res.status(200).json({success: false ,data:"can't delete"})
        }
    })
}

exports.checksfavorites = (req,res) => {
    const data = {
        username:req.body.username,
        petName:req.body.petName,
        type:req.body.type
    }
    Favorite.find(data).then(info => {
        if(info[0]){
            return res.status(200).json({success: true})
            }
        return res.status(200).json({success: false})
    })
}

exports.getsfavorites = (req,res) => {
    const data = {
        username:req.body.username,
    }
    Favorite.find(data).then(info => {
        if(info[0]){
            return res.status(200).json({success: true ,data:info})
            }
        return res.status(200).json({success: false ,data:["you're not favorite any pet"]})
    })
}