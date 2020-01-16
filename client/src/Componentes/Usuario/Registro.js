import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as loginAction from '../../redux/actions/loginAction';
import { toast } from "react-toastify";
class registro extends Component{
    constructor(){
        super()
        this.state={}
        this.selectChange = this.selectChange.bind(this)
    }
    selectChange(e){
        e.persist();
        this.setState({[e.target.name]:e.target.value})
        
    }
    registrar(e){
        e.preventDefault();
        if(this.state.clave_confirm === this.state.clave){
            this.props.registrar(this.state).then((res)=>{
                
                if(this.props.mensaje.error === undefined){
                    toast.success(`${this.props.mensaje.status}`) ;
                    this.setState({});
                }else{
                    toast.error(`${this.props.mensaje.error}`) ;
                }
            })
        }else{
            toast.error('contraseña no coinciden') ;
        }
    }
    render(){
        
        return(
            <form onSubmit={this.registrar.bind(this)}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.selectChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Nombre Usuario</label>
                        <input type="text" name="username" className="form-control"value={this.state.username} onChange={this.selectChange} required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Contraseña</label>
                        <input type="password" name="clave" className="form-control" value={this.state.clave} onChange={this.selectChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Confirmar Contraseña</label>
                        <input type="password" name="clave_confirm" className="form-control" value={this.state.clave_confirm}onChange={this.selectChange} required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Nombre</label>
                        <input type="text" name="nombre" className="form-control" value={this.state.nombre} onChange={this.selectChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Apellido</label>
                        <input type="text" name="apellido" className="form-control" value={this.state.apellido} onChange={this.selectChange} required/>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label>Cargo</label>
                        <input type="text" name="cargo" className="form-control" value={this.state.cargo} onChange={this.selectChange} required/>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Rol</label>
                        <select className="form-control" name="rol" value={this.state.rol} onChange={this.selectChange} required>
                            <option selected value={0}>Seleccionar...</option>
                            <option value={1}>Administrador</option>
                            <option value={2}>Vendedor</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Registrar</button>
            </form>
        )
    }
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
  }
  export default connect(mapStateToProps,loginAction) (registro); 