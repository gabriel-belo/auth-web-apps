const express= require('express')
const app= express()

//Definindo ele como o primeiro middleware para todas as rotas
//É um método global



function middleware1( req, res, next){
    req.customProperty= 100
    next()
}

function middleware2( req, res, next){
    console.log(`The custom property value is: ${req.customProperty}`)
    req.customProperty= 600
    next()
}

//middleware de erro
function errorHandler (err, req, res, next){
    if(err){
        res.send("<h1>There was an error, please try again</h1>")
    }
}


app.use(middleware1)
app.use(middleware2)
// app.use(errorHandler)

app.get('/',  (req, res, next)=> {
    res.send(`<h1>The custom property is: ${req.customProperty}</h1>`)
})

// app.listen(3000)