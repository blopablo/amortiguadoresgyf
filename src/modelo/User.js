const pool = require('../database')
class User {
    
    constructor(){

    }

    async list(id = false, username=false){
        let sql = `SELECT * FROM usuario`;
        if(username){
            sql +=` WHERE username = '${username}'`
        }
        let resp = await pool.query(sql);
        return resp;
    } 

    async getUser_id(username){
        let resp = await this.list(false,username)
        this.setId_usuario(resp[0].id_usuario)
    }
    getId_usuario(){
        return this.id_usuario;    
    }   
    setId_usuario(id_usuario){
        this.id_usuario = id_usuario;
    }
    getUsername(){
        return this.username;    
    }   
    setUsername(username){
        this.username = username;
    }
    getClave(){
        return this.clave;    
    }   
    setClave(clave){
        this.clave = clave;
    }
    getEmail(){
        return this.email;    
    }   
    setEmail(email){
        this.email = email;
    }

    getRol(){
        return this.rol;    
    }   
    setRol(rol){
        this.rol = rol;
    }

    getNombre(){
        return this.nombre;    
    }   
    setNombre(nombre){
        this.nombre = nombre;
    }
    getApellido(){
        return this.apellido;    
    }   
    setApellido(apellido){
        this.apellido = apellido;
    }
    getCargo(){
        return this.cargo;    
    }   
    setCargo(cargo){
        this.cargo = cargo;
    }
    getCreado(){
        return this.creado;    
    }   
    setCreado(creado){
        this.creado = creado;
    }
    getEliminado(){
        return this.eliminado;    
    }   
    setEliminado(eliminado){
        this.eliminado = eliminado;
    }
}

module.exports = User