import React, {Component} from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import IngresoProducto from './ingresoProducto';
import Ventas from './venta';
class ModulosInicio extends Component {
    constructor(){
        super()
    }
    render(){
        return(
            <Tabs defaultActiveKey="venta"  id="noanim-tab-example">
                <Tab eventKey="venta" title="Venta">
                    <Ventas/>
                </Tab>
                <Tab eventKey="ingreso" title="Ingreso">
                    <IngresoProducto />
                </Tab>
                <Tab eventKey="contact" title="Contact" disabled>
                    
                </Tab>
            </Tabs>
        )
    }
}

export default ModulosInicio;