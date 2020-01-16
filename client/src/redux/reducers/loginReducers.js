import {USUARIO,ERROR,CARGANDO, TOKEN,ELIMINAR_USUARIO, REGISTRAR} from '../type/loginType';

const INITIAL_STATE = {
    usuario:{},
    token:'',
    cargando: false,
    error: '' ,
    mensaje:{}   
};

export default (state = INITIAL_STATE,action) => {
    switch (action.type) {
        case TOKEN:
               return {...state, token: action.payload, cargando:false};
        case USUARIO:
                return {...state,usuario:action.payload, cargando:false};
        case ELIMINAR_USUARIO:
                return {...state, usuario:action.payload, cargando:false};
        case REGISTRAR:
                return{...state, mensaje:action.payload, cargando:false};
        case CARGANDO:
            return {...state, cargando:true};    
        case ERROR:
            return {...state, error:action.payload, cargando:false};
    
        default: return state;
           
    }
}