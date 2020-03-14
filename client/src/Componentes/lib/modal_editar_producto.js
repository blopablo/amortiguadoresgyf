import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Select from 'react-select';
import * as amortiguadoresAction from '../../redux/actions/amortiguadoresAction';
import {connect} from 'react-redux';
import { toast } from 'react-toastify';
class modal_editar_producto extends Component{
    constructor(props){
        super(props)
       
            this.state = {
            }
        
            this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
      this.props.hideModal();
      this.props.traerAnio();
        
    
    }
    handleChange(e,event){
       
    if(event === undefined){
         e.persist();
    this.setState({
        [e.target.name]:e.target.value
    })
    if(e.target.name === 'precio_unitario'){
        this.setState({
            precio_par:e.target.value*2
        })
        this.props.state.datos.precio_unitario = e.target.value;
        this.props.state.datos.precio_par = e.target.value*2;
    }
    
   
    }else{
        this.setState({
            [event.name] : e
        })
      
       
    }
       
    }
    editar(e){
        e.preventDefault();
        this.props.editar_amortiguadores(this.state,this.props.state.datos.id,this.props.state);
        this.props.hideModal()
        toast.success('Producto editado')
    }
    
    render(){
        
        
    return(
        
            <Modal show={this.props.state.show} onHide={this.props.hideModal}>
        
            <Modal.Header closeButton>
                <Modal.Title className="text-center">{this.props.state.datos.marca} - {this.props.state.datos.modelo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div className="row">
            <div className="form-group col-md-6">
                            <label>Año Desde</label>: <label> <b>{this.props.state.datos.anio_desde} </b></label>
                            <Select 
                                name="anio_desde"
                                value={this.state.anio_desde}
                                onChange={this.handleChange}
                                options={this.props.amortiguadoresReducers.anio}
                            />
            </div>
            <div className="form-group col-md-6">
                <label>Año Hasta</label> : <label> <b>{this.props.state.datos.anio_hasta} </b></label>
                <Select 
                    name="anio_hasta"
                    value={this.state.anio_hasta}
                    onChange={this.handleChange}
                    options={this.props.amortiguadoresReducers.anio}
                />
            </div>
            <div className="form-group col-md-6">
                <label className="text-center">Precio Unitario</label>: <label><b> {this.props.state.datos.precio_unitario}</b></label> 
                <input type="number" class="form-control" name="precio_unitario" value={this.state.precio_unitario} onChange={this.handleChange}/>
            </div>
            <div className="form-group col-md-6">
                <label className="text-center">Precio Unitario</label>: <label><b> {this.props.state.datos.precio_par}</b></label>
                <input type="number" class="form-control" name="precio_par" value={this.state.precio_par} onChange={this.handleChange} disabled/>
            </div>
            </div>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={this.props.hideModal} >
                Cerrar
            </Button>
            <Button variant="success" onClick={this.editar.bind(this)}>
                Editar
            </Button>
            </Modal.Footer>
        
      </Modal>
    )}
}

const mapStateToProps = ({amortiguadoresReducers}) =>{
    return {
        amortiguadoresReducers
    };
}
const mapDispatchToProps = {
    ...amortiguadoresAction
}
export default connect(mapStateToProps,mapDispatchToProps)(modal_editar_producto);