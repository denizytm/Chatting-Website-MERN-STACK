
module.exports.setUsers = async(req,res)=>{

    const {newContacts} = req.body

    try{

        const userId = new mongoose.Types.ObjectId(req.params.id) 

        if(userId){
        let tempArray = await User.find({ _id : { $ne : userId } },{password : 0, email :0 })
    


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
