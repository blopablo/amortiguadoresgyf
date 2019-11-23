'use strict'

const debug = require('debug')('AmortiguadoresGYF:api')
const http =require('http')
const chalk = require('chalk')
const express = require('express')
const morgan = require('morgan')
const amortiguadores = require('./rutas/amortiguadores')
var cors = require('cors')
const passport = require('passport')
//initialization
const app = express()


//setings
const port =process.env.PORT || 5000
const server = http.createServer(app)
global.codigo = 1
//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())

//Global Variales

//Routes

app.use('/amortiguadores',amortiguadores)
// Express error handler
app.use((err,req,res,next)=>{
    debug(`Error: ${err.message}`)

    if(err.message.match(/not found/)){
        return res.status(404).send({error: err.message})
    }

    res.status(500).send({error: err.message})
})

function handleFatalError(err){
    console.error(`${chalk.red('[fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtException',handleFatalError)
process.on('unhandledRejection',handleFatalError)


//////fin socket.io////////////

server.listen(port, ()=>{
    console.log(`${chalk.green('[AMORTIGUADORESGYF]')} server listening on port ${port}`)
})
