import { TRAER_AMORTIGUADOR, TRAER_MARCA, TRAER_MODELO, TRAER_ANIO, TRAER_POSICION, TRAER_PROVEEDOR, CARGANDO, ERROR, GUARDAR_PRODUCTO, TRAER_POSICION_CORTA, TRAER_AMORTIGUADORES_VENTA } from "../type/amortiguadoresType";

const INITIAL_STATE = {
    amortiguadores: [],
    amortiguadores_venta:[],
    marcas:[],
    modelos:[],
    posicion:[],
    proveedor:[],
    anio:[],
    mensaje_producto:[],
    posicion_corta:[],
    cargando: false,
    error: ''    
};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case TRAER_AMORTIGUADOR:
               return {...state, amortiguadores: action.payload, cargando:false};
        case TRAER_MARCA:
                return {...state, marcas: action.payload, cargando:false};
        case TRAER_MODELO:
                return {...state, modelos: action.payload, cargando: false};
        case TRAER_ANIO:
                return {...state, anio:action.payload, cargando: false};
        case TRAER_POSICION: 
                return{...state, posicion:action.payload,cargando:false};
        case TRAER_PROVEEDOR: 
                return{...state, proveedor:action.payload,cargando:false};
        case GUARDAR_PRODUCTO: 
                return{...state, mensaje_producto:action.payload,cargando:false};
        case TRAER_POSICION_CORTA:
                return{...state, posicion_corta:action.payload, cargando:false};
        case TRAER_AMORTIGUADORES_VENTA:
                return{...state, amortiguadores_venta:action.payload, cargando:false};
        case CARGANDO:
            return {...state, cargando:true};    
        case ERROR:
            return {...state, error:action.payload, cargando:false};
    
        default: return state;
           
    }
}
