import { CARRO, TOTAL_CARRO, CANTIDAD_CART, CARGANDO, ERROR } from "../type/carroType";

//const URL = 'http://localhost:5000/webpay/'
//const URL = 'https://www.kmeylemotorcompany.cl/api/webpay/';
export const agregarItem = (carro_compra) => (dispatch,getState) =>{
    dispatch({
        type:CARGANDO
    });
    try{
        
        const {cart} = getState().carroReducers;
        
        let total = 0;
        const cart_actualizado = [
            ...cart
        ]
        carro_compra.map(item=>{
            total += item.total;
        })
        //let desc =  ((total*10)/100) ;
        //let total_con_descuento = total-desc;
        dispatch({
            type:CARRO,
            payload: cart_actualizado
        })
        dispatch({
            type:TOTAL_CARRO,
            payload: total
        })
        dispatch({
            type:CANTIDAD_CART,
            payload: cart_actualizado.length
        })

    }catch(error){
        dispatch({
            type:ERROR,
            payload:'Algo salio mal intente mas tarde'
        })
    }
}