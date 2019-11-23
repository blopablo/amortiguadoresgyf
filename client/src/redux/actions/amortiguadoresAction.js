import axios from 'axios';
import { CARGANDO, TRAER_AMORTIGUADOR, ERROR, TRAER_MARCA, TRAER_MODELO, TRAER_POSICION, TRAER_ANIO } from "../type/amortiguadoresType";
const URL = 'http://localhost:5000/amortiguadores/';

export const buscarAmortiguadores = ()=> async (dispatch) =>{
    dispatch({
        type:CARGANDO
    });

    try{
        const respuesta = await axios.get(URL+'buscarAmortiguadores');
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