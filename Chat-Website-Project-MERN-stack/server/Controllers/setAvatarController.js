
const User = require("../Database/Models/User")

module.exports = async(req,res)=> {

    try{

    const {image} = req.body
    
    const updatedUser = await User.updateOne({_id : req.params.id},{image , isImageSet : true})

    if(updatedUser){
        res.json({
            status : true,
            msg : "Successfuly set the image"
        })
    }else {
        res.json({
            status : false,
            msg : "Couldn't find the user data"
        })
    }

    }catch(e){
        console.log(e);
    }
}
