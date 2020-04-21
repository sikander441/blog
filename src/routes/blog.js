const express = require("express");
const router = express.Router();
const blogPostModel = require('../models/blog')

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

router.get('/create',async (req,res) => {
    const username = req.query.username
    const password = req.query.password
    console.log(username,password)
    const _id = req.query._id
    const blog = await blogPostModel.findById(_id).lean()
    res.render('newBlog',{blog:blog})

})

router.post('/blog/post',async (req,res) => {
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


router.get('/blog/view/:id',async (req,res) => {
    
    const _id = req.params.id
    const blog = await blogPostModel.findById(_id).lean()
    res.render('blog',{
        blog:blog
    });
})


module.exports = router