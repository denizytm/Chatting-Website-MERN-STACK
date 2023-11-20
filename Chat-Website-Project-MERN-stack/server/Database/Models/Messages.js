
const mongoose = require("mongoose")

const {Schema} = require("mongoose")

module.exports = mongoose.model("Messages", new Schema({
    users : {
        type : Array,
        default : [],
        required : true
    },
    messages : {
        type : Array,
        sender : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "User",
            required : true
        },
        message : {
            type : String,
            default : ""
        },
    },
    lastMessage : {
        message : {
            type : String,
            default : ""
        },
        sender : {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "User",
        }
    }
}))
