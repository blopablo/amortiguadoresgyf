import React,{useEffect,useState} from 'react';
import amortiguadores from '../../img/iconos/Amortigudores-de-carros.jpg'
import {connect} from 'react-redux';
import * as loginAction from '../../redux/actions/loginAction';

const Login = (props) =>{
    const[state,setState] = useState({});
    useEffect(()=>{
        if(props.usuario.rol !== undefined)
        {
            props.history.push ('/home');
        }
        
    
        
    },{})
    const handleChange = (event) => {
        event.persist();
        setState(state => ({ ...state, [event.target.name]: event.target.value }));
    };
    const onclick_ingreso = async(event)=>{
        event.preventDefault();
        await props.login(state)
        props.history.push ('/home');
         
       
    }
    
    return(
        <div className="card shadow-lg p-3 mb-5 bg-white rounded mt-5" style={{"max-width": "540px", left: "40%"}}>
            <div className="row no-gutters justify-content-center">
                <div className="col-md-4 pt-5">
                <img src={amortiguadores} className="card-img" alt="..."/>
                </div>
                <div className="col-md-8">
                <div className="card-body">
                    <h1 className="card-title text-center pb3">Iniciar Sesión</h1>
                    <label><b>Usuario o mail</b></label>
                    <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">@</span>
                    </div>
                    <input type="text" class="form-control" name="inputLogin" value={state.inputLogin} onChange={handleChange} placeholder="Nombre de usuario o email"/>
                    </div>
                    <label><b>Contraseña</b></label>
                    <div class="input-group mb-3">
                        
                    <input type="password" class="form-control" name="clave" value={state.clave} onChange={handleChange} placeholder="Contraseña"/>
                    
                    </div>
                    <button className="btn btn-primary" onClick={onclick_ingreso}>Ingresar</button>
                </div>
                </div>
            </div>
        </div>
        
    )
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (Login); 