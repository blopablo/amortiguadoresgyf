'use strict'
const debug = require('debug')('AMORTIGUADORESGYF:amortiguadores:bill')
const express = require('express')
const bill = express.Router()
const pool = require('../database')
const billClass = require('../modelo/Factura')
const userClass = require('../modelo/User')
const produc_billClass = require('../modelo/Product_bill')
const classBill = new billClass
const classUser = new userClass
const classProduct_bill = new produc_billClass
bill.get('/facturas',async(req,res)=>{
    let resp = await classBill.list() 
    res.json(resp)
})

bill.post('/addBill',async(req,res)=>{
    try{
        const {data, bill_product, usuario} = req.body
        await classUser.getUser_id(usuario.username)
        await classBill.insert(data.description,data.number_factura,data.date_moment,data.date_bill,classUser.getId_usuario() ,0,data.mount)

        bill_product.forEach(async(element) => {
            await classProduct_bill.insert(element.id,classBill.getid(),element.canti)
        });
        res.json({mensaje:'Fectura Guardada'})
    }catch(error){
        res.json({mensaje:error})
        console.log(error)
    }
    


})

bill.get('/list_product/:id', async(req,res)=>{
    const {id} = req.params
    let resp = await classProduct_bill.list_id(id)

    res.json(resp)
})
bill.get('/get_bill/:id', async(req,res)=>{
    const {id} = req.params
    let resp = await classBill.list_id(id)

    res.json(resp)
})

bill.put('/delete_bill', async(req,res)=>{
    console.log(req.body.id)
    let resp = await classBill.delete(req.body.id)
    let resp_list = await classBill.list() 
    res.json(resp_list)
})

bill.put('/edit_bill', async(req,res)=>{
    let resp = await classBill.update(req.body)
    let resp_list = await classBill.list() 
    res.json(resp_list)
})

module.exports = bill