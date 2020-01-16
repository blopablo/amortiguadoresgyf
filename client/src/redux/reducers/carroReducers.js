import { CARRO, TOTAL_CARRO, CANTIDAD_CART, CARGANDO, ERROR } from "../type/carroType";

const INITIAL_STATE = {
    cart:[],
    orden:'',
    transbank: 0,
    producto_oc:[],
    total:0,
    cantidad_cart: 0,
    compra:{},
    cargando: false,
    error: ''    
};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case CARRO:
            return {...state, cart: action.payload, cargando:false};
        case TOTAL_CARRO:
            return{...state, total:action.payload,cargando:false};
        case CANTIDAD_CART:
            return{...state, cantidad_cart:action.payload,cargando:false};
        case CARGANDO:
             return {...state, cargando:true};    
        case ERROR:
            return {...state, error:action.payload, cargando:false};

        default: return state;
    }


}