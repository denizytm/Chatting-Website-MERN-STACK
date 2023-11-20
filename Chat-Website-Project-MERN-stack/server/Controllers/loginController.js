
const User = require("../Database/Models/User")
const bcrypt = require("bcrypt")

module.exports = async (req,res)=> {

    const {username,password} = req.body.userData

    const userDataDB = await User.findOne({username})

    if(userDataDB){
        if(await bcrypt.compare(password,userDataDB.password)){

            await User.updateOne({ _id : userDataDB  },{ isOnline : true })

            const loginUser = await User.findOne({_id : userDataDB._id},{email : 0 , password : 0})

            res.json({
                status : true,
                msg : "Log in successful.",
                user : loginUser
            })
        }
        else 
            res.json({
                status : false,
                msg : "Wrong Password"
            })
    }else 
        res.json({
            status : false,
            msg : "Invalid User"
        })

}
