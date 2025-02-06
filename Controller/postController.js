const post = require('../Model/postSchema')

exports.addPost = async(req,res)=>{
    console.log("inside add posts function");
    const {title,description,status,userEmail}=req.body
    const postImage = req.file.filename
   
    
    const userId=req.payload
  console.log(title,description,status,userEmail,userId);
  
  
    try{
        const existingPost = await post.findOne({title,description})
        if(existingPost){
            res.status(406).json("Post Already Exists...")
        }else{
            const newPost = new post({
                title,description,status,userEmail,postImage,userId
            })
            await newPost.save()
            res.status(200).json(newPost)
        }
       

    }catch(err){
        res.status(401).json(err)
    }
    
}
exports.getPublicPosts = async (req, res) => {
    console.log("Fetching public posts in descending order...");

    try {
        const publicPosts = await post.find({ status: 'Public' }).sort({ createdAt: -1 });
        res.status(200).json(publicPosts);
    } catch (err) {
        console.error("Error fetching public posts:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



exports.getMyPosts=async(req,res)=>{
    
    const userId=req.payload
    try{
    const myPosts = await post.find({userId})
    res.status(200).json(myPosts)
}catch(err)
{
    res.status(401).json(err)
}
}



exports.deletePost = async(req,res)=>{
    console.log("inside delete");
    
    const {id} = req.params

    try{
        const deleteData = await post.findByIdAndDelete({_id:id})
        result.status(200).json(deleteData)
    }catch(err){
        res.status(401).json(err)
    }
}



exports.editPost= async(req,res)=>{

    const {title,description,status,userEmail}=req.body
    const postImage = req.file?req.file.filename:postImage
    const userId=req.payload

    const {id}=req.params
    console.log(title,description,status,userEmail);
    
    try{
        const updatePost=await post.findByIdAndUpdate({_id:id},{
            title,description,status,userEmail,postImage,userId,id
        },{new:true})
        await updatePost.save()
        res.status(200).json(updatePost)
    }catch(err){
        res.status(401).json(err)
    }
}


exports.getMostCommentedPost = async (req, res) => {
    console.log("inside most post");

    try {
        // Ensure token is included in request headers
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        // Extract post ID correctly
        const id = req.params.id;
        console.log("Post ID:", id);

        // Fetch the most commented post by ID
        const mostCommentedPost = await post.findById(id);
        if (!mostCommentedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        console.log("Most Commented Post:", mostCommentedPost);
        res.status(200).json(mostCommentedPost);
    } catch (err) {
        console.error("Error fetching most commented post:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
