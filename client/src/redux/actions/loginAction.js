import axios from 'axios';
import jwt_decoded from 'jwt-decode';
import {USUARIO,TOKEN,ERROR, CARGANDO, ELIMINAR_USUARIO, REGISTRAR} from "../type/loginType";
const URL = 'http://localhost:5000/users/';
//const URL = 'https://www.amortiguadoresgyf.cl/api/users/';

export const login = (datos)=> async (dispatch) =>{
    dispatch({
        type:CARGANDO
    });

    try{
        const respuesta = await axios.post(URL+'login',{inputLogin :datos.inputLogin,clave:datos.clave});
        const decoded = jwt_decoded(respuesta.data);
        
        let usuario = {
            email: decoded.usuario.email,
            username: decoded.usuario.username,
            rol: decoded.usuario.rol,
            nombre: decoded.usuario.nombre,
            apellido: decoded.usuario.apellido,
            cargo: decoded.usuario.cargo
        }
        
        dispatch({
            type:USUARIO,
            payload: usuario
    
        })
        
        dispatch({
            type:TOKEN,
            payload: respuesta.data
    
        })
        window.location.reload(false);
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const eliminarUsuario = (token)=> async (dispatch) =>{
    dispatch({
        type:CARGANDO
    });

    try{
       
        dispatch({
            type:ELIMINAR_USUARIO,
            payload: {}
    
        })
        dispatch({
            type:TOKEN,
            payload: {}
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}
export const registrar = (datos)=> async (dispatch) =>{
    dispatch({
        type:CARGANDO
    });

    try{
        
        
        const respuesta = await axios.post(URL+'registrar',{username :datos.username,
                                                            nombre:datos.nombre, 
                                                            apellido:datos.apellido,
                                                            email: datos.email,
                                                            cargo:datos.cargo,
                                                            clave:datos.clave,
                                                            rol: datos.rol});
       
        dispatch({
            type:REGISTRAR,
            payload: respuesta.data
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}