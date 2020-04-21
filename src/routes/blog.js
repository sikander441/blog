const express = require("express");
const router = express.Router();
const blogPostModel = require('../models/blog')
const auth = require("../../middleware/auth");

router.get('/',async (req,res) =>{

    blogPosts = await blogPostModel.find({}).lean()
    blogPosts = blogPosts.map( (blog) => {
        blog.updatedAt = blog.updatedAt.toDateString()
        blog.createdAt = blog.createdAt.toDateString()
        return blog
    })
    res.render('home',{
        blogPosts:blogPosts
    });
})

router.get('/create',auth,async (req,res) => {
    const username = req.query.username
    const password = req.query.password
    const _id = req.query._id
    const blog = await blogPostModel.findById(_id).lean()
    res.render('newBlog',{blog:blog})

})
router.get('/admin/',auth,async(req,res)=>{
    blogPosts = await blogPostModel.find({}).lean()
    blogPosts = blogPosts.map( (blog) => {
        blog.updatedAt = blog.updatedAt.toDateString()
        blog.createdAt = blog.createdAt.toDateString()
        return blog
    })
    res.render('admin',{
        blogPosts:blogPosts
    });
})
router.post('/post',auth,async (req,res) => {
    const _id = req.body.blogId
    const title = req.body.title
    const body = req.body.body
    const blogSummary = req.body.summary;
    if(_id){
        var blog = await blogPostModel.findById(_id)
        blog.title = title
        blog.body = body
        blog.blogSummary = blogSummary
        blog = await blog.save()
    }
    else{
        const blog = {
            title,
            body,
            blogSummary
        }
        var newBlog = new blogPostModel(blog)
        var newBlog = await newBlog.save()
    }

    res.redirect('/')

})


router.get('/view/:id',async (req,res) => {
    
    const _id = req.params.id
    const blog = await blogPostModel.findById(_id).lean()
    res.render('blog',{
        blog:blog
    });
})


module.exports = router