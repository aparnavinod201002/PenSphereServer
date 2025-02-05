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
