
const User = require("../Database/Models/User")
const bcrypt = require("bcrypt")

module.exports = async(req,res)=> {

    try{

    const {username,email,password} = req.body.userData

    const checkUsername = await User.findOne({username})
    const checkEmail = await User.findOne({email})

    if(checkUsername){
        return res.json({
            status : false,
            msg : "Already have an user with that username :("
        })
    } 

    if(checkEmail){
        return res.json({
            status : false,
            msg : "Already have an user with that email :("
        })
    }

    const hashedPassword = await bcrypt.hash(password,10)

    const newUser = await User.create({username,email,password : hashedPassword , isOnline : true})

    const registerUser = await User.findOne({_id : newUser._id},{password : 0 , email : 0})

    res.json({
        status : true,
        msg : "User Created Successfuly",
        user : registerUser
    })}catch(e){
        console.log(e);
    }

}