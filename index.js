const express = require('express')
const app = express();
const path = require('path')
var hbs = require('express-handlebars');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));

const PORT = process.env.PORT || 3000

app.engine( 'hbs', hbs( {
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
  }));


app.get('/',(req,res) =>{
    blogPosts=[
        {
            title:'The Making of this Blog',
            createdAt:'3:30 AM 2019/04/2020',
            editedAt:'3:30 AM 2019/04/202',
            blogSummary:' In this blog i describe how this Blog application was made. I used Materialize UI for CSS and for backend i used the Nodejs and mongoose.',
            id:23
        },
        {
            title:'Second Blog',
            createdAt:'3:31 AM 2019/04/2020',
            editedAt:'3:30 AM 20192/04/202',
            blogSummary:' In this blog i describe how this Blog application was made. I used Materialize UI for CSS and for backend i used the Nodejs and mongoose.',
            id:24
        },
        {
            title:'Second Blog',
            createdAt:'3:31 AM 2019/04/2020',
            editedAt:'3:30 AM 20192/04/202',
            blogSummary:' In this blog i describe how this Blog application was made. I used Materialize UI for CSS and for backend i used the Nodejs and mongoose.',
            id:24
        },
        {
            title:'Second Blog',
            createdAt:'3:31 AM 2019/04/2020',
            editedAt:'3:30 AM 20192/04/202',
            blogSummary:' In this blog i describe how this Blog application was made. I used Materialize UI for CSS and for backend i used the Nodejs and mongoose.',
            id:24
        }
    ]
    res.render('home',{
        blogPosts:blogPosts
    });
})

app.listen(PORT,(err)=>{
    if(!err)
     console.log(`Started on ${PORT}`)
}
)
