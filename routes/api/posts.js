const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const {check,validationResult} = require('express-validator');
const User = require('../../models/User')
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
//@desc     POST request to api/posts

router.post('/',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const newPost = new Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    })
    const post = await newPost.save();
    res.json(post);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }
    
})

//@Desc api/posts
//@route get all posts
// Private
router.get('/',auth, async (req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1})//Most recent sorting of the post
        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
})
//Get post by id (single post)
router.get('/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).send('Post not found');
        }
        res.json(post);
    }catch(err){
        if(err.kind=='ObjectId'){
            return res.status(404).send('Post not found');
        }
    res.status(500).send('Server Error')
    }
})
//DELETE api/posts/:id
router.delete('/:id',auth, async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)//Most recent sorting of the post
        //Check if the post belong to that user
        //post.user is the object id and the req.user.id is a string and post.user is not
        //So to match this we have that post.user to be converted into string
        if(!post)
        return res.status(401).json({msg:'Post not found'})
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({msg:'User not authorized'})
        }
        await post.remove()

        res.json({msg:'Post Removed'});
    } catch (error) {
        console.log(error);
        if(err.kind=='ObjectId'){
            return res.status(404).send('Post not found');
        }
        res.status(500).send('Server Error')
    }
})

//@route PUT api/posts/like/:id
//@desc Like a post
//@access Private

router.put('/like/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        //Check if the post is already liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length>0){
            return res.status(400).json({msg:'Post already liked'})
        }
        post.likes.unshift({user:req.user.id})
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})
//Unlike the Post
router.put('/unlike/:id',auth,async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        //Check if the post is already liked
        if(post.likes.filter(like=>like.user.toString()=== req.user.id).length===0){
            return res.status(400).json({msg:'Post wasnt liked liked'})
        }
        const removeIndex = post.likes.map(like=>like.user.toString()).indexOf(req.user.id)
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})

//Add and Remove comment
//we will remove by id /comment/:id
router.post('/comment/:id',[auth,[
    check('text','Text is required').not().isEmpty()
]],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);
        const newComment = {
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        user:req.user.id
    }

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
    }catch(err){
        console.log(err);
        res.status(500).send('Server Error')
    }
    
})


//@route DELETE api/posts/comment/:id/:comment_id
//Private


router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
        try{
            const post = await Post.findById(req.params.id);
            //Pull out the comment
            const comment = post.comments.find(comment=>comment.id===req.params.comment_id);
            if(!comment){
                return res.status(404).json({msg:"comment not found"});
            }
            //Check the user
            if(comment.user.toString()!==req.user.is){
                return res.status(401).json({msg:'User unauthorized'})
            }
            const removeIndex = post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id)
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
        }catch(err){

        }
})

module.exports = router;