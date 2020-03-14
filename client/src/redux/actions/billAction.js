import axios from 'axios';
import {TRAER_BILL, ADD_BILL, TRAER_BILL_PRODUCT, CARGANDO, ERROR, TRAER_PRODUCT_BILL, DELETE_BILL, GET_BILL_ID} from '../type/billType';
const URL = 'http://localhost:5000/bill/';
//const URL = 'https://www.amortiguadoresgyf.cl/api/bill/';


export const traerbill = ()=> async (dispatch)=>{
    dispatch({
        type:CARGANDO
    });

    try{
        
        const res = await axios.get(URL+'facturas');
        
        
        dispatch({
            type:TRAER_BILL,
            payload: res.data
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }

}
export const add_product = ()=> async (dispatch,getState) =>{
    dispatch({
        type:CARGANDO
    });

    try{
        
        const {bill_product} = getState().billReducers;
        
        const bill_actualizado = [
            ...bill_product
        ]
        dispatch({
            type:TRAER_BILL_PRODUCT,
            payload: bill_actualizado
    
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const add_bill = (data) => async (dispatch,getState) => {
    dispatch({
        type:CARGANDO
    });

    try{
        const {bill_product} = getState().billReducers;
        const {usuario} = getState().loginReducers;
        const bill_actualizado = {
           bill_product,
            data,
            usuario
        }
        const res = await axios.post(URL+'addBill',bill_actualizado);
        dispatch({
            type:ADD_BILL,
            payload: res.data
    
        })
        window.location.reload(false);
        dispatch({
            type:TRAER_BILL_PRODUCT,
            payload: []
    
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const get_produc_id = (id) => async (dispatch,getState) => {
    dispatch({
        type:CARGANDO
    });

    try{
        const res = await axios.get(URL+'list_product/'+id);
        console.log(res.data)
        dispatch({
            type:TRAER_PRODUCT_BILL,
            payload: res.data
    
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const delect_bill = (id) => async (dispatch,getState) => {
    dispatch({
        type:CARGANDO
    });

    try{
        const res = await axios.put(URL+'delete_bill',{id:id});
        console.log(res.data)
        dispatch({
            type:TRAER_BILL,
            payload: res.data
    
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}

export const get_bill = (id) => async (dispatch,getState) => {
    dispatch({
        type:CARGANDO
    });

    try{
        const res = await axios.get(URL+'get_bill/'+id);
        console.log(res.data)
        console.log(res.data)
        dispatch({
            type:GET_BILL_ID,
            payload: res.data[0]
    
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}
export const edit_bill = (state) => async (dispatch,getState) => {
    dispatch({
        type:CARGANDO
    });

    try{
        const res = await axios.put(URL+'edit_bill',state);
        console.log(res.data)
        dispatch({
            type:TRAER_BILL,
            payload: res.data
    
        })
    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}
