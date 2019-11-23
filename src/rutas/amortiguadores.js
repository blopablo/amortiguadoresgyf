'use strict'
const debug = require('debug')('AMORTIGUADORESGYF:amortiguadores:rutas')
const express = require('express')
const amortiguadores = express.Router()
const pool = require('../database')

amortiguadores.get('/marca',async(req,res)=>{
    let sql =`select descripcion as value,descripcion as label, idMarca from marca ORDER BY descripcion`
    const producto = await pool.query(sql)
    res.json(producto)
})
amortiguadores.get('/modelo/:id',async(req,res)=>{
    const {id} = req.params
    let sql ='select descripcion as value,descripcion as label, id_modelo from modelo where id_marca = ? order by descripcion';
    
    const producto = await pool.query(sql,[id])
    res.json(producto)
})
amortiguadores.get('/anio',async(req,res)=>{
    let sql ='select  descripcion as value,descripcion as label,id_anio as id from anio order by descripcion';
    const producto = await pool.query(sql)
    res.json(producto)
})
amortiguadores.get('/posicion',async(req,res)=>{
    let sql ='select  descripcion as value,descripcion as label,id_posicion as id from posicion ORDER BY descripcion';
    const producto = await pool.query(sql)
    res.json(producto)
})
amortiguadores.get('/proveedor',async(req,res)=>{
    let sql ='select descripcion as value,descripcion as label,id_proveedor as id from proveedor ORDER BY descripcion';
    const producto = await pool.query(sql)
    res.json(producto)
})

module.exports = amortiguadores