import axios from 'axios';
import { CARGANDO, TRAER_AMORTIGUADOR, ERROR, TRAER_MARCA, TRAER_MODELO, TRAER_POSICION, TRAER_ANIO, GUARDAR_PRODUCTO, TRAER_PROVEEDOR, TRAER_POSICION_CORTA, TRAER_AMORTIGUADORES_VENTA } from "../type/amortiguadoresType";
import { CARRO, TOTAL_CARRO, CANTIDAD_CART } from '../type/carroType';
const URL = 'http://localhost:5000/amortiguadores/';
//const URL = 'https://www.amortiguadoresgyf.cl/api/amortiguadores/';

export const buscar = (datos)=> async (dispatch) =>{
    dispatch({
        type:CARGANDO
    });

    try{
        const respuesta = await axios.get(URL+'buscar/'+JSON.stringify(datos));
        dispatch({
            type:TRAER_AMORTIGUADOR,
            payload: respuesta.data
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}


export const traerMarca = ()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    })
    try{
        const respuesta = await axios.get(URL+'marca');
        dispatch({
            type:TRAER_MARCA,
            payload:respuesta.data
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal Intente mas tardes'
        })
    }
}
export const traerModelo = (id)=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    })
    try{
        const respuesta = await axios.get(URL+'modelo/'+id);
        dispatch({
            type:TRAER_MODELO,
            payload:respuesta.data
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal Intente mas tardes'
        })
    }
}

export const traerPosicion = ()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    })
    try{
        const respuesta = await axios.get(URL+'posicion');
        dispatch({
            type:TRAER_POSICION,
            payload:respuesta.data
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal Intente mas tardes'
        })
    }
}

export const traerProveedor = ()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    })
    try{
        const respuesta = await axios.get(URL+'proveedor');
        dispatch({
            type:TRAER_PROVEEDOR,
            payload:respuesta.data
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal Intente mas tardes'
        })
    }
}
export const traerAnio = ()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    })
    try{
        const respuesta = await axios.get(URL+'anio');
        dispatch({
            type:TRAER_ANIO,
            payload:respuesta.data
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal Intente mas tardes'
        })
    }
}
export const guardarProducto = (state)=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    })
    try{
        const respuesta = await axios.post(URL+'guardarProducto',state);
        dispatch({
            type:GUARDAR_PRODUCTO,
            payload:respuesta.data
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal Intente mas tardes'
        })
    }
}
export const traerPosicionCompra = ()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    });
    try{
        const respuesta = [{value:'Delantero', label:'Delantero',id:1},{value:'Trasero', label:'Trasero',id:2}]
        dispatch({
            type:TRAER_POSICION_CORTA,
            payload: respuesta
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const filtrado = (datos)=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    });

    try{
        const respuesta = await axios.get(URL+'filtrado/'+datos);
        dispatch({
            type:TRAER_AMORTIGUADORES_VENTA,
            payload: respuesta.data
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}
export const buscarCodigo = (datos)=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    });

    try{
        
        const respuesta = await axios.get(URL+'buscarCodigo/'+datos);
        dispatch({
            type:TRAER_AMORTIGUADORES_VENTA,
            payload: respuesta.data
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const ventaAmortiguadores = (datos,carro)=> async (dispatch,getState)=>{
    dispatch({
        type:CARGANDO
    });

    try{
        datos = {...datos, username:getState().loginReducers.usuario.username}
        let datos_todo = {datos,carro};
        const respuesta = await axios.post(URL+'ventaAmortiguadores',datos_todo);
        
        dispatch({
            type:TRAER_AMORTIGUADORES_VENTA,
            payload: []
    
        })
        dispatch({
            type:CARRO,
            payload: []
    
        })
        dispatch({
            type:TOTAL_CARRO,
            payload: []
    
        })
        dispatch({
            type:CANTIDAD_CART,
            payload: []
    
        })
        dispatch({
            type:GUARDAR_PRODUCTO,
            payload:respuesta.data
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}
export const editarAnio = (datos,id)=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    });

    try{
        datos = {
            ...datos,
            id_producto:id
        }
        const respuesta = await axios.post(URL+'editarAnio',datos);
        
        dispatch({
            type:TRAER_AMORTIGUADOR,
            payload: respuesta.data
    
        })
        

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}
