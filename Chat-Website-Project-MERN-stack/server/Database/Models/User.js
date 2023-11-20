const { Schema } = require("mongoose");
const mongoose = require("mongoose")

module.exports = mongoose.model("User", new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    isImageSet: {
        type: Boolean,
        default: false
    },
    isImageDefault : {
        type : Boolean,
        default : true
    },
    backgroundImage : {
        type : String,
        default : ""
    },
    isBackgroundImageSet : {
        type : Boolean,
        default : false
    },
    friends : {
        type : Array,
        default : []
    },
    friendRequests : {
        fromOthers : {
            type : Array,
            default : []
        },
        toOthers : {
            type : Array,
            default : []
        }
    },
    isOnline : {
        type : Boolean,
        default : false,
    },
    lastOnline : {
        type : Number,
        default : new Date().getTime(),
    },
}));
