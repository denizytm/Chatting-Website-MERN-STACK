
const User = require("../Database/Models/User")
const mongoose = require("mongoose")

module.exports = async(req,res)=> {

    const userId = new mongoose.Types.ObjectId(req.params.id)

    const userData = await User.findOne({_id : userId})

    if(userData){

        await User.updateOne({ _id : userId },{ isOnline : false })

        res.json({
            status : true
        })

    }else 
        res.json({
            status : false
        })

}
