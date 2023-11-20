const User = require("../Database/Models/User")

module.exports.setBackgroundImage = async(req,res)=> {

    try{
        const {id} = req.params

        const {data} = req.body

        const user = await User.findOne({_id : id},{email : 0 , password : 0})

        if(user){
            user.isBackgroundImageSet=true
            user.backgroundImage = data
            await user.save()

            res.json({status : true , user })

        }else {
            res.json({status : false})
    }
    }catch(e){
    console.log(e);
    }
}

module.exports.setProfileImage = async(req,res)=> {

    try {
        const {id} = req.params

        const {data} = req.body

        const user = await User.findOne({_id : id},{password : 0 , email : 0})

        if(user){
            user.isImageDefault = false
            user.image = data
            await user.save()

            res.json({status : true , user})

        }else {
            res.json({status : false})
        }
    }catch(e){
        console.log(e);
    }
}
