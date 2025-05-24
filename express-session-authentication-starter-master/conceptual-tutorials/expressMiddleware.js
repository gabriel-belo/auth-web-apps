const express= require('express')
const mongoose= require('mongoose')
const session= require('express-session')

const MongoStore= require('connect-mongo')(session)

var app= express()

//Conectando ao DataBase
const dbString= 'mongodb://localhost:27027/tutorial_db'
const dbOptions = {
    userNewUrlParser: true,
    useInifiedTopology: true
}

const connection = magoose.createConnection(dbString, dbOptions)

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const sessionStore= new MongoStore({
    mongooseConnection: connection
})