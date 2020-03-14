import React, { Component } from 'react';
import Spinner from '../lib/Spinner';
import * as billAction from '../../redux/actions/billAction';
import {connect} from 'react-redux';
import {Tab, Tabs, Col} from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import Bill_list from './bill_list';
import Bill_entry from './bill_entry';
class Bill extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){

    }
    render(){
        return(
            
            <Col className="x_content bg-light">
                <Tabs Tabs defaultActiveKey="bill"  id="noanim-tab-example" className="nav nav-tabs justify-content-end bar_tabs">
                    <Tab eventKey="bill" title="Factura Lista" tabClassName="bg-light row">
                        <Bill_list/>
                    </Tab>
                    <Tab eventKey="bill_insert" title="Ingreso Factura" tabClassName="bg-light">
                        <Bill_entry/>
                    </Tab>
                   
                </Tabs>
            </Col>
        
        )
    }
}

const mapStateToProps = ({billReducers}) =>{
    return {
        billReducers
    };
}
const mapDispatchToProps = {
    ...billAction
}
export default connect(mapStateToProps,mapDispatchToProps)(Bill);