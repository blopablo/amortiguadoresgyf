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

amortiguadores.post('/guardarProducto',async (req,res)=>{
    const {marca,modelo,anio_desde,anio_hasta,posicion,proveedor,codigo_barra,precio_unidad,sku,tipo,stock} = req.body
    
    let sql = `insert into producto(stock,tipo_repuesto,id_marca,id_posicion,id_provedor,id_modelo,anio_desde,anio_hasta,precio_unitario,precio_par,tipo,codigo_barra,sku)
                values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
    
    const producto = await pool.query(sql,
        [stock,
        1,
        marca.idMarca,
        posicion.id,
        proveedor.id,
        modelo.id_modelo,
        anio_desde.id,
        anio_hasta.id,
        precio_unidad,
        precio_unidad * 2,
        tipo,
        codigo_barra,
        sku
    ])
    if(producto.affectedRows > 0){
        res.json({mensaje:'Producto Ingresado'})
    }
})
amortiguadores.get('/buscar/:datos',async(req,res)=>{
    const datos = JSON.parse(req.params.datos)
    const producto  = await traerProductos(datos)
    res.json(producto)
})

amortiguadores.get('/filtrado/:datos',async(req,res)=>{
    const {datos} = req.params
   
    let corte = datos.split('-')
  console.log(datos)
    if(corte !== undefined){
        if(corte.length === 1){
            let sql =`select pro.id_producto as id,
            pro.stock as count,
            pro.precio_unitario as precio,
            pro.stock as stock,
            pos.descripcion as forma,
            pro.precio_unitario as precio_unitario ,
            pro.precio_par as precio_par ,
            pro.tipo as tipo,
            pro.img img,
            pro.id_marca as id_marca,
            pro.id_modelo as id_modelo,
            pro.id_posicion as id_posicion,
            pro.id_provedor as id_provedor,
            pro.anio_desde as id_anio_desde,
            pro.anio_hasta as id_anio_hasta,
            (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
            (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
            mo.descripcion as modelo,
            mar.descripcion as marca,
            mar.img_logo as img_logo,
            prov.descripcion as marcaProvedor,
            prov.img_provedor as img_provedor
            from producto pro 
            join anio a on pro.anio_desde = a.id_anio
            join marca mar on pro.id_marca = mar.idmarca
            join modelo mo on pro.id_modelo = mo.id_modelo
            join posicion pos on pro.id_posicion = pos.id_posicion
            join proveedor prov on pro.id_provedor = prov.id_proveedor
                where mar.descripcion = '${datos}' and pro.eliminar is null
                ORDER BY pos.id_posicion, prov.id_proveedor`
                const producto = await pool.query(sql)
             res.json(producto)
        }else if(corte.length ===2){
            let sql =`select pro.id_producto as id,
                        pro.stock as count,
                        pro.stock as stock,
                        pro.precio_unitario as precio,
                        pos.descripcion as forma,
                        pro.precio_unitario as precio_unitario ,
                        pro.precio_par as precio_par ,
                        pro.tipo as tipo,
                        pro.img img,
                        pro.id_marca as id_marca,
                        pro.id_modelo as id_modelo,
                        pro.id_posicion as id_posicion,
                        pro.id_provedor as id_provedor,
                        pro.anio_desde as id_anio_desde,
                        pro.anio_hasta as id_anio_hasta,
                        (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                        (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                        mo.descripcion as modelo,
                        mar.descripcion as marca,
                        mar.img_logo as img_logo,
                        prov.descripcion as marcaProvedor,
                        prov.img_provedor as img_provedor
                        from producto pro 
                        join anio a on pro.anio_desde = a.id_anio
                        join marca mar on pro.id_marca = mar.idmarca
                        join modelo mo on pro.id_modelo = mo.id_modelo
                        join posicion pos on pro.id_posicion = pos.id_posicion
                        join proveedor prov on pro.id_provedor = prov.id_proveedor
                        where mo.descripcion = '${corte[1]}' and pro.eliminar is null
                        ORDER BY pos.id_posicion, prov.id_proveedor`
                const producto = await pool.query(sql)
             res.json(producto)
        }else if(corte.length ===3){
            let sql =`select pro.id_producto as id,
                    pro.stock as count,
                    pro.stock as stock,
                    pro.precio_unitario as precio,
                    pos.descripcion as forma,
                    pro.precio_unitario as precio_unitario ,
                    pro.precio_par as precio_par ,
                    pro.tipo as tipo,
                    pro.img img,
                    pro.id_marca as id_marca,
                    pro.id_modelo as id_modelo,
                    pro.id_posicion as id_posicion,
                    pro.id_provedor as id_provedor,
                    pro.anio_desde as id_anio_desde,
                    pro.anio_hasta as id_anio_hasta,
                    (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                    (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                    mo.descripcion as modelo,
                    mar.descripcion as marca,
                    mar.img_logo as img_logo,
                    prov.descripcion as marcaProvedor,
                    prov.img_provedor as img_provedor
                    from producto pro 
                    join anio a on pro.anio_desde = a.id_anio
                    join marca mar on pro.id_marca = mar.idmarca
                    join modelo mo on pro.id_modelo = mo.id_modelo
                    join posicion pos on pro.id_posicion = pos.id_posicion
                    join proveedor prov on pro.id_provedor = prov.id_proveedor
                where mo.descripcion = '${corte[1]}' and pro.eliminar is null and mar.descripcion = '${corte[0]}' and if((select descripcion from anio where id_anio = pro.anio_desde) = '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_desde) = '${corte[2]}',
                if((select descripcion from anio where id_anio = pro.anio_hasta) = '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_hasta) = '${corte[2]}',
                if((select descripcion from anio where id_anio = pro.anio_desde) < '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_hasta) > '${corte[2]}',0)))
                ORDER BY pos.id_posicion, prov.id_proveedor`
                const producto = await pool.query(sql)
             res.json(producto)
        }else if(corte.length ===4){
            let sql=''
            
            if(corte[3] === '1'){
                
                sql = `select pro.id_producto as id,
                        pro.stock as count,
                        pro.stock as stock,
                        pro.precio_unitario as precio,
                        pos.descripcion as forma,
                        pro.precio_unitario as precio_unitario ,
                        pro.precio_par as precio_par ,
                        pro.tipo as tipo,
                        pro.img img,
                        pro.id_marca as id_marca,
                        pro.id_modelo as id_modelo,
                        pro.id_posicion as id_posicion,
                        pro.id_provedor as id_provedor,
                        pro.anio_desde as id_anio_desde,
                        pro.anio_hasta as id_anio_hasta,
                        (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                        (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                        mo.descripcion as modelo,
                        mar.descripcion as marca,
                        mar.img_logo as img_logo,
                        prov.descripcion as marcaProvedor,
                        prov.img_provedor as img_provedor
                        from producto pro 
                        join anio a on pro.anio_desde = a.id_anio
                        join marca mar on pro.id_marca = mar.idmarca
                        join modelo mo on pro.id_modelo = mo.id_modelo
                        join posicion pos on pro.id_posicion = pos.id_posicion
                        join proveedor prov on pro.id_provedor = prov.id_proveedor
                           where mo.descripcion = '${corte[1]}' and pro.eliminar is null and mar.descripcion = '${corte[0]}' and (pos.id_posicion = 1 or pos.id_posicion = 2 or pos.id_posicion = 3) and if((select descripcion from anio where id_anio = pro.anio_desde) = '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_desde) = '${corte[2]}',
                                                               if((select descripcion from anio where id_anio = pro.anio_hasta) = '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_hasta) = '${corte[2]}',
                                                               if((select descripcion from anio where id_anio = pro.anio_desde) < '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_hasta) > '${corte[2]}',0)))
                                                               ORDER BY pos.id_posicion, prov.id_proveedor`
           } else{
                sql = `select pro.id_producto as id,
                        pro.stock as count,
                        pro.stock as stock,
                        pro.precio_unitario as precio,
                        pos.descripcion as forma,
                        pro.precio_unitario as precio_unitario ,
                        pro.precio_par as precio_par ,
                        pro.tipo as tipo,
                        pro.img img,
                        pro.id_marca as id_marca,
                        pro.id_modelo as id_modelo,
                        pro.id_posicion as id_posicion,
                        pro.id_provedor as id_provedor,
                        pro.anio_desde as id_anio_desde,
                        pro.anio_hasta as id_anio_hasta,
                        (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                        (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                        mo.descripcion as modelo,
                        mar.descripcion as marca,
                        mar.img_logo as img_logo,
                        prov.descripcion as marcaProvedor,
                        prov.img_provedor as img_provedor
                        from producto pro 
                        join anio a on pro.anio_desde = a.id_anio
                        join marca mar on pro.id_marca = mar.idmarca
                        join modelo mo on pro.id_modelo = mo.id_modelo
                        join posicion pos on pro.id_posicion = pos.id_posicion
                        join proveedor prov on pro.id_provedor = prov.id_proveedor
                           where mo.descripcion = '${corte[1]}' and pro.eliminar is null and mar.descripcion = '${corte[0]}' and (pos.id_posicion = 4 or pos.id_posicion = 5 or pos.id_posicion = 6)   and if((select descripcion from anio where id_anio = pro.anio_desde) = '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_desde) = '${corte[2]}',
                                                             if((select descripcion from anio where id_anio = pro.anio_hasta) = '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_hasta) = '${corte[2]}',
                                                             if((select descripcion from anio where id_anio = pro.anio_desde) < '${corte[2]}',(select descripcion from anio where id_anio = pro.anio_hasta) > '${corte[2]}',0)))
                                                             ORDER BY pos.id_posicion, prov.id_proveedor`
           }
           const producto = await pool.query(sql)
             res.json(producto)
        }
    }
})
amortiguadores.post('/ventaAmortiguadores', async (req,res)=>{
   
    try{
        // Ordenar Datos 
        console.log(req.body.datos)
        let now= new Date();
        let datos = {
            tipo_pago: req.body.datos.selectedOption,
            total: req.body.datos.total,
            cantidad: req.body.datos.cantidad,
            nombre_usuario: req.body.datos.username,
            productos: req.body.carro
        }
        
        ///buscar usuarios
        let sql_usuario = `SELECT id_usuario FROM usuario WHERE username = ? `
    
        let res_usuario = await pool.query(sql_usuario,
            [datos.nombre_usuario])
        //agregar id y modalidad de pago a los datos
        datos = {
            ...datos,
            id_usuario: res_usuario[0].id_usuario,
            modalidad_pago: 'Efectivo'
        }
        
        // insertar orden de compra
        console.log('insertar orden de compra')
        let sql_inser_orden_compra = `insert into orden_compra(total,tipo_pago,modalidad_pago,id_usuario,cantidad,fecha_registro) values(?,?,?,?,?,?)`
        const ins_orden = await pool.query(sql_inser_orden_compra,
            [datos.total,
            datos.modalidad_pago,
            datos.tipo_pago,
            datos.id_usuario,
            datos.cantidad,
            now
        ])
        console.log('orden de compra lista')
        // Insertar productos a producto_orden
        datos.productos.map(async datos=>{
            let stock = parseInt(datos.stock) - datos.count
            let sql = `update producto 
                        set stock = ${stock}
                        where id_producto = ${datos.id}`
            const stock_pro = await pool.query(sql)  
            let sql_inser_orden_compra = `insert into producto_orden(id_orden,id_producto,porcentaje)
                                        values(?,?,?)`

        const ins_orden_pro = await pool.query(sql_inser_orden_compra,
            [ins_orden.insertId,
            datos.id,
            datos.porcentaje])
            
        })
        
        res.send({mensaje:'Venta realizada con exito'})
    }catch(err){
        
        res.send({mensaje_error: err})
    }
   
    /*let total = 0;
    let tipo_pago = "Efectivo";
    req.body.map(async datos=>{
        total += datos.total})

    let sql_inser_orden_compra = `insert into orden_compra(total,tipo_pago)
    values(?,?)`;
    const ins_orden = await pool.query(sql_inser_orden_compra,
    [total,
    tipo_pago
    ])
    const id_orden = ins_orden.insertId
    req.body.map(async datos=>{
        let stock = parseInt(datos.stock) - datos.count
        let sql = `update producto 
                    set stock = ${stock}
                    where id_producto = ${datos.id}`
        const stock_pro = await pool.query(sql)  
        let sql_inser_orden_compra = `insert into producto_orden(id_producto_orden,id_orden,cantidad_producto)
                                    values(?,?,?)`;
    const ins_orden_pro = await pool.query(sql_inser_orden_compra,
        [datos.id,
        id_orden,
        datos.count
    ])
        
    })*/
    
    
})

amortiguadores.get('/buscarCodigo/:datos', async(req,res)=>{
    const {datos} = req.params
    let sql = `select pro.id_producto as id,
                0 as count,
                pro.stock as stock,
                pos.descripcion as forma,
                pro.precio_unitario as precio_unitario ,
                pro.precio_par as precio_par ,
                pro.tipo as tipo,
                pro.img img,
                pro.id_marca as id_marca,
                pro.id_modelo as id_modelo,
                pro.id_posicion as id_posicion,
                pro.id_provedor as id_provedor,
                pro.anio_desde as id_anio_desde,
                pro.anio_hasta as id_anio_hasta,
                (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                mo.descripcion as modelo,
                mar.descripcion as marca,
                mar.img_logo as img_logo,
                prov.descripcion as marcaProvedor,
                prov.img_provedor as img_provedor
                from producto pro 
                join anio a on pro.anio_desde = a.id_anio
                join marca mar on pro.id_marca = mar.idmarca
                join modelo mo on pro.id_modelo = mo.id_modelo
                join posicion pos on pro.id_posicion = pos.id_posicion
                join proveedor prov on pro.id_provedor = prov.id_proveedor
                    where pro.sku = '${datos}' and pro.eliminar is null
                    ORDER BY pos.id_posicion, prov.id_proveedor`
    const producto = await pool.query(sql)
    res.json(producto)
})
amortiguadores.post('/editarAnio', async(req,res)=>{
    const datos = req.body
    let sql={
        sql_anio_hasta:'',
        sql_anio_desde:'',
        sql_update: ''
    }
    try{
        if(datos.anio_hasta !== '' && datos.anio_hasta !== undefined ){
            console.log(datos.anio_hasta)
             sql.sql_anio_hasta = `SELECT id_anio FROM anio WHERE descripcion = ${datos.anio_hasta} `

            let id = await pool.query(sql.sql_anio_hasta)
            console.log(id)
             sql.sql_update = `UPDATE producto 
                                SET anio_hasta = ${id[0].id_anio}
                                where id_producto = ${datos.id_producto}
                            `
            let update = await pool.query(sql.sql_update)
        }
        if(datos.anio_desde !== '' && datos.anio_desde !== undefined ){
            sql.sql_anio_desde = `SELECT id_anio FROM anio WHERE descripcion = ${datos.anio_desde} `
            let id = await pool.query(sql.sql_anio_desde)
            sql.sql_update = `UPDATE producto 
                                SET anio_desde = ${id[0].id_anio}
                                where id_producto = ${datos.id_producto}
                            `
            let update = await pool.query(sql.sql_update)
        }
         const producto = await traerProductos(datos)
         console.log(producto)
         res.send(producto)
    }catch(err){
        console.log(err)
    }
    


})
amortiguadores.put('/editar_amortiguadores',async(req,res)=>{
    const datos = req.body
    console.log(datos.id)
    try{
        let sql_update = `UPDATE producto SET`
        if(datos.anio_hasta !== undefined && datos.anio_desde !== undefined && datos.anio_desde !== '' && datos.precio_unitario !== undefined){
            sql_update += ` anio_hasta = ${datos.anio_hasta.id}, anio_desde = ${datos.anio_desde.id}, precio_unitario = ${datos.precio_unitario}, precio_par = ${datos.precio_par}`
        }else
        {
            if(datos.anio_hasta !== undefined && datos.anio_desde !== undefined && datos.anio_desde !== ''){
                sql_update += ` anio_hasta = ${datos.anio_hasta.id}, anio_desde = ${datos.anio_desde.id}`
            }else if(datos.anio_desde !== undefined && datos.anio_desde !== ''){
                sql_update += ` anio_desde = ${datos.anio_desde.id}`
            }else if(datos.anio_hasta !== undefined && datos.anio_hasta !== ''){
                sql_update += ` anio_hasta = ${datos.anio_hasta.id}`
            }
            
            if(datos.precio_unitario !== undefined){
                sql_update += `  precio_unitario = ${datos.precio_unitario}, precio_par = ${datos.precio_par}`
                
            }
        }
        
        
        sql_update +=` where id_producto = ${datos.id}`
       
        let update = await pool.query(sql_update)
        const producto = await traerProductos(datos.state)
        res.send(producto)
    }catch(err){
  console.log(err)
    }
   
})
module.exports = amortiguadores

const traerProductos = async(datos)=>{
    let sql =''
    try{
        if(datos.marca !=='' && datos.proveedor !== '' && datos.modelo !== ''){
            sql= `select pro.id_producto as id,
                     0 as count,
                     pos.descripcion as forma,
                     pro.precio_unitario as precio_unitario ,
                     pro.precio_par as precio_par ,
                     pro.tipo as tipo,
                     pro.img img,
                     pro.id_marca as id_marca,
                     pro.id_modelo as id_modelo,
                     pro.id_posicion as id_posicion,
                     pro.id_provedor as id_provedor,
                     pro.anio_desde as id_anio_desde,
                     pro.anio_hasta as id_anio_hasta,
                     (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                     (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                     mo.descripcion as modelo,
                     mar.descripcion as marca,
                     mar.img_logo as img_logo,
                     prov.descripcion as marcaProvedor,
                     prov.img_provedor as img_provedor
                     from producto pro 
                     join anio a on pro.anio_desde = a.id_anio
                     join marca mar on pro.id_marca = mar.idmarca
                     join modelo mo on pro.id_modelo = mo.id_modelo
                     join posicion pos on pro.id_posicion = pos.id_posicion
                     join proveedor prov on pro.id_provedor = prov.id_proveedor
                     where pro.eliminar is null and prov.id_proveedor = ${datos.proveedor.id} and  mar.idmarca = ${datos.marca.idMarca} and mo.id_modelo = ${datos.modelo.id_modelo}
                     ORDER BY mar.descripcion`
         }else if(datos.marca ==='' && datos.proveedor !== '' && datos.modelo === ''){
             sql= `select pro.id_producto as id,
                     0 as count,
                     pos.descripcion as forma,
                     pro.precio_unitario as precio_unitario ,
                     pro.precio_par as precio_par ,
                     pro.tipo as tipo,
                     pro.img img,
                     pro.id_marca as id_marca,
                     pro.id_modelo as id_modelo,
                     pro.id_posicion as id_posicion,
                     pro.id_provedor as id_provedor,
                     pro.anio_desde as id_anio_desde,
                     pro.anio_hasta as id_anio_hasta,
                     (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                     (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                     mo.descripcion as modelo,
                     mar.descripcion as marca,
                     mar.img_logo as img_logo,
                     prov.descripcion as marcaProvedor,
                     prov.img_provedor as img_provedor
                     from producto pro 
                     join anio a on pro.anio_desde = a.id_anio
                     join marca mar on pro.id_marca = mar.idmarca
                     join modelo mo on pro.id_modelo = mo.id_modelo
                     join posicion pos on pro.id_posicion = pos.id_posicion
                     join proveedor prov on pro.id_provedor = prov.id_proveedor
                     where pro.eliminar is null and prov.id_proveedor = ${datos.proveedor.id} 
                     ORDER BY mar.descripcion`
         }else{
             sql= `select pro.id_producto as id,
                     0 as count,
                     pos.descripcion as forma,
                     pro.precio_unitario as precio_unitario ,
                     pro.precio_par as precio_par ,
                     pro.tipo as tipo,
                     pro.img img,
                     pro.id_marca as id_marca,
                     pro.id_modelo as id_modelo,
                     pro.id_posicion as id_posicion,
                     pro.id_provedor as id_provedor,
                     pro.anio_desde as id_anio_desde,
                     pro.anio_hasta as id_anio_hasta,
                     (select descripcion from anio where id_anio = pro.anio_desde) as anio_desde,
                     (select descripcion from anio where id_anio = pro.anio_hasta) as anio_hasta,
                     mo.descripcion as modelo,
                     mar.descripcion as marca,
                     mar.img_logo as img_logo,
                     prov.descripcion as marcaProvedor,
                     prov.img_provedor as img_provedor
                     from producto pro 
                     join anio a on pro.anio_desde = a.id_anio
                     join marca mar on pro.id_marca = mar.idmarca
                     join modelo mo on pro.id_modelo = mo.id_modelo
                     join posicion pos on pro.id_posicion = pos.id_posicion
                     join proveedor prov on pro.id_provedor = prov.id_proveedor
                     where pro.eliminar is null and prov.id_proveedor = ${datos.proveedor.id} and  mar.idmarca = ${datos.marca.idMarca} 
                     ORDER BY mar.descripcion`
         }
         const producto = await pool.query(sql)
         return producto
    }catch(err){
        console.log(err)
    }
}