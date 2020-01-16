import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import Registro from './Registro';

class indexUsuarios extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Tabs defaultActiveKey="registrar"  id="noanim-tab-example">
            <Tab eventKey="registrar" title="Registrar">
                <Registro/>
            </Tab>
            <Tab eventKey="ingreso" title="Ventas Usuarios">
                
            </Tab>
            <Tab eventKey="productos" title="Productos">
                
            </Tab>
            </Tabs>
        )
    }
}

export default indexUsuarios;