import React, { Component } from 'react';
import {Tabs,Tab} from 'react-bootstrap';
import Registro from './Registro';

class indexUsuarios extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="x_content bg-light">
                <Tabs defaultActiveKey="registrar"  id="noanim-tab-example" className="nav nav-tabs justify-content-end bar_tabs">
                    <Tab eventKey="registrar" title="Registrar" tabClassName="bg-light">
                        <Registro/>
                    </Tab>
                    <Tab eventKey="ingreso" title="Ventas Usuarios" tabClassName="bg-light">
                        
                    </Tab>
                    <Tab eventKey="productos" title="Productos" tabClassName="bg-light">
                        
                    </Tab>
                </Tabs>
            </div>
        )
    }
}

export default indexUsuarios;