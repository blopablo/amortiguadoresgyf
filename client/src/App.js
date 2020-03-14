import React,{Component} from 'react';
import SideBar from './Componentes/sidebar';
import NavBar from './Componentes/navBar';
import {BrowserRouter,Switch,Route} from 'react-router-dom';
import IndexHome from './Componentes/Home/indexHome';
import IngresoProducto from './Componentes/Home/ingresoProducto';
import { ToastContainer } from "react-toastify";
import Login from './Componentes/Login/login';
import {connect} from 'react-redux';
import * as loginAction from './redux/actions/loginAction';
import Ventas from './Componentes/venta/ventas';
import indexUsuarios from './Componentes/Usuario/indexUsuario';
import Home from './Componentes/Home/Home';

class App extends Component {
 constructor(props){
   super(props)
 }
 componentDidMount(){
  //const token = this.props.token;
  //this.props.datosUsuario(token);
 }
  render(){
    return (
      <div className="container-fluid">
        <BrowserRouter>
        <ToastContainer autoClose={1500} /> 
          
            {this.props.usuario.username !== undefined &&
              
              <Route  path="/" render={props => <SideBar {...props}/>} />
              
            }
             {this.props.usuario.username === undefined &&
            
                <Route exact path="/" component={props => <Login {...props}/>} />
                
             
            }
           
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (reducers) =>{
  return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (App); 
