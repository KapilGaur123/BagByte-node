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

// require the routers
const ownersRouter = require('./routes/ownersRouter')
const usersRouter = require('./routes/usersRouter')
const productsRouter = require('./routes/productsRouter')

app.use("/owners",ownersRouter)
app.use("/users",usersRouter)
app.use("/products",productsRouter)

app.listen(3000, function(){
    console.log('server start');
    
})