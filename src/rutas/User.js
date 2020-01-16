'use strict'
const debug = require('debug')('AMORTIGUADORESGYF:user:rutas')
const express = require('express')
const users = express.Router()
const pool = require('../database')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')

users.use(cors())

process.env.SECRET_KEY = 'AmortiGYF'

users.post('/registrar',async(req,res)=>{
    const today = new Date()
    const userData = {
        username:  req.body.username,
        nombre : req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        cargo:req.body.cargo,
        clave:req.body.clave,
        creado:today,
        rol: req.body.rol
    }
    let sql =`select email from usuario where email='${userData.email}' or username = '${userData.username}'`
    const consultaUser = await pool.query(sql)
    try{
        if (consultaUser.length === 0){
            bcrypt.hash(req.body.clave,10,async (err,hash)=>{
                userData.clave = hash
                let sql_registrar = `insert into usuario (username,clave,email,rol,nombre,apellido,cargo, creado) 
                                    values(?,?,?,?,?,?,?,?)`
                const producto = await pool.query(sql_registrar,[
                    userData.username,
                    userData.clave,
                    userData.email,
                    userData.rol,
                    userData.nombre,
                    userData.apellido,
                    userData.cargo, 
                    userData.creado
                ])
    
                res.json({status:userData.email+' registrado'})
            })
        }else{
            res.json({error:"El usuario ya existe"})
        }

    }catch(err){
        res.json({error:err})
    }
    
})

users.post('/login', async (req,res)=>{
    let sql =`select email,username,clave,rol,nombre,apellido,cargo from usuario where email='${req.body.inputLogin}' or username = '${req.body.inputLogin}'`
    const consultaUser = await pool.query(sql)
    try{
        if(consultaUser.length > 0){
            let usuario = {usuario:consultaUser[0]};
            if(req.body.clave !== undefined){
                if(bcrypt.compare(req.body.clave, consultaUser[0].clave)){
                    let token = jwt.sign(usuario, 'amortigyf',{
                        expiresIn: 1440
                    })
                    res.send(token)
                }
            }else{
                res.send('ingrese la contraseña')
            }
        }else{
            res.status(400).json({error: 'usuario no existe'})
        }

    }catch(err){
        res.status(400).json({error: err})
    }
    
})

module.exports = users