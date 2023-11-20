
const User = require("../Database/Models/User")
const mongoose = require("mongoose")

const today = new Date()

module.exports.getUser = async(req,res)=> {
    const userId = new mongoose.Types.ObjectId(req.params.id)

    try {
        const user = await User.findOne({_id : userId},{password : 0 , email : 0 })
        
        console.log(user);

        if(user){
            res.json({status : true, user})
        }else {
            res.json({status : false})
        }

    }catch(e){
        console.log(e);
    }

}

module.exports.getUsers = async(req,res)=> {

    try{

    const userId = new mongoose.Types.ObjectId(req.params.id)

    if(userId){
        const allUsers = await User.find({ _id : { $ne : userId } },{password : 0, email :0 }).sort({isOnline : -1 ,lastOnline : -1})

    res.json({
        status : true,
        allUsers 
    })
    }else {
        res.json({
            status : false,
            msg : "An error occured please try again later"
        })
    }

    }catch(e){
        console.log(e);
    }
    
}

module.exports.getFriendRequests = async(req,res)=> {

    const userId = new mongoose.Types.ObjectId(req.params.id)

    const user = await User.findOne({_id : userId})

    if(user) {

        const friendRequests = user.friendRequests.fromOthers

        res.json({status : true , friendRequests })

    }else {
        res.json({status : false})
    }

}

