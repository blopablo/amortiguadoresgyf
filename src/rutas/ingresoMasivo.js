'use strict'
const debug = require('debug')('AMORTIGUADORESGYF:amortiguadores:rutas')
const express = require('express')
const api = express.Router()
const pool = require('../database')
var xlsx  = require('node-xlsx')
api.post('/agregarProductos', async(req,res)=>{
    var obje = xlsx.parse(__dirname+'/teks_1.xlsx');
    /**************Consultas base de datos*******************************************************/
    //PROVEEDOR
    let sql =`select descripcion,id_proveedor from proveedor ORDER BY descripcion`
    const proveedor = await pool.query(sql)

    //MODELO
    let sql_modelo ='select descripcion, id_modelo from modelo order by descripcion'
    const modelo = await pool.query(sql_modelo)

    //MARCA
    let sql_marca =`select descripcion, idMarca from marca ORDER BY descripcion`
    const marca = await pool.query(sql_marca)

    //ANIO
    let sql_anio ='select  descripcion, id_anio from anio order by descripcion';
    const anio = await pool.query(sql_anio)
    /******************* fin consultas sql ******************************************************/


    //console.log(producto[0].descripcion.toLowerCase())
    obje.map(async (datos)=>{
        /*datos.data.map(dExel=>{
            
            dExel.map(valores=>{
                if(valores === '0317426-7310'){
                    console.log(valores)
                }
            })
        })*/
        for(var i = 0; i < datos.data.length; i++){
            let valores = datos.data[i].toString().split(',')
            for(var iP = 0; iP < proveedor.length ; iP++){
                if(proveedor[iP].descripcion.toLowerCase()=== valores[8].toString().toLowerCase()){
                    valores[8] = proveedor[iP].id_proveedor
                   // console.log(valores[6])
                }
            }
            for(var iM = 0; iM < modelo.length ; iM++){
                if(modelo[iM].descripcion.toLowerCase()=== valores[3].toString().toLowerCase()){
                    valores[3]=modelo[iM].id_modelo
                }
            }
            for(var iMa = 0; iMa < marca.length ; iMa++){
                if(marca[iMa].descripcion.toLowerCase()=== valores[2].toString().toLowerCase()){
                    valores[2]=marca[iMa].idMarca
                }
            }
            for(var iA = 0; iA < anio.length ; iA++){
                if(anio[iA].descripcion.toLowerCase()=== valores[4].toString().toLowerCase()){
                    valores[4]=anio[iA].id_anio
                }
                if(anio[iA].descripcion.toLowerCase()=== valores[5].toString().toLowerCase()){
                    valores[5]=anio[iA].id_anio
                }
            }
            let sql_ingreso = `insert into producto(stock,tipo_repuesto,id_marca,id_posicion,id_provedor,id_modelo,anio_desde,anio_hasta,precio_unitario,precio_par,tipo,sku)
                values(?,?,?,?,?,?,?,?,?,?,?,?)`;
    
            const producto = await pool.query(sql_ingreso,
                [1,
                1,
                valores[2],//marca.idMarca,
                valores[6],//posicion.id,
                valores[8],//proveedor.id,
                valores[3],//modelo.id_modelo,
                parseInt(valores[4]),//anio_desde.id,
                parseInt(valores[5]),//anio_hasta.id,
                valores[11],//precio_unidad,
                valores[12],//precio_unidad * 2,
                valores[7],//tipo,
                valores[0]//sku
            ])
            console.log(valores)
        }
        
        
    })

    res.json(obje.toString())
})

module.exports = api