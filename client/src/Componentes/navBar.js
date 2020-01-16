import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as loginAction from '../redux/actions/loginAction';
import {Dropdown} from 'react-bootstrap';
import { Link } from 'react-router-dom';
class navBar extends Component{
    constructor(props){
        super(props)
    }
    logOut(e){
        e.preventDefault();
        this.props.eliminarUsuario();
        this.props.history.push ('/');
    }
    componentDidMount(){
        this.props.history.push ('/');
        
    }
    render(){
       
        return(
        
            <nav className="navbar navbar-expand-lg navbar-light bg-light col-12">
                <Dropdown className="col-md-2 offset-md-10">
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                        {this.props.usuario.nombre} {this.props.usuario.apellido} 
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item><Link to="/ventas">Mis ventas</Link></Dropdown.Item>
                        <Dropdown.Item onClick={this.logOut.bind(this)}>Cerrar Sesión</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                
                
                
            </nav>
        )
    }
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (navBar); 