const  mongoose = require("mongoose")



const commentSchema = new mongoose.Schema({

    comment:{
        type:String,
        required:true
    },
    postId:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    
    userId:{
        type:String,
        required:true
    }

    
})
const comments = mongoose.model("comment",commentSchema)
module.exports = comments