import React,{useEffect, Component} from 'react';
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
          <div className="row">
            {this.props.usuario.username !== undefined &&
            <>
            <Route  path="/" render={props => <NavBar {...props}/>} />
            <Route  path="/" render={props => <SideBar {...props}/>} />
            </>
          }
            <div className="col-10">
              <Switch>
                  {this.props.usuario.username === undefined &&
                    <Route exact path="/" component={Login} />
                  }
                  
                  
                  <Route exact path="/home" component={IndexHome} />
                  <Route exact path="/ingreso" component={IngresoProducto}/>
                  <Route exact path="/ventas" component={Ventas}/>
                  {this.props.usuario.rol === '1' &&
                    <Route exact path="/usuarios" component={indexUsuarios}/>
                  }
                  
              </Switch>
            </div>
          </div>
          
        </BrowserRouter>
      </div>
    );
  }
}
const mapStateToProps = (reducers) =>{
  return reducers.loginReducers;
}
export default connect(mapStateToProps,loginAction) (App); 
