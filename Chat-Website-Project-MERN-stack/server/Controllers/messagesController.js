
const Messages = require("../Database/Models/Messages")
const User = require('../Database/Models/User')
const mongoose = require("mongoose")

module.exports.getLastMsg = async(req,res)=>{
    const {user} = req.body

    try{
    const data = await Messages.find({users : {$all : [user._id] } })

    res.send({
        lastMessages : data.map(item=>{
            if(item.lastMessage.message !== ""){
                return item?.lastMessage?.message
            }
        })
    })

    }catch(e){
    console.log(e);
    }

}

module.exports.getMsg = async(req,res)=> {

    const {from,to} = req.body

    try{

        const messagesData = await Messages.findOne({ users : { $all: [from._id,to._id] }})

        if(messagesData){
            res.json({
                messages : messagesData.messages
            })
        }else{
            const newMessages = await Messages.create({ users : [from._id , to._id] })
            res.json({
                messages : newMessages.messages
            })}
        
    }catch(e){
        console.log(e)
    }
}

module.exports.sendMsg = async(req,res)=> {

    const {isPhoto,from,to} = req.body
    
    if(!isPhoto){
        const {message} = req.body
        const sendedMessage = {
            message,
            sender : from._id,
            isPhoto : false,
            sendTime : `${((new Date().getHours().toLocaleString()).length === 0) ? '00' : ((new Date().getHours().toLocaleString()).length === 1) ? `0${new Date().getHours().toLocaleString()}` : (new Date().getHours().toLocaleString()) }:${((new Date().getMinutes().toLocaleString()).length === 0) ? '00' : ((new Date().getMinutes().toLocaleString()).length === 1) ?  `0${new Date().getMinutes().toLocaleString()}` : new Date().getMinutes().toLocaleString()}`
        }
        try{

            const messagesData = await Messages.findOne({ users : { $all: [from._id,to._id] }})
            if (messagesData){
                const newMessages =  messagesData.messages
                newMessages.push(sendedMessage)
                await Messages.updateOne({ users : { $all: [from._id,to._id] }},{messages : newMessages , lastMessage : {message : sendedMessage.message , sender : from._id}})
                res.json({
                    messages : newMessages
                })
            }else { 
                const newMessages = await Messages.create({ users : [ from._id , to._id ], messages : [sendedMessage] , lastMessage : {message : sendedMessage.message , sender : from._id}})
                res.json({
                    messages : newMessages
                })
            }
        }catch(e){
            console.log(e)
        }}else{
  
            const {photo} = req.body
            const sendedMessage = {
                photo,
                sender : from._id,
                isPhoto : true,
                sendTime : `${((new Date().getHours().toLocaleString()).length === 0) ? '00' : ((new Date().getHours().toLocaleString()).length === 1) ? `0${new Date().getHours().toLocaleString()}` : (new Date().getHours().toLocaleString()) }:${((new Date().getMinutes().toLocaleString()).length === 0) ? '00' : ((new Date().getMinutes().toLocaleString()).length === 1) ?  `0${new Date().getMinutes().toLocaleString()}` : new Date().getMinutes().toLocaleString()}`
            }
            try{
                const messagesData = await Messages.findOne({ users : { $all: [from._id,to._id] }})
                if (messagesData){
                    const newMessages =  messagesData.messages
                    newMessages.push(sendedMessage)
                    await Messages.updateOne({ users : { $all: [from._id,to._id] }},{messages : newMessages, lastMessage : {message : 'image' , sender : from._id}})
                    res.json({
                        messages : newMessages
                    })
                }else { 
                    const newMessages = await Messages.create({ users : [ from._id , to._id ], messages : [sendedMessage] , lastMessage : {message : 'image' , sender : from._id}})
                    res.json({
                        messages : newMessages
                    })
                }
            }catch(e){
                console.log(e)
            }
    }
}

module.exports.deleteMsg = async (req,res)=>{
    const {message,from,to} = req.body

    try{
        
        await Messages.updateOne({users : {$all : [from,to]}},{$pull : {messages : message}})

        const newMessages = await Messages.findOne({users : {$all : [from,to]}})

        res.json({
            status : true,
            messages : newMessages
        })

    }catch(e){
        console.log(e)
    }
}
