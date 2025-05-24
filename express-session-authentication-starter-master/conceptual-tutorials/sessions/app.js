const express= require('express')
const mongoose= require('mongoose')
const session= require('express-session')

// Usado para armazenamento da sessão
const MongoStore= require('connect-mongo')(session)

var app= express()

//Conectando ao DataBase
const dbString= 'mongodb+srv://rm551669:rfMMseZSRGOWKvmO@cluster0.p06nwyu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const dbOptions = {
    userNewUrlParser: true,
    useInifiedTopology: true
}

//Conexão do banco de dados
const connection = magoose.createConnection(dbString, dbOptions)

//vai permitir o servidor analisar requisições
app.use(express.json())
app.use(express.urlencoded({extended:true}))


//Relacionados a sessão
const sessionStore= new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 //Igual a 1 dia
    }
}))

app.get('/', (req, res, next) =>{
    res.send("<h1>Hello World! (Session)</h1>")
})

app.listen(3000) 