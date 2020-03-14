import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import * as billAction from '../../redux/actions/billAction';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
class modal_editar_bill extends Component{
    constructor(props){
        super(props)
       
            this.state = {
            }
        
            this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
      this.props.hideModalEdit();
    
    }
    
    handleChange(e,event){
       
    if(event === undefined){
         e.persist();
    this.setState({
        [e.target.name]:e.target.value
    })
    if(e.target.name === 'description'){
        this.props.billReducers.bill_id.description = e.target.value
    }
    if(e.target.name === 'numbre_bill'){
        this.props.billReducers.bill_id.numbre_bill = e.target.value
    }
    if(e.target.name === 'date_bill'){
        this.props.billReducers.bill_id.date_bill = e.target.value
    }
    if(e.target.name === 'mount'){
        this.props.billReducers.bill_id.mount = e.target.value
    }
    }else{
        this.setState({
            [event.name] : e
        })
    }
       
    }
    editar(e){
        e.preventDefault();
        this.props.edit_bill(this.props.billReducers.bill_id);
        this.props.hideModalEdit()
        toast.success(`Factura Editada`) 
    }
    
    render(){
        
        
    return(
        
            <Modal show={this.props.state.show_edit} onHide={this.props.hideModalEdit}>
        
            <Modal.Header closeButton>
                <Modal.Title className="text-center"> Editar Factura</Modal.Title>
            
            </Modal.Header>
            <Modal.Body>
            <div className="row">
            <div class="form-group col-md-6">
                <label className="text-center">Descripcion</label>: <label><b> {this.props.billReducers.bill_id.description}</b></label> 
                <input type="text" class="form-control" name="description" value={this.props.billReducers.bill_id.description} onChange={this.handleChange}/>
            </div>
            <div class="form-group col-md-6">
                <label className="text-center">Numero De Factura</label>: <label><b> {this.props.billReducers.bill_id.numbre_bill}</b></label>
                <input type="text" class="form-control" name="numbre_bill" value={this.props.billReducers.bill_id.numbre_bill} onChange={this.handleChange}/>
            </div>

            <div class="form-group col-md-6">
                <label className="text-center">Fecha de Factura</label>: <label><b> {this.props.billReducers.bill_id.date_bill}</b></label> 
                <input type="date" class="form-control" name="date_bill" value={this.props.billReducers.bill_id.date_bill} onChange={this.handleChange}/>
            </div>
            <div class="form-group col-md-6">
                <label className="text-center">Monto Total</label>: <label><b> {this.props.billReducers.bill_id.mount}</b></label>
                <input type="number" class="form-control" name="mount" value={this.props.billReducers.bill_id.mount} onChange={this.handleChange}/>
            </div>
           
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModalEdit} >
                Cerrar
            </Button>
            <Button variant="success" onClick={this.editar.bind(this)}>
                Editar
            </Button>
            </Modal.Footer>
        
      </Modal>
    )}
}

const mapStateToProps = ({billReducers}) =>{
    return {
        billReducers
    };
}
const mapDispatchToProps = {
    ...billAction
}
export default connect(mapStateToProps,mapDispatchToProps)(modal_editar_bill);