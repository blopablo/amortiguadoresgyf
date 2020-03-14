import React from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as loginAction from '../redux/actions/loginAction';
import Ventas from '../Componentes/venta/ventas';
import indexUsuarios from '../Componentes/Usuario/indexUsuario';
import IndexHome from '../Componentes/Home/indexHome';
import IngresoProducto from '../Componentes/Home/ingresoProducto';
import Productos from './Home/Productos';
import Home from './Home/Home';
import detalle_venta from './Home/detalle_venta';
import {Accordion, Button, Card} from 'react-bootstrap';
import bill from './bill/bill';
const sideBar = (props) => {
   const  logOut = (e) =>{
        e.preventDefault();
        props.eliminarUsuario();
        props.history.push ('/');
    }
    return (
        <div className="container body">
            <div className="main_container">
                <div className="col-md-3 left_col">
                    <div className="left_col scroll-view">
                        <div className="navbar nav_title" style={{ "border": "0" }}>
                            <Link to="/" className="site_title"><img src={require('../img/iconos/logo_G&F.png')} style={{width:"80px"}}/></Link>
                        </div>
                        
                        <div className="clearfix"></div>
                        <div className="profile clearfix">
                            <div className="profile_pic">
                                <img src={require('../img/iconos/foto_perfil.png')} alt="..." className="img-circle profile_img" />
                            </div>
                            <div className="profile_info">
                                <span>Bienbenido,</span>
                                <h2>{props.usuario.nombre} {props.usuario.apellido}</h2>
                            </div>
                        </div>

                        <br />
                        <div id="sidebar-menu" className="main_menu_side hidden-print main_menu">
                            <div className="menu_section">
                                <h3>General</h3>
                                
                                <Accordion defaultActiveKey="0" style={{background:"none"}}>
                                    <Card style={{background:"none"}}>
                                        <Card.Header >
                                        <Accordion.Toggle as={Link}  eventKey="1" style={{background:"none", color: "white"}}>
                                        <i className="fa fa-home"></i> Inicio <span className="fa fa-chevron-down"></span>
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1" className="nav side-menu">
                                            <Card.Body > 
                                        <ul style={{background:"none", color: "white"}}>
                                            <li><Link to="" className="nav-link " style={{color: "white"}} to='/venta'> Ventas</Link></li>
                                            <li><Link to="" className="nav-link" style={{color: "white"}} to='/ingreso'>Ingreso</Link></li>
                                            <li><Link to="" className="nav-link" style={{color: "white"}} to='/producto'>Producto</Link></li>
                                        </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    </Accordion>
                            </div>
                            {props.usuario.rol === '1' &&
                            <div className="menu_section">
                                <h3>Administracion</h3>
                                <Accordion defaultActiveKey="0" style={{background:"none"}}>
                                    <Card style={{background:"none"}}>
                                        <Card.Header >
                                        <Accordion.Toggle as={Link}  eventKey="1" style={{background:"none", color: "white"}}>
                                        <i className="fa fa-edit"></i>Gestion<span className="fa fa-chevron-down"></span>
                                        </Accordion.Toggle>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1" className="nav side-menu">
                                            <Card.Body > 
                                        <ul style={{background:"none", color: "white"}}>
                                            <li><Link to="" className="nav-link" style={{color: "white"}} to='/usuarios'> Usuarios</Link></li>
                                            <li><Link to="" className="nav-link" style={{color: "white"}} to='/caja'> Caja</Link></li>
                                            <li><Link to="" className="nav-link" style={{color: "white"}} to='/factura'> Factura</Link></li>
                                        </ul>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                            }
                        </div>
                    </div>
                </div>

                <div className="top_nav">
                    <div className="nav_menu">
                        <div className="nav toggle">
                            <a id="menu_toggle"><i className="fa fa-bars"></i></a>
                        </div>
                        <nav className="nav navbar-nav">
                            <ul className=" navbar-right">
                                <li className="nav-item dropdown open" style={{ "paddingLeft": "15px" }}>
                                    <Link to="" className="user-profile dropdown-toggle" aria-haspopup="true" id="navbarDropdown" data-toggle="dropdown" aria-expanded="false">
                                        <img src="images/img.jpg" alt="" />{props.usuario.nombre} {props.usuario.apellido}</Link>
                                    <div className="dropdown-menu dropdown-usermenu pull-right" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" onClick={logOut.bind(this)}><i className="fa fa-sign-out pull-right"></i>Cerrar Seccion</a>
                                    </div>
                                </li>

                                
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="right_col bg-light" >
                    <Switch>
                    {props.usuario.username !== undefined &&
                        <Route exact path="/" component={Home} />
                    }
                        
                        
                        <Route exact path="/venta" component={IndexHome} />
                        <Route exact path="/factura" component={bill} />
                        <Route exact path="/ingreso" component={IngresoProducto}/>
                        <Route exact path="/ventas" component={Ventas}/>
                        <Route exact path="/producto" component = {Productos}/>
                        <Route exact path="/detalle_venta" component = {detalle_venta}/>
                        {props.usuario.rol === '1' &&
                            <Route exact path="/usuarios" component={indexUsuarios}/>
                        }
                       
                        
                     </Switch>      

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (reducers) => {
    return reducers.loginReducers;
}
export default connect(mapStateToProps, loginAction)(sideBar); 
