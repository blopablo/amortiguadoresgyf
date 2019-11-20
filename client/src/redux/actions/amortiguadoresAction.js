import axios from 'axios';
import { CARGANDO, TRAER_AMORTIGUADOR, ERROR } from "../type/amortiguadoresType";


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