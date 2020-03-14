
const pool = require('../database')
class Bill {


   constructor(){

   }

   async list(){
    let sql = `SELECT * FROM bill WHERE inactive = 0`;
    let resp = await pool.query(sql);
    return resp;
   }
   async list_id(id){
    let sql = `SELECT * FROM bill WHERE inactive = 0 and id = ${id}`;
    let resp = await pool.query(sql);
    return resp;
   }
   async insert(description, numbre_bill, date_entry, date_bill, id_usuario, inactive,mount){
    let sql = `INSERT INTO bill (description, numbre_bill, date_entry, date_bill, id_usuario, inactive,mount)
                VALUES('${description}', '${numbre_bill}', '${date_entry}', '${date_bill}', ${id_usuario}, ${inactive}, ${mount})`;
    let resp = await pool.query(sql);
    this.setid(resp.insertId);
   }
   async delete(id){
       let sql = `UPDATE bill SET inactive = 1 where id = ${id}`
       let resp = await pool.query(sql);
   }
   async update(datos){
       try{
          
        let sql_update = `UPDATE bill SET`
        sql_update += ` description = '${datos.description}', numbre_bill = ${datos.numbre_bill}, date_bill = '${datos.date_bill}', mount = ${datos.mount}`
        sql_update +=` WHERE id = ${datos.id}`
        console.log(sql_update)
        await pool.query(sql_update);
       }catch(err){
           console.log(err)
       }
       
   }
   getid(){
        return this.id;    
    }   
    setid(id){
        this.id = id;
    }
    getdescription(){
        return this.id;    
    }   
    setdescription(id){
        this.id = id;
    }
    getnumber_bill(){
        return this.id;    
    }   
    setnumber_bill(id){
        this.id = id;
    }
    getid_product(){
        return this.id;    
    }   
    setid_product(id){
        this.id = id;
    }

}

module.exports = Bill