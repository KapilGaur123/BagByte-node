const express = require('express')
const app = express();

const db = require('./config/mongoose-connection')

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const cookieParser = require('cookie-parser')
app.use(cookieParser())

const path = require('path');
const { log } = require('console');
app.use(express.static(path.join(__dirname,"public")))

app.set("view engine","ejs")

require('dotenv').config(); // -> .env (read the keys and we use those key)

//flash message setting 
const flash = require('connect-flash'); //flash
const expressSession = require("express-session"); // flash msg use session

app.use(expressSession({
    secret: process.env.JWT_KEY, // Replace with your own secret key
    resave: false,
    saveUninitialized: true
}))

app.use(flash())
app.use(express.urlencoded({ extended: true }));

// require the routers
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')
const index = require('./routes/index')

app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)
app.use("/",index)

app.listen(3000, function(){
    console.log('server start');
    
})