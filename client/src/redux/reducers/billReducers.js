import { TRAER_BILL,TRAER_BILL_PRODUCT,ADD_BILL, CARGANDO, ERROR, TRAER_PRODUCT_BILL, DELETE_BILL, GET_BILL_ID } from "../type/billType";

const INITIAL_STATE = {
    bill: [],
    bill_product: [],
    product_view: [],
    bill_id: {},
    cargando: false,
    error: '',
    mensaje:''
};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case TRAER_PRODUCT_BILL:
            return {... state, product_view:action.payload, cargando:false};
        case TRAER_BILL:
               return {...state, bill:action.payload, cargando:false};
        case GET_BILL_ID:
               return {...state, bill_id:action.payload, cargando:false};
        case TRAER_BILL_PRODUCT:
        return {...state, bill_product:action.payload, cargando:false};
        case ADD_BILL:
            return {...state, mensaje:action.payload, cargando:false};
        case DELETE_BILL:
            return {...state, mensaje:action.payload, cargando:false};
        case CARGANDO:
            return {...state, cargando:true};    
        case ERROR:
            return {...state, error:action.payload, cargando:false};
    
        default: return state;
           
    }
}
