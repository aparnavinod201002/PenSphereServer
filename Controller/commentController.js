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




exports.getMostCommentedPostId = async (req, res) => {
    console.log("Fetching the most commented post ID...");
    
    try {
        const mostCommentedPost = await comments.aggregate([
            {
                $group: {
                    _id: "$postId", 
                    commentCount: { $sum: 1 }
                }
            },
            {
                $sort: { commentCount: -1 } 
            },
            {
                $limit: 1 
            }
        ]);

        if (mostCommentedPost.length > 0) {
            res.status(200).json({ postId: mostCommentedPost[0]._id, commentCount: mostCommentedPost[0].commentCount });
        } else {
            res.status(404).json({ message: "No comments found." });
        }
    } catch (err) {
        console.error("Error fetching most commented post:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};