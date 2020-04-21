require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
var hbs = require('express-handlebars');
const fs = require('fs')
const db = require('./db')
const blogPostModel = require('./src/models/blog')


 db.conn().then(()=> console.log('Connected')).catch((err)=> console.log('Something went wrong: '+err.message))

app.set('view engine', 'hbs');
var myParser = require("body-parser");
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3000
app.engine( 'hbs', hbs( {
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
  }));

  app.use(myParser.urlencoded({extended : true}));

app.get('/',async (req,res) =>{
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
app.get('/blog/create',async (req,res) => {
    const _id = req.query._id
    const blog = await blogPostModel.findById(_id).lean()
    res.render('newBlog',{blog:blog})

})
app.post('/blog/post',async (req,res) => {
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
app.get('/blog/view/:id',async (req,res) => {
    
    const _id = req.params.id
    const blog = await blogPostModel.findById(_id).lean()
    res.render('blog',{
        blog:blog
    });
})


app.listen(PORT,(err)=>{
    if(!err)
     console.log(`Started on ${PORT}`)
}
)
