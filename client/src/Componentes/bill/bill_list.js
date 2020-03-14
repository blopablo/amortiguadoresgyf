import React, { Component } from 'react';
import Spinner from '../lib/Spinner';
import * as billAction from '../../redux/actions/billAction';
import {connect} from 'react-redux';
import {Table} from 'react-bootstrap';
import Select from 'react-select';
import { toast } from 'react-toastify';
import {numberFormat} from '../lib/format';
import ModalViewBill from '../lib/modal_view_bill';
import ModalEditBill from '../lib/modal_editar_bill';
class bill_list extends Component{
    constructor(props){
        super(props)
        this.state = {
            show:false,
            show_edit:false
        }
        this.handledView = this.handledView.bind(this);
        this.handlededit = this.handlededit.bind(this);
        this.handledDelete = this.handledDelete.bind(this);
    }
    componentDidMount(){
        this.props.traerbill();
    }
    handledView( e,id ){
        e.preventDefault();
        this.setState({ show: true});     
        this.props.get_produc_id(id);
        
    }
    hideModal = () => {
        this.setState({ show: false });
    };
    hideModalEdit = () => {
        this.setState({ show_edit: false });
    };
    handlededit (e,id){
        e.preventDefault();
        this.setState({ show_edit: true});
        this.props.get_bill(id);

    }  
    handledDelete(e, id){
        e.preventDefault();
        this.setState({})
        this.props.delect_bill(id);
        toast.error(`Factura Eliminada`) 
    }
    render(){
        return(
            <div className="tab-content" id="myTabContent">
               <Table responsive>
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Descripcion</th>
                            <th>Numero Factura</th>
                            <th>Fecha De Factura</th>
                            <th>Monto Total</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.props.billReducers.bill.map((data,key)=>{
                        return(
                            <tr>
                                <td>
                                    <button className="btn btn-info" onClick={(e)=> this.handledView(e,data.id)}><span class="glyphicon glyphicon-eye-open" aria-hidden="true"></span></button>
                                    <button className="btn btn-warning" onClick={(e)=> this.handlededit(e,data.id)}><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
                                    <button className="btn btn-danger" onClick={(e)=> this.handledDelete(e,data.id)}><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>
                                </td>
                                <td>{data.description}</td>
                                <td>{data.numbre_bill}</td>
                                <td>{data.date_bill}</td>
                                <td>${numberFormat(Math.round(data.mount))}</td>
                            </tr>
                        )
                    })}
                    </tbody>
               </Table>
               <ModalViewBill state={this.state} hideModal={this.hideModal}/>
               <ModalEditBill state={this.state} hideModalEdit={this.hideModalEdit}/>
            </div>
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
export default connect(mapStateToProps,mapDispatchToProps)(bill_list);