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

    console.log(blogPosts)
    res.render('home',{
        blogPosts:blogPosts
    });
})
app.get('/blog/create',(req,res) => {

    res.render('newBlog')

})
app.post('/blog/post',(req,res) => {
    const title = req.body.title
    const body = req.body.body
    const id = req.body._id;
    if(!id){
        var blogPosts = JSON.parse(fs.readFileSync('blogs.json')) 
        var _id = blogPosts.length+1
        const blog ={
            body,
            title,
            _id,
            createdAt:new Date().toISOString().slice(0,10)
        }
        blogPosts.push(blog)
        fs.writeFileSync('blogs.json',JSON.stringify(blogPosts))
        res.send(blogPosts)

    }

})
app.get('/blog/:id',(req,res) => {

    var blogPosts = JSON.parse(fs.readFileSync('blogs.json')) 
    const blog = blogPosts.find( (blog) => blog._id==req.params.id)
    console.log(blog)
    res.render('blog',{
        blog:blog
    });
})


app.listen(PORT,(err)=>{
    if(!err)
     console.log(`Started on ${PORT}`)
}
)
