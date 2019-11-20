import { TRAER_AMORTIGUADOR, TRAER_MARCA, TRAER_MODELO, TRAER_ANIO, TRAER_POSICION, TRAER_PROVEEDOR, CARGANDO, ERROR } from "../type/amortiguadoresType";

const INITIAL_STATE = {
    amortiguadores: [],
    marcas:[],
    modelos:[],
    posicion:[],
    proveedor:[],
    anio:[],
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
        case CARGANDO:
            return {...state, cargando:true};    
        case ERROR:
            return {...state, error:action.payload, cargando:false};
    
        default: return state;
           
    }
}
