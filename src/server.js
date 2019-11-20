'use strict'

const debug = require('debug')('kmeyle:api')
const http =require('http')
const chalk = require('chalk')
const express = require('express')
const morgan = require('morgan')
const api = require('./routes/api')
const auth = require('./routes/authentication')
const webPay = require('./routes/webPay')
const finanzas = require('./routes/finanzas')
var cors = require('cors')
const session = require('express-session')
const MySQLStore = require('express-mysql-session')
const passport = require('passport')
const chat = require('./routes/chat')
const fileUpload = require('express-fileupload');
//initialization
const app = express()
require('./lib/passport')


//setings
const port =process.env.PORT || 5000
const server = http.createServer(app)
var io = module.exports.io = require('socket.io')(server)
global.codigo = 1
//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(passport.initialize())
app.use(passport.session())
app.use(fileUpload())
//app.use(flash())
//app.use(session())
//Global Variales

//Routes
app.use('/api',api)
//app.use('/',api)
app.use('/auth',auth)
app.use('/webpay',webPay)
app.use('/finanzas',finanzas)
//app.use('/auth',auth)
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
//chat socket.io
io.on('connection',chat)

//////fin socket.io////////////

server.listen(port, ()=>{
    console.log(`${chalk.green('[KMEYLE]')} server listening on port ${port}`)
})
