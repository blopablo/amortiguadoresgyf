const pool = require('../database')
class Produc_bill{
     constructor(){

    }
    async insert(id_product, id_bill, count){
        let sql = `INSERT INTO product_bill (id_product, id_bill, count)
                VALUES(${id_product}, ${id_bill}, ${count})`;
        await pool.query(sql);
    }
    async list_id(id_bill){
        let sql = `SELECT 
                        pro.id_producto as id,
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
                    FROM producto pro
                    JOIN product_bill pb on pro.id_producto = pb.id_product
                    JOIN anio a on pro.anio_desde = a.id_anio
                    JOIN marca mar on pro.id_marca = mar.idmarca
                    JOIN modelo mo on pro.id_modelo = mo.id_modelo
                    JOIN posicion pos on pro.id_posicion = pos.id_posicion
                    JOIN proveedor prov on pro.id_provedor = prov.id_proveedor
                    WHERE pb.id_bill = ${id_bill}
                    ORDER BY pos.id_posicion, prov.id_proveedor`;
                    let resp = await pool.query(sql);
                    return resp;


    }
    getId(){
        return this.id;    
    }   
    setId(id){
        this.id = id;
    }

    getId_product(){
        return this.id_product;    
    }   
    setId_product(id_product){
        this.id = id_product;
    }

    getId_bill(){
        return this.id;    
    }   
    setId_bill(id_bill){
        this.id_bill = id_bill;
    }

    getCount(){
        return this.count;    
    }   
    setCount(count){
        this.count = count;
    }
}

module.exports = Produc_bill