require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path')
var myParser = require("body-parser");
var hbs = require('express-handlebars');
const fs = require('fs')
const db = require('./db')
const usersRoute = require("./src/routes/user");
const blogRoute = require('./src/routes/blog')

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '/public')));
app.use(myParser.urlencoded({extended : true}));



app.engine( 'hbs', hbs( {
    extname: 'hbs',
    partialsDir: __dirname + '/views/partials/'
  }));

app.get('/',(req,res)=> res.redirect('/blog'))
app.use("/blog/",blogRoute)
app.use("/user/", usersRoute);


db.conn().then(()=> console.log('Connected')).catch((err)=> console.log('Something went wrong: '+err.message))
const PORT = process.env.PORT || 3000
app.listen(PORT,(err)=>{
    if(!err)
     console.log(`Started on ${PORT}`)
}
)

