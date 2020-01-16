import React, {Component} from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import IngresoProducto from './ingresoProducto';
import Ventas from './venta';
import Productos from './Productos';
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
                <Tab eventKey="productos" title="Productos">
                    <Productos/>
                </Tab>
            </Tabs>
        )
    }
}

export default ModulosInicio;