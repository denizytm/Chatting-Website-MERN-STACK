
const socket = require("socket.io");
const User = require("../Database/Models/User")
const mongoose = require("mongoose")

const initializeSocket = (server, corsOrigin) => {
  const io = socket(server, {
    cors: {
      origin: corsOrigin,
    },
  });

    global.onlineUsers = new Map()

  io.on("connection", async(socket) => {

    socket.on('join-room',userId=>{
        console.log('user has joined '+userId)
    })

    socket.on("add-user",async(userId)=> {
        onlineUsers.set(userId,socket.id)
        const dataArray = onlineUsers.keys()
        console.log(onlineUsers);
    try{
        await User.updateOne({ _id : userId }, { isOnline: true });

        await User.updateMany({_id : { $not : { $in : [...dataArray]}}},{isOnline : false})

        onlineUsers.forEach(async(value,key) => {
            socket.to(value).emit("get-status",({status : true , id : userId}))
        })
    }catch(e){
        console.log(e);
    }
    })

    socket.on("set-image", async(data)=> {
        const {userId} = data

        const newUserData = await User.findOne({_id : userId},{password : 0 , email : 0})

        onlineUsers.forEach((value,key)=> {
            socket.to(value).emit("image-changed",{status : true , user : newUserData})
        })

    })

    socket.on("send-message", async(data)=> {
        const toUser = onlineUsers.get(data.to)

        try{
        const fromUser = await User.findOne({_id : data.from},{_id : 0 , username : 1})

        if(toUser){
            socket.to(toUser).emit("message-recieve",{message : data.message })
            socket.to(toUser).emit("message-alert",{message : data.message , from : fromUser})
        }}catch(e){
            console.log(e);
        }
    })

    socket.on('delete-message',async(data)=>{
        const toUser = onlineUsers.get(data.to)
        socket.to(toUser).emit('message-deleted')
    })

    socket.on("send-friend-req",async(data)=> {

        const {from,to} = data

        try{
            let fromUser = await User.findOne({_id : from },{email : 0 , password : 0})
            let toUser = await User.findOne({_id : to},{email : 0 , password : 0})

            if(!fromUser.friendRequests.toOthers.includes(to) && !toUser.friendRequests.fromOthers.includes(from) && !toUser.friendRequests.toOthers.includes(from)){

            let tempArray = fromUser.friendRequests.toOthers

            tempArray.push(to)

            await User.updateOne({_id : from},{ "friendRequests.toOthers" : tempArray })

            tempArray = toUser.friendRequests.fromOthers
            tempArray.push(from)

            await User.updateOne({_id : to }, { "friendRequests.fromOthers" : tempArray })

            const toSocket = onlineUsers.get(data.to)

            fromUser = await User.findOne({_id : from },{email : 0 , password : 0})
            toUser = await User.findOne({_id : to},{email : 0 , password : 0})

            socket.to(toSocket).emit("get-friend-req", { status : true , user : toUser})
            
            }else {
                const toSocket = onlineUsers.get(data.to)
                socket.to(toSocket).emit("get-friend-req", { status : false})
            }
        }catch(e){
            console.log(e);
        }
    })

    socket.on("accept-request",async(data)=> {
        const {acceptReceiver,acceptSender} = data

        try {

            let acceptUser = await User.findOne({_id : acceptReceiver},{email : 0 , password : 0})
            let senderUser = await User.findOne({_id : acceptSender},{email : 0 , password : 0})

            await User.updateOne({_id : acceptReceiver},{ $push : {friends : senderUser._id} , $pull : {"friendRequests.fromOthers" : acceptSender}})
            await User.updateOne({_id : acceptSender}, { $push : {friends : acceptUser._id} , $pull : {"friendRequests.toOthers" : acceptReceiver}})

            acceptUser = await User.findOne({_id : acceptUser._id},{email : 0 , password : 0})
            senderUser = await User.findOne({_id : senderUser._id},{email : 0 , password : 0})

            const fromSocket = onlineUsers.get(acceptSender)

            socket.to(fromSocket).emit("request-accepted",({status : true , user : senderUser}))
            socket.emit("request-accepted",({status : true , user : acceptUser }))
            

        }catch(e){
            console.log(e);
        }

    })

    socket.on("refuse-request",async(data)=> {
        const {refuseReceiver,refuseSender} = data

        try{
            
            let refuseUser = await User.findOne({_id : refuseReceiver},{email : 0 , password : 0})
            let senderUser = await User.findOne({_id : refuseSender},{email : 0 , password : 0})

            await User.updateOne({_id : refuseReceiver},{ $pull : {"friendRequests.fromOthers" : refuseSender}})
            await User.updateOne({_id : refuseSender}, { $pull : {"friendRequests.toOthers" : refuseReceiver}})

            refuseUser = await User.findOne({_id : refuseUser._id},{email : 0 , password : 0})
            senderUser = await User.findOne({_id : senderUser._id},{email : 0 , password : 0})

            const fromSocket = onlineUsers.get(refuseSender)

            socket.to(fromSocket).emit("request-refused",({status : true , user : senderUser}))
            socket.emit("request-refused",({status : true , user : refuseUser })) 

        }catch(e){
            console.log(e);
        }

    })

    socket.on("remove-friend",async(data)=> {
        const {one,two} = data

        let userOne = await User.findOne({_id : one},{email : 0 , password : 0})
        let userTwo = await User.findOne({_id : two},{email : 0 , password : 0})

        await User.updateOne({ _id: one }, { $pull: { friends : userTwo._id } })
        await User.updateOne({ _id: two }, { $pull: { friends :  userOne._id  } })

        userOne = await User.findOne({_id : one},{email : 0 , password : 0})
        userTwo = await User.findOne({_id : two},{email : 0 , password : 0})

        const toSocket = onlineUsers.get(two)

        socket.emit("friend-removed",{status : true , user : userOne})

        socket.to(toSocket).emit("friend-removed",{status : true , user : userTwo})

    })

    socket.on('disconnect', ()=> {
        console.log('socket disconnected : ' + socket.id)

        let disconnectedId = ""

        onlineUsers.forEach(async(key,value)=> {
            if(key===socket.id)
            disconnectedId = value
        })

        onlineUsers.forEach(async(value,key) => {
            if(value === socket.id){
                onlineUsers.delete(key)
                await User.updateOne({_id : key},{isOnline : false})
                await User.updateOne({_id : key},{lastOnline : new Date().getTime()})
            };
            socket.to(value).emit("get-status",({status : true ,id : disconnectedId}))
        })
        socket.emit("get-status",({status : true ,id : disconnectedId}))
    })

    socket.on("log-out",async(userId)=> {

        onlineUsers.forEach(async(value,key) => {
            if(value === socket.id){
                onlineUsers.delete(key)
                await User.updateOne({_id : key},{isOnline : false})
                await User.updateOne({_id : key},{lastOnline : new Date()})
            };
            socket.to(value).emit("get-status",({status : true ,id : userId}))
        })
        socket.emit("get-status",({status : true ,id : userId}))
        console.log(onlineUsers);

    })

})
  return io
}

module.exports = initializeSocket