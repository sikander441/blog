const express = require('express')
const app = express();
const path = require('path')
var hbs = require('express-handlebars');
const fs = require('fs')
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
    blogPosts = JSON.parse(fs.readFileSync('blogs.json'))
    res.render('home',{
        blogPosts:blogPosts
    });
})
app.get('/blog/create',(req,res) => {
    var blogPosts = JSON.parse(fs.readFileSync('blogs.json')) 
    const blog = blogPosts.find( (blog) => blog._id==req.query._id)
    res.render('newBlog',{blog:blog})

})
app.post('/blog/post',(req,res) => {
    const title = req.body.title
    const body = req.body.body
    const id = req.body.blogId;
    const summary = req.body.summary;
    var blogPosts = JSON.parse(fs.readFileSync('blogs.json')) 
    if(!id){
        var _id = blogPosts.length+1
        const blog ={
            body,
            title,
            _id,
            blogSummary:summary,
            createdAt:new Date().toISOString().slice(0,10)
        }
        blogPosts.push(blog)
        fs.writeFileSync('blogs.json',JSON.stringify(blogPosts))
        res.redirect('/')

    }
    else{
            const index = blogPosts.findIndex( (blog) => blog._id == id)
            blogPosts[index].body = body;
            blogPosts[index].title = title
            blogPosts[index].blogSummary = summary;
            blogPosts[index].editedAt = new Date().toISOString().slice(0,10)
            fs.writeFileSync('blogs.json',JSON.stringify(blogPosts))
            res.redirect('/')
    }

})
app.get('/blog/view/:id',(req,res) => {
    var blogPosts = JSON.parse(fs.readFileSync('blogs.json')) 
    const blog = blogPosts.find( (blog) => blog._id==req.params.id)
    res.render('blog',{
        blog:blog
    });
})


app.listen(PORT,(err)=>{
    if(!err)
     console.log(`Started on ${PORT}`)
}
)
