const comments = require('../Model/commentSchema')

exports.addComment = async(req,res)=>{
    console.log("inside add comment function");
    const {comment,postId,name}=req.body
   console.log(name);
   
    
    const userId=req.payload
  console.log(comment,postId);
  
  
    try{
        const existingComment = await comments.findOne({comment,postId,userId})
        if(existingComment){
            res.status(406).json("Comment Already Exists...")
        }else{
            const newComment = new comments({
                comment,postId,name,userId
            })
            await newComment.save()
            res.status(200).json(newComment)
        }
       

    }catch(err){
        res.status(401).json(err)
    }
    
}


exports.getComments=async(req,res)=>{
    console.log("inside the");
    const { postId } = req.params;
    try{
        const getComments = await comments.find({postId:postId})
        res.status(200).json(getComments);
        
    }catch(err)
    {
        res.status(401).json(err)
        console.log(err);
        
    }
}