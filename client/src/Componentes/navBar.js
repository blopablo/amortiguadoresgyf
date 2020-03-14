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
            
            <div className="top_nav col-12">
                <div className="nav_menu">
                    
                    <nav className="nav navbar-nav">
                    <ul className=" navbar-right">
                    <li className="nav-item dropdown open" style={{"padding-left": "15px"}}>
                        <a href="javascript:;" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                        {this.props.usuario.nombre} {this.props.usuario.apellido} 
                        </a>
                        <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item"  onClick={this.logOut.bind(this)}><i class="fa fa-sign-out pull-right"></i> Log Out</a>
                        </div>
                    </li>
    
                  
                </ul>
              </nav>
            </div>
          </div>
           
        )
    }
}
const mapStateToProps = (reducers) =>{
    return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (navBar); 